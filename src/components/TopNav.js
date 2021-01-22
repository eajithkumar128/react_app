import { Layout, Menu, Breadcrumb } from "antd";
import MainContent from "./MainContent";
import CartList from "./CartList";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default function TopNav(props) {
  const [cartCount, setCartCount] = useState(0);
  const [cartValue, setCartValue] = useState([]);

  const updateCartCount = val => {
    setCartCount(val);
  };

  const updateCart = val => {
    setCartValue(val);
  };

  return (
    <Router>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/cart">
                Cart
                <span className="avatar-item">
                  <Badge count={cartCount}>
                    <ShoppingCartOutlined
                      style={{
                        color: "white",
                        paddingLeft: "4px",
                        marginTop: "2px",
                        fontSize: "20px"
                      }}
                    />
                  </Badge>
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <Switch>
              <Route path="/cart">
                <CartList cartValue={cartValue} />
              </Route>
              <Route path="/">
                <MainContent
                  updateCartCount={updateCartCount}
                  updateCart={updateCart}
                />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}
