import React, { Component } from "react";
import { authRoutes, IRouter } from "../router/index";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
const { Sider } = Layout;

class LeftBar extends Component<any, any> {
  generateMenu = (routerList?: IRouter[]) => {
    return (
      <>
        {routerList?.map((r) => {
          if (r.children) {
            return (
              <SubMenu icon={r.icon} key={r.key} title={r.title}>
                {this.generateMenu(r.children)}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={r.key} icon={r.icon}>
              <Link to={r.path}>{r.title}</Link>
            </Menu.Item>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {this.generateMenu(authRoutes)}
          </Menu>
        </Sider>
      </>
    );
  }
}

export default LeftBar;
