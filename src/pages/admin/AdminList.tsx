import { Button, Space, Table } from "antd";
import React, { Component, ReactNode } from "react";
import { getAdminList } from "../../api/admin";
import DeleteAdmin from "./DeleteAdmin";
import AddAdmin from "./AddAdmin";

export interface IAdmin {
  id: number;
  name: string;
  mobile: string;
  email: string;
}

interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (_: any, row: any) => ReactNode;
}

interface IState {
  adminList: IAdmin[];
  tableColumns: Array<IColumns>;
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
  showAddAdminModal: boolean;
}

class AdminList extends Component<any, IState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      adminList: [],
      current: 1,
      pageSize: 15,
      total: 0,
      loading: true,
      showAddAdminModal: false,
      tableColumns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "邮箱",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "电话",
          dataIndex: "mobile",
          key: "mobile",
        },
        {
          title: "操作",
          dataIndex: "",
          key: "operation",
          render: (_: any, row: any) => {
            return (
              <>
                <Space size="middle">
                  <Button type="primary">编辑</Button>
                  <DeleteAdmin
                    id={row.id}
                    deleteAdminCallBack={this.deleteAdminCallBack}
                  ></DeleteAdmin>
                </Space>
              </>
            );
          },
        },
      ],
    };
  }

  // 获取list
  getAdminList = (page: number = 1) => {
    getAdminList(page).then((res) => {
      const { dataList, limit, totalCount } = res.data.data;
      this.setState({
        adminList: dataList,
        loading: false,
        pageSize: limit,
        total: totalCount,
      });
    });
  };

  componentDidMount() {
    this.getAdminList();
  }

  pageChange = (pagination: any) => {
    this.getAdminList(pagination.current);
  };

  deleteAdminCallBack = (id: number) => {
    this.setState((state) => ({
      adminList: state.adminList.filter((admin) => admin.id !== id),
    }));
  };

  showAddAdminModal = () => {
    this.setState({
      showAddAdminModal: true,
    });
  };

  hideAddAdminModal = (refresh?: boolean) => {
    if (refresh) {
      this.getAdminList();
    }
    this.setState({
      showAddAdminModal: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showAddAdminModal}>
          添加管理员
        </Button>
        <AddAdmin
          visible={this.state.showAddAdminModal}
          callBack={this.hideAddAdminModal}
        ></AddAdmin>
        <Table
          loading={this.state.loading}
          rowKey={(record) => record.id}
          dataSource={this.state.adminList}
          columns={this.state.tableColumns}
          pagination={{
            position: ["bottomCenter"],
            total: this.state.total,
            pageSize: this.state.pageSize,
            showSizeChanger: false,
          }}
          onChange={this.pageChange}
        ></Table>
      </>
    );
  }
}

export default AdminList;
