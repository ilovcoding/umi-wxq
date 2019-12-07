import { Menu, Icon } from 'antd'
import Link from 'umi/link'
import style from '../index.css';
const MenuItem = Menu.Item
const { SubMenu } = Menu
function Nav(props) {
  return (
    <Menu theme="dark" mode="inline" >
      <div className={style.logos} />

      <SubMenu key="sub1"
        title={
          <span>
            <Icon type="aliwangwang" />
            <span>微信墙</span>
          </span>
        }>
        <MenuItem>
          <Link to='/online/setting'>
            设置
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/online/check'>
          消息记录
          </Link>
        </MenuItem>
        <MenuItem>
          搜索用户
          </MenuItem>
      </SubMenu>
      <MenuItem >
        <Icon style={{ fontSize: "18px" }} type="gift" /> 微抽奖
      </MenuItem>
      <MenuItem >
        <Icon style={{ fontSize: "18px" }} type="pie-chart" /> 微投票
      </MenuItem>
      <MenuItem  >
        <Link to='/setting'>
          <Icon style={{ fontSize: "18px" }} type="wechat" /> 微信设置
        </Link>
      </MenuItem>
      <MenuItem >
        <Link to='/setting'>
          <Icon style={{ fontSize: "18px" }} type="setting" /> 系统设置
        </Link>
      </MenuItem>

    </Menu>
  );
}

export default Nav;
