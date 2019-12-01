// import Texty from 'rc-texty';
import styles from '../index.css';
import { Button, Row, Avatar } from 'antd';
import Link from 'umi/link'
export default function () {
  return (
    <Row type="flex" justify="space-between" style={{ paddingTop: 20 }}>

      <Button type="primary" size="large">
        <Link to='/online/wechat' target="blank">微信墙投影地址</Link>
      </Button>
      <Button type="primary" size="large">
        抽奖投影地址
        </Button>
      <Button type="primary" size="large">
        投票投影地址
        </Button>
      <Avatar className={styles.avatar} size="large" >
        测试
        </Avatar>
    </Row>
  )
}