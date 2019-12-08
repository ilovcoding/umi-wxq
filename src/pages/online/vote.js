//  微信墙 投票页面
import { Component } from 'react'
import { Switch, Input, Upload, message, Icon, Button, InputNumber, Radio, Tag, Table } from 'antd'
import { Form } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
export default Form.create({ name: 'setting' })(
  class extends Component {
    state = {
      loading: false,
      value: 1, //  单选框的值
      editingKey:'', // 正在编辑的单元格的key
      editInput:'', //输入框正在被修改的内容
      editData:[
        {
          key: '1',
          voteName: '项目一11'
        },
        {
          key: '2',
          voteName: '项目二22'
        }
      ]
    }
    handleSubmit = () => {
      console.log('111')
    }
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };
    inputNumberOnchange = (value) => {
      if ((typeof value) === 'string') {
        message.error('只能输入数字')
      }
    }
    radioChange = (e) => {
      let { value } = e.target
      this.setState({ value })
    }
    rowSelection = () => {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      }
    };
    editInputChange =(e)=>{
      let {value} = e.target
      this.setState({
        editInput:value
      })
    }
    edit = (key) => {
      console.log(key)
      this.setState({ editingKey: key });
    }
    editSave = (record) => {
      console.log({...record,voteName:this.state.editInput})
      let editDataArr = this.state.editData.map(value=>{
        return value.key===this.state.editingKey?{...record,voteName:this.state.editInput}:value
      })
      // console.log(editDataArr)
      this.setState({
        editData:editDataArr,
        editingKey: '',
        editInput:''
      })
      // this.setState({ editingKey: '' });
    }
    handleAdd=()=>{
      let newKey= `${this.state.editData.length +1}`
      let editDataArr = this.state.editData
      editDataArr.push({
        key: newKey,
        voteName:''
      })
      console.log(editDataArr)
      this.setState({
        editingKey:newKey,
        editData: editDataArr
      })
    }
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Form  {...formItemLayout} onSubmit={this.handleSubmit} >
          <FormItem label="投票开关">
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
          </FormItem>
          <FormItem label="投票标题">
            <Input placeholder="输入投票标题"></Input>
          </FormItem>
          <FormItem label="微投票序言">
            <TextArea value="关注微言合工大，发送&nbsp;投票&nbsp;至公众号，即可参与互动" style={{ height: '100px', width: '400px' }}></TextArea>
          </FormItem>
          <FormItem label="投票项目">
            <Button.Group style={{ marginLeft: "70%" }}>
              <Button type="primary" icon="plus" onClick={this.handleAdd}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="danger" icon="minus" />
            </Button.Group>
            <Table
              columns={[{
                title: '项目名称',
                dataIndex: 'voteName',
                render: (text, record) => {
                  return (
                    record.key === this.state.editingKey
                    ? <Input onChange={this.editInputChange}/>
                    : <span>{text}</span>
                  )
                }
              }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                  return (
                    record.key === this.state.editingKey
                    ? <a onClick={this.editSave.bind(this,record)} href>保存</a>
                    : <a onClick={this.edit.bind(this, record.key)} href>编辑</a>
                  )
                }
              }]}
              bordered
              rowSelection={this.rowSelection()}
              dataSource={this.state.editData}
            />
          </FormItem>
          <FormItem label="投票背景图">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </FormItem>

          <FormItem style={{ marginLeft: "100px" }}>
            <Button type="primary" htmlType="submit">
              <Icon type="check" />
              开始投票
            </Button>
            &nbsp;&nbsp;
            <Button type="danger" htmlType="submit">
              <Icon type="close" />
              重新投票
            </Button>
          </FormItem>
          <Tag color="blue" style={{ marginLeft: '150px', fontSize: '14px' }}>
            小提示： <br />
            投票功能目前只支持单选<br />
            每次修改完投票规则<br />
            都要刷新或者重新打开投票网页<br />
            规则才会生效
          </Tag>
        </Form>
      )
    }
  }
)