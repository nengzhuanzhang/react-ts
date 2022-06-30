import React, { Component, createRef } from "react";
import { Button, FormInstance, Result } from "antd";
import { useNavigate } from "react-router-dom";

class Page404 extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      navigate: useNavigate(),
    };
  }
  goBackHome = () => {
    this.state.navigate("/admin/dashboard", { replace: true });
  };
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={this.goBackHome}>
              Back Home
            </Button>
          }
        />
      </>
    );
  }
}

export default Page404;
