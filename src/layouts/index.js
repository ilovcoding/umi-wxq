
import { Layout, } from 'antd';
import Nav from "./components/Nav";
import LayoutHeader from './components/LayoutHeader';
const { Header, Content, Footer, Sider } = Layout;
function BasicLayout(props) {
  return (
    <Layout style={{ height: "100%" }} >
      <Sider width={150} ><Nav /></Sider>
      <Layout style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white" }}>
          <LayoutHeader />
        </Header>
        <Content >{props.children}</Content>
      </Layout>
    </Layout>
  );
}
export default BasicLayout