import React, { Component, createRef, RefObject } from "react";
import { Form, Input, Button, FormInstance, Space, message } from "antd";
import "../static/css/login/login.css";
import { login } from "../api/login";
import { set } from "../utils/storage";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IState {
  name: string;
  password: string;
  width: number;
  height: number;
}

interface IProps {
  login: (data: any) => void;
  getAdminInfo: () => void;
  getPermissionList: () => void;
}

class Login extends Component {
  formRef: RefObject<FormInstance>;

  constructor(props: any, context: any) {
    super(props, context);
    this.formRef = createRef<FormInstance>();
  }

  login = (form: any) => {
    login(form.name, form.password).then((response) => {
      const { code, msg } = response.data;
      if (code === 0) {
        const { token, admin } = response.data.data;
        set("token", token);
        return admin;
      } else {
        message.error(msg);
        return Promise.reject(msg);
      }
    });
  };

  render() {
    return (
      <div className="login">
        <Form
          onFinish={this.login}
          id="login-form"
          className="login-form"
          ref={this.formRef}
          {...layout}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: "用户名不可以为空",
              },
              {
                type: "string",
                min: 2,
                message: "用户名长度不可以小于2位",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "密码不可以为空",
              },
              {
                type: "string",
                min: 2,
                message: "密码长度不可以小于2位",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button type="primary" htmlType="reset">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
