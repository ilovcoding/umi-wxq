import { Component } from 'react'
import { Switch, Input,Upload,message,Icon } from 'antd'
import { Form } from 'antd'
const FormItem = Form.Item
const TextArea = Input.TextArea
// class OnlineSetting extends Component {
//   render() {
// return (
//   <div style={{ marginLeft: '20px' }}>
//     <div>
//       <b>微信墙开关：</b>
//       <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
//     </div>
//     {
//       Form
//     }
//     <Divider>明理苑大学生网络文化工作室</Divider>
//   </div>
// )
//     return Form.create(class extends Component {
//       render(){
//         return (
//           <FormItem>
//           </FormItem>
//         )
//       }
//     })
//   }

// }
// export default OnlineSetting
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
export default Form.create({ name: '' })(
  class extends Component {
    state ={
      loading: false
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
    
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Form  {...formItemLayout} onSubmit={this.handleSubmit} >
          <FormItem label="微信墙开关">
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
          </FormItem>
          <FormItem label="微信墙序言">
            <TextArea value="关注微言合工大，发送&nbsp;微信墙&nbsp;至公众号，即可参与互动" style={{height:'100px',width:'400px'}}></TextArea>
          </FormItem>
          <FormItem label="微信墙图标">
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
        </Form>
      )
    }
  }
)