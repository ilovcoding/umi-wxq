//  微信墙 投影页面
import React, { Component } from 'react'
import { Divider, Row, Icon, Button, Col } from 'antd';
import OnlineTalk from '../../components/OnlineWechat/OnlineTalk';
import Texty from 'rc-texty'
import QueueAnim from 'rc-queue-anim';
import socket from '../../utils/socket'
import wx_logo from '../../assets/weixin_logo.png'
import styles from './index.css'
import 'rc-texty/assets/index.css';
// 新建socket连接
// let newWs = new WebSocket("ws://localhost:3000");
class Wechat extends Component {

  state = {
    // 标题微言合工大 动画控制
    show: true,
    // 要显示在网页上的消息
    msgList: [],
    //  从后台获取的消息
    socketMsgList: [],
    // 控制页面滚动到底部
    toEnd: {},
    msgAnimationTime: 2000
  }
  createMagContextInterval(numbers){
    
  }
  componentDidMount() {
    let { socketMsgList, msgList } = this.state
    let [_socketMsgList, _msgList] = [socketMsgList, msgList]
    // 响应 socket
    socket.open()
    socket.on('connect', (res) => {
      socket.send("你好我是 websocket create By 王旻伟")
    })
    let taht = this
    socket.on('message', (msgRes) => {

      if (msgRes['msgType'] === "text") {
        // 后台发送过来的合适的消息 进入socketMsgList 待处理
        _socketMsgList.push(msgRes)
        this.setState({
          socketMsgList: _socketMsgList
        })
      }
    })
    this.showTimer = setInterval(
      () => {
        this.setState({ show: !this.state.show })
      }, 5000
    )
    this.contextTimer = setInterval(
      () => {
        taht.toEnd.scrollIntoView({ behavior: "smooth" })
        // console.log(socketMsgList.length)
        _socketMsgList.length > 0 && _msgList.push(_socketMsgList.shift())
        // setmsgList(msgList)
        // setsocketMsgList(socketMsgList)
        // console.log(_socketMsgList.length)
        this.setState({
          socketMsgList: _socketMsgList,
          msgList: _msgList
        }, () => {
          console.log(socketMsgList.length)
          if (socketMsgList.length >= 10 && socketMsgList.length < 20) {
            clearInterval(this.contextTimer)
            this.setState({
              msgAnimationTime: 1000
            })
          }
           if (socketMsgList.length >= 20 && socketMsgList.length < 30) {
            this.setState({
              msgAnimationTime: 500
            })
          } 
          if(socketMsgList.length>=30){
            console.log("待会儿再发")
          }
        })
        // this.state.toEnd.scrollIntoView({ behavior: "smooth" })
      }, this.state.msgAnimationTime
    )
  }
  componentWillUnmount() {
    clearInterval(this.showTimer)
    clearInterval(this.contextTimer)
  }


  render() {
    return (
      <div className={styles.wechat}>
        <Row className={styles.wechatRow} justify="start" type="flex" >
          <img src={wx_logo} alt="" />
          <div style={{ width: "300px" }}>
            {this.state.show && <Texty interval={1000} >微言合工大</Texty>}
          </div>
          <div style={{ position: "relative", height: "30px", width: "30px" }}>
            <div className={styles.button}>
              <div className={styles.button2}>
              </div>
            </div>
          </div>
          <Button type="primary" size="large"
            style={{ height: "100%", fontSize: "30px", fontWeight: "bolder", textAlign: "left" }}
          >
            <Row type="flex" align="middle">
              <Col>
                <Icon type="mobile" style={{ fontSize: "60px" }}></Icon>
              </Col>
              <Col>
                添加公众号微言合工大(gdxzfwt) <br />回复 &nbsp; 微信墙 &nbsp;  参与活动
              </Col>
            </Row>
          </Button>
        </Row>
        <Divider style={{ margin: 2, padding: 0 }} />
        <QueueAnim
          duration={this.state.msgAnimationTime}
          type={['right', 'top']}
          style={{ height: "100%", overflow: "hidden", paddingTop: "120px" }}
        >
          {
            this.state.msgList.length > 0 && this.state.msgList.map((value, index) => {
              // console.log(msgIndex, currentId)
              return (
                <OnlineTalk
                  key={index}
                  name={value.nickname}
                  content={`${value.content}`}
                  // msgId={`${new Date(value.createTime).toLocaleString()}`}
                  msgId={value.createTime}
                  avatar={value.headImgUrl}
                />
              )
            })
          }
          <div style={{ height: "25%" }} ref={(el) => { this.toEnd = el; }}></div>
        </QueueAnim>
      </div >
    )
  }
}
export default Wechat