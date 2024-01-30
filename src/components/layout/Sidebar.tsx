/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { userPaths } from "../../routes/user.routes";

const Sidebar = () => {
  const items = sidebarGenerator(userPaths);

  return (
    <Sider breakpoint="lg" collapsedWidth="0" style={{ background: "#7c3aed" }}>
      <div
        className="flex justify-center items-center p-2 m-2 text-white font-bold text-lg"
        style={{
          padding: "8px",
          margin: "8px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          font: "3rem",
        }}
      >
        <h1 className="text-xl font-bold">Sports Pulse</h1>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        // @ts-ignore next-line
        items={items}
        style={{ background: "#7c3aed", color: "white", fontWeight: "bold" }}
      />
    </Sider>
  );
};

export default Sidebar;
