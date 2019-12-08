// 微信墙抽奖页面
import { Component } from 'react'
import { Switch, Input, Upload, message, Icon, Button, InputNumber, Radio, Tag, Divider } from 'antd'
import { Form } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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
      value: 1 //  单选框的值
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
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Form  {...formItemLayout} onSubmit={this.handleSubmit} style={{ float: 'left' }}>
          <FormItem label="抽奖开关">
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
          </FormItem>
          <FormItem label="抽奖标题">
            <Input placeholder="输入抽奖标题"></Input>
          </FormItem>
          <FormItem label="每次抽取人数">
            <InputNumber onChange={this.inputNumberOnchange} defaultValue={0}></InputNumber>
          </FormItem>
          <FormItem label="抽奖模式">
            <Radio.Group value={this.state.value} onChange={this.radioChange}>
              <Radio style={radioStyle} value={1}>
                按微信墙上墙数量来抽奖，每个参与者的中奖率由成功发送信息量来决定
             </Radio>
              <Radio style={radioStyle} value={2}>
                按参与者来决定，每个参与者中奖率相等
             </Radio>
            </Radio.Group>
          </FormItem>
          <FormItem label="抽奖背景图">
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
          <FormItem label="提交更改">
            <Button type="primary" htmlType="submit">
              <Icon type="check" />

              提交
            </Button>
          </FormItem>
          <br />
          <Tag color="blue" style={{marginLeft:'150px',fontSize:'14px'}}>
            小提示： <br/>
            每次修改完抽奖规则<br/>
            都要刷新或者重新打开投票网页<br/>
            规则才会生效
          </Tag>
        </Form>
      )
    }
  }
)