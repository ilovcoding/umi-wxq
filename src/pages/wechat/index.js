import { useState } from 'react'
import { Card } from 'antd'
import Menu from './menu'
import MenuSetting from './menuSetting'
export default function () {
  const [contentKey, setcontentKey] = useState('menu');
  let tabList = [
    {
      key: 'menu',
      tab: '微信底部菜单'
    },
    {
      key: 'menuSetting',
      tab: '底部菜单设置'
    }
  ]
  let contentTabList = {
    menu: <Menu />,
    menuSetting: <MenuSetting />
  }
  return (
    <div style={{ margin: '0 20px' }}>
      <Card
        tabList={tabList}
        activeTabKey={contentKey}
        onTabChange={
          key => setcontentKey(key)
        }
      >
      {contentTabList[contentKey]}
      </Card>
    </div >
  )
} 