import { Component } from 'react'
import { Card } from 'antd'
import MsgHistory from './MsgHistory'
import Check from './check'
const checkTabList = [
  {
    key: 'check',
    tab: '历史消息'
  },
  // {
  //   key: 'msgHistroy',
  //   tab: '消息历史'
  // }
]
const contentCheckTabList = {
  check: <Check />,
  masgHistory: <MsgHistory />
}

export default class extends Component {
  state = {
    contentKey: 'check'
  }
  render() {
    return (
      <div style={{ margin: "0  20px" }}>
        <Card
          tabList={checkTabList}
          onTabChange={
            key => {
              console.log(key)
              this.setState({
                contentKey: key
              })
            }
          }
        >
          {contentCheckTabList[this.state.contentKey]}
        </Card>
      </div>
    )
  }
}