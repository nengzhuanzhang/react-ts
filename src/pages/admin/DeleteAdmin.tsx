import { Button, message, Popconfirm } from "antd";
import React, { Component } from "react";
import { deleteAdmin } from "../../api/admin";

interface IProps {
  id: number;
  deleteAdminCallBack: (id: number) => void;
}

class DeleteAdmin extends Component<IProps, any> {
  deleteAdmin = () => {
    deleteAdmin(this.props.id).then((res) => {
      const { code, msg } = res.data;
      if (code === 0) {
        message.success(msg);
        this.props.deleteAdminCallBack(this.props.id);
      } else {
        message.error(msg);
      }
    });
  };

  cancel = () => {
    message.info("取消删除");
  };

  render() {
    return (
      <>
        <Popconfirm
          title="删除管理员"
          onConfirm={this.deleteAdmin}
          onCancel={this.cancel}
        >
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </>
    );
  }
}

export default DeleteAdmin;
