import { useState } from 'react'
import { Card } from 'antd'
import MsgHistory from './MsgHistory'
import Check from './check'

export default function () {
  const [contentKey, setcontentKey] = useState('check');
  const checkTabList = [
    {
      key: 'check',
      tab: '历史消息'
    },
    {
      key: 'msgHistory',
      tab: '消息历史'
    }
  ]
  const contentCheckTabList = {
    check: <Check />,
    msgHistory: <MsgHistory />
  }
  return (
    <div style={{ margin: "0  20px" }}>
      <Card
        tabList={checkTabList}
        onTabChange={
          key => setcontentKey(key)
        }
      >
        {contentCheckTabList[contentKey]}
      </Card>
    </div>
  )
}