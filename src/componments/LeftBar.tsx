import React, { Component, createRef } from "react";
import { IRouter, leftRouter } from "../router/index";
import { FormInstance, Layout, Menu, MenuProps } from "antd";
import { Link, matchPath } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import { withRouter, RoutedProps } from "../router/withRouter";

const { Sider } = Layout;

interface IState {
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
}

interface IProps extends RoutedProps {}

class LeftBar extends Component<IProps, IState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }

  componentDidMount() {
    this.heightMenu(leftRouter);
  }

  heightMenu = (leftRoute: IRouter[], route?: IRouter) => {
    const path = this.props.location.pathname;
    for (const r of leftRoute) {
      const match = matchPath(path, r.path);
      if (match) {
        if (route) {
          this.setState({
            defaultSelectedKeys: [r.key],
            defaultOpenKeys: [route.key],
          });
        } else {
          this.setState({
            defaultOpenKeys: [r.key],
          });
        }
        return;
      }
      if (r.children) {
        this.heightMenu(r.children, r);
      }
    }
  };

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
          {this.state.defaultSelectedKeys.length > 0 ? (
            <Menu
              mode="inline"
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultOpenKeys={this.state.defaultOpenKeys}
              style={{ height: "100%", borderRight: 0 }}
            >
              {this.generateMenu(leftRouter)}
            </Menu>
          ) : null}
        </Sider>
      </>
    );
  }
}

export default withRouter(LeftBar);
