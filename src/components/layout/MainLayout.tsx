import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { removeUser } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
  const { Header, Content } = Layout;
  const dispatch = useAppDispatch();

  return (
    <Layout className="bg-violet-600" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header className="flex justify-end items-center bg-violet-600">
          <Button
            className="bg-red-400"
            size="small"
            onClick={() => dispatch(removeUser())}
            type="primary"
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
