import React, { ReactNode, lazy } from "react";
const Login = lazy(() => import("../pages/Login"));
const Page404 = lazy(() => import("../pages/Page404"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserList = lazy(() => import("../pages/user/UserList"));
const AdminList = lazy(() => import("../pages/admin/AdminList"));

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

export interface IRouter {
  path: string;
  title: string;
  key: string;
  icon?: ReactNode;
  component?: ReactNode;
  children?: IRouter[];
}

export const leftRouter: IRouter[] = [
  {
    path: "/admin/dashboard",
    title: "首页",
    icon: <DashboardOutlined />,
    key: "dashboard",
    component: <Dashboard />,
  },
  {
    path: "/admin/user",
    title: "用户",
    icon: <UserOutlined />,
    key: "user",
    children: [
      {
        path: "/admin/user/list",
        title: "用户列表",
        icon: <UserOutlined />,
        key: "userList",
        component: <UserList />,
      },
    ],
  },
  {
    path: "/admin/admin",
    title: "管理员",
    icon: <UserOutlined />,
    key: "admin",
    children: [
      {
        path: "/admin/admin/list",
        title: "管理员列表",
        icon: <UserOutlined />,
        key: "adminList",
        component: <AdminList />,
      },
    ],
  },
];

export const topRouter: IRouter[] = [];

export const authRoutes: IRouter[] = [...leftRouter, ...topRouter];

export const noAuthRouter: IRouter[] = [
  {
    path: "/login",
    title: "登录",
    key: "login",
    component: <Login />,
  },
  {
    path: "*",
    title: "404",
    key: "404",
    component: <Page404 />,
  },
];
