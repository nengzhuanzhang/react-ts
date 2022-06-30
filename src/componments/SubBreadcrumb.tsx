import React, { Component, Fragment, ReactNode } from "react";
import { Breadcrumb } from "antd";
import { authRoutes, IRouter, leftRouter } from "../router";
import { withRouter, RoutedProps } from "../router/withRouter";
import { matchPath } from "react-router-dom";

interface IProps extends RoutedProps {}

class SubBreadcrumb extends Component<IProps, any> {
  generate = (routerList: IRouter[]): ReactNode => {
    const path = this.props.location.pathname;
    console.log(path, routerList);

    return (
      <>
        {routerList.map((r) => {
          const match = matchPath(path, r.path);
          console.log("match", match, path, r.path);
          console.log("children", r.children);
          if (match) {
            return (
              <>
                <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                {r.children ? this.generate(r.children) : null}
              </>
            );
          }
          return null;
        })}
      </>
    );
  };

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {this.generate(leftRouter)}
        </Breadcrumb>
      </>
    );
  }
}

export default withRouter(SubBreadcrumb);
