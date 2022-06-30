import type { MenuProps } from "antd";
import { Layout } from "antd";
import React, { Component } from "react";
import "../static/css/appLayout.css";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import SubBreadcrumb from "./SubBreadcrumb";

const { Header, Content } = Layout;

class AppLayout extends Component<any, any> {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          {/*<Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />*/}
        </Header>
        <Layout>
          <LeftBar></LeftBar>
          <Layout style={{ padding: "0 24px 24px" }}>
            <SubBreadcrumb />
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
