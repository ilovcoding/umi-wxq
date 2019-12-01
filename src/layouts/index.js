
import { Layout, Divider } from 'antd';
import Nav from "./components/Nav";
import LayoutHeader from './components/LayoutHeader';
const { Header, Content, Sider } = Layout;
function BasicLayout(props) {
  return (
    <Layout style={{ height: "100%" }} >
      <Sider width={150} ><Nav /></Sider>
      <Layout style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white" }}>
          <LayoutHeader />
        </Header>
        <Divider></Divider>
        <Content >{props.children}</Content>
      </Layout>
    </Layout>
  );
}
export default BasicLayout