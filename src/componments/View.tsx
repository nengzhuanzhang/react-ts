import React, { Component, ReactNode, Suspense } from "react";
import { authRoutes, IRouter, noAuthRouter } from "../router";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../componments/AppLayout";

class View extends Component<any, any> {
  generateRouter = (routerList?: IRouter[]): ReactNode => {
    return (
      <>
        {routerList?.map((r) => {
          if (r.children) {
            return <>{this.generateRouter(r.children)}</>;
          }
          return (
            <Route path={r.path} key={r.key} element={r.component}></Route>
          );
        })}
      </>
    );
  };

  render() {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              ></Route>
              {/* 需要鉴权的路由 */}
              <Route path="/admin" element={<AppLayout />}>
                {this.generateRouter(authRoutes)}
                {/* {authRoutes.map((r) => (
                  <Route
                    path={r.path}
                    key={r.key}
                    element={r.component}
                  ></Route>
                ))}*/}
              </Route>
              {/* 不需要鉴权的路由 */}
              {noAuthRouter.map((r) => (
                <Route path={r.path} key={r.key} element={r.component}></Route>
              ))}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </>
    );
  }
}

export default View;
