// 微信墙 搜索用户界面
import { Component } from 'react'
import { Row, Col, Input, Table, Button } from 'antd'
import Link from 'umi/link'
const { Search } = Input
class SearchUser extends Component {
  state = {
    tableColumns: [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex'
      },
      {
        title: '消息记录',
        dataIndex: 'history',
        key: 'history',
        render(text,record){
          return (
            <Link to='/online/check'>
              <Button type="primary">查看</Button>
            </Link>
          )
        }
      }
    ]
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={4} offset={19}>
            <Search
              placeholder="根据微信昵称搜索"
              enterButton="搜索"
              size="large"
              onSearch={value => console.log(value)}
            />
          </Col>
          <Col span={22} offset={1}>
            <Table
             columns={this.state.tableColumns}
             bordered
             style={{marginTop:'20px'}}
            >
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SearchUser