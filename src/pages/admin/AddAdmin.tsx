import React, { Component, createRef, RefObject } from "react";
import { Button, Form, FormInstance, Input, message, Modal, Space } from "antd";
import { addAdmin } from "../../api/admin";
import { IAdmin } from "./AdminList";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
  visible: boolean;
  callBack: (refresh?: boolean) => void;
}

class AddAdmin extends Component<IProps, any> {
  formRef: RefObject<FormInstance>;

  constructor(props: IProps, context: any) {
    super(props, context);
    this.formRef = createRef<FormInstance>();
  }

  addAdmin = (admin: IAdmin) => {
    addAdmin(admin).then((res) => {
      const { code, msg } = res.data;
      if (code === 0) {
        message.success(msg);
        this.formRef.current?.resetFields();
        this.props.callBack(true);
      } else {
        message.error(msg);
      }
    });
  };

  OnCancel = () => {
    this.props.callBack();
  };

  render() {
    return (
      <>
        <Modal
          title="添加管理员"
          visible={this.props.visible}
          onCancel={this.OnCancel}
          footer={null}
        >
          <Form {...layout} ref={this.formRef} onFinish={this.addAdmin}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "请输入姓名",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="mobile"
              label="电话"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "请输入电话",
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "请输入密码",
                  validator: (rule, value) => {
                    if (value === undefined || value === "") {
                      return Promise.reject("密码不能为空");
                    }
                    if (value.length < 6) {
                      return Promise.reject("密码长度不少于6位");
                    } else if (value.length > 22) {
                      return Promise.reject("密码长度不能大于22位");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "请输入邮箱",
                  validator: (rule, value) => {
                    // TODO 校验
                    if (value === undefined || value === "") {
                      return Promise.reject("邮箱不能为空");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddAdmin;
