// 微信墙 审核页面
import React, { Component } from 'react';
import { Table, Button } from 'antd';
const columns = [
  {
    title: '昵称',
    dataIndex: 'name',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
  },
  {
    title: '消息内容',
    dataIndex: 'message',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => {
      return (
        <span>
          <Button type="primary">删除</Button>
          &nbsp; &nbsp; 
          <Button type="danger">禁言</Button>
        </span>
      )
    }
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    avatar: 32,
    message: `London, Park Lane no. ${i}`,
  });
}
export default class Check extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    data:[] // 从后端获取到的用户消息
  };
 componentDidMount(){

 }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: '全选',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        },
        {
          key: 'odd',
          text: '反选',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: '取消选择',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div style={{ margin: "0  20px" }}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered />
      </div>
    )
  }
}