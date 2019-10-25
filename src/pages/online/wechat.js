//  微信墙 投影页面
import { Divider, Row, Icon, Button, Col, Layout } from 'antd';
import React, { useState, useEffect } from 'react'
import OnlineTalk from '../../components/OnlineWechat/OnlineTalk';
import Texty from 'rc-texty'
import QueueAnim from 'rc-queue-anim';

import wx_logo from '../../assets/weixin_logo.png'
import avatar from '../../assets/yay.jpg'
import styles from './index.css'
import 'rc-texty/assets/index.css';
let msgIndex = 1;

export default function (props) {

  let contextString = "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
  const [show, setshow] = useState(true)

  let [currentId, setcurrentId] = useState(0)
  let [msgIndex, setmsgIndex] = useState(1)
  const [msgList, setmsgList] = useState([])
  useEffect(() => {
    let contextTimer = setTimeout(
      () => {
        msgList.push({
          avatar,
          name: "琅琊旻",
          context: `${msgIndex}#${msgIndex}#${msgIndex}`,
          msgId: `#2019#${msgIndex}`,
          msgIndex
        })
        if (msgList.length >=4) {
          currentId++;
          setcurrentId(currentId)
        }
        msgIndex++
        setmsgIndex(msgIndex)
        setmsgList(msgList)
        setshow(!show)
      }, 3000
    )
    return () => clearInterval(contextTimer)
  })

  return (
    <div className={styles.wechat}>
      <Row className={styles.wechatRow} justify="start" type="flex">
        <img src={wx_logo}></img>
        <Col sm={5}>
          <Texty interval={500} >{show && "微言合工大"}</Texty>
        </Col>
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
      {/* <div> */}
      <QueueAnim
        duration={1500} interval={0}
        type={['right', 'top']}
        style={{ height: "100%", overflow: 'scroll', }}
      >
        {
          msgList.length > 0 && msgList.map((value, index) => {
            console.log(msgIndex, currentId)
            return (
              index >= currentId && <OnlineTalk
                key={index}
                name={value.name}
                context={`${value.context}`}
                msgId={`${value.msgId}`}
                avatar={value.avatar}
              />

            )
          })
        }
        {/* <div style={{ height: "25%" }} ref={(el) => { toEnd = el; }} /> */}
      </QueueAnim>
    </div >
  )
} 
