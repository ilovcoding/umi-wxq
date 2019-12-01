//  微信墙 投影页面
// 第二版本消息动画
import { Divider, Row, Icon, Button, Col, Layout, message } from 'antd';
import React, { useState, useEffect } from 'react'
import OnlineTalk from '../../components/OnlineWechat/OnlineTalk';
import Texty from 'rc-texty'
import QueueAnim from 'rc-queue-anim';
import socket from '../../utils/socket'
import wx_logo from '../../assets/weixin_logo.png'
import styles from './index.css'
import 'rc-texty/assets/index.css';
// 新建socket连接
// let newWs = new WebSocket("ws://localhost:3000");
export default function (props) {
  // 标题微言合工大 动画控制
  let [show, setshow] = useState(true)
  // 要显示在网页上的消息
  let [msgList, setmsgList] = useState([])
  //  从后台获取的消息
  const [socketMsgList, setsocketMsgList] = useState([])
  let toEnd;

  useEffect(() => {
    let showTimer = setInterval(
      () => {
        setshow(!show)
      }, 6000
    )
    console.log('show定时器被执行', new Date().getTime())
    return () => clearInterval(showTimer)
  }, [show])

  // 处理socketMsgList 里面的消息
  useEffect(() => {
    console.log('第三个 useEffect函数执行了')
    //自动滚动到最底部
    toEnd.scrollIntoView({ behavior: "smooth" })
    let contextTimer = setInterval(
      () => {
        // console.log(socketMsgList.length)
        socketMsgList.length > 0 && msgList.push(socketMsgList.shift())
        setmsgList(msgList)
        setsocketMsgList(socketMsgList)
      }, 1000
    )
    return () => clearInterval(contextTimer)
  })
  // npm  socket 包 的写法
  useEffect(() => {
    console.log('第二个 useEffect函数执行了')
    socket.open()
    socket.on('connect', (res) => {
      socket.send("你好我是 websocket create By 王旻伟")
    })
    socket.on('message', (msgRes) => {
      if (msgRes['msgType'] === "text") {
        // 后台发送过来的合适的消息 进入socketMsgList 待处理
        socketMsgList.push(msgRes)
        setsocketMsgList(socketMsgList)
      }
    })
  }, [socketMsgList])
  return (
    <div className={styles.wechat}>
      <Row className={styles.wechatRow} justify="start" type="flex" >
        <img src={wx_logo} alt="" />
        <div style={{ width: "300px" }}>
          {show && <Texty interval={1000} >微言合工大</Texty>}
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
        duration={1000}
        type={['right', 'top']}
        style={{ height: "100%", overflow: "hidden", paddingTop: "120px" }}
      >
        {
          msgList.length > 0 && msgList.map((value, index) => {
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
        <div style={{ height: "25%" }} ref={(el) => { toEnd = el; }} />
      </QueueAnim>
    </div >
  )
} 
