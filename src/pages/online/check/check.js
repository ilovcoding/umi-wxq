// 微信墙  实时消息显示页面
import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import Time from '../../../utils/time'
const columns = [
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '头像',
    dataIndex: 'headImgUrl',
    render: (text, record) => {
      return <img src={text} alt="获取头像失败" />
    }
  },
  {
    title: '消息内容',
    dataIndex: 'content',
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    render: (text, record) => <code>{new Time(text).toString()}</code>
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
class Check extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    pageNo: 1,
    pageSize: 5
  };
  componentDidMount() {
    this.getPageData()
  }
  getPageData() {
    this.props.dispatch({
      type: 'online/getHistoryMsg',
      payload: {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize
      }
    })
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  handlePageChange(num) {
    console.log(num)
    this.setState({pageNo:num},()=>{
      this.getPageData()
    })
  }
  render() {
    const { selectedRowKeys } = this.state;
    console.log(this.props)
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
    console.log(this.props)
    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.props.historyMsg}
        pagination={{
          pageSize: 5,
          total: this.props.historyMsgCount,
          // page:1,
          // showSizeChanger: true
          onChange: (page) => this.handlePageChange(page),
          position: "bottom"
        }}
        bordered
      />
    )
  }
}

export default connect(({ online }) => ({
  historyMsg: online.historyMsg,
  historyMsgCount: online.historyMsgCount
}))(Check)