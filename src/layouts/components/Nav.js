import { Menu, Icon } from 'antd'
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
            <Icon type="wechat" />
            <span>微信墙</span>
          </span>
        }>
        <MenuItem>
          审核
        </MenuItem>
        <MenuItem>
          搜索用户
          </MenuItem>
        <MenuItem>
          微信墙设置
          </MenuItem>
      </SubMenu>

      <MenuItem >
        <Icon style={{ fontSize: "18px" }} type="gift" /> 微抽奖
      </MenuItem>
      <MenuItem >
        <Icon style={{ fontSize: "18px" }} type="pie-chart" /> 微投票
      </MenuItem>
      <MenuItem >
        {/* <Icon style={{ fontSize: "18px" }} type="setting" /> 设置 */}
      </MenuItem>

    </Menu>
  );
}

export default Nav;
