import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // UploadOutlined,
  UserOutlined,
  ContactsOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";
// Images
import logoImage from "../../images/logo.png";
import { Layout, Menu, Space } from "antd";
import { Button as AntButton } from "antd";
import {
  Button,
  useMantineColorScheme,
  ActionIcon,
  Group,
  createStyles,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import gasBackGround from "@/images/gas.jpg";
import oilBackGround from "@/images/oil.jpg";
import iranFlag from "@/images/Iran_flag.png";

// Components
import Subscribers from "../Subscribers";
import Profile from "../Profile";
const { Header, Sider, Content } = Layout;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },
}));

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();

  const apn = localStorage.getItem("apn");

  const handleOnSubscribers = () => {
    navigate("/dashboard/subscribers");
    setIsProfileOpen(false);
  };

  const handleOnProfile = () => {
    navigate("/dashboard/profile");
    setIsProfileOpen(true);
    console.log("isProfileOpen", isProfileOpen);
  };

  return (
    <Layout>
      <Header
        className={classes.header}
        style={{
          textAlign: "center",
          // color: "#fff",
          height: 64,
          paddingInline: 50,
          lineHeight: "64px",
          // backgroundColor: "#144272",
        }}
      >
        <div className="flex justify-center relative">
          <Space align="center">
            <h1
              className="text-center font-semibold"
              style={{ color: "#FFC436" }}
            >
              Welcome to Admin Panel!
            </h1>
          </Space>
          <Group position="center" my="xl">
            <ActionIcon
              className="absolute right-0 bg-white"
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[8],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[2],
              })}
            >
              {colorScheme === "dark" ? (
                <IconSun size="1.2rem" />
              ) : (
                <IconMoonStars size="1.2rem" />
              )}
            </ActionIcon>
          </Group>
        </div>
      </Header>
      <Layout hasSider>
        <Sider
         
          trigger={null}
          className="w-[100px] lg:w-[250px]"
          collapsible
          collapsed={collapsed}
          style={{
            width: "500px",
            maxWidth: "500px",
            flex: "0 0 500px",
            backgroundColor: "#1450A3",
          }}
          // style={{
          //   backgroundColor: ${({theme})} =>
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[8]
          //       : theme.colorScheme.gray[0];
          // }}
          onCollapse={(value) => setCollapsed(value)}
          reverseArrow={false}
        >
          <div className="grid place-content-center h-24">
            <img className="w-16" src={logoImage} alt="logo" />
          </div>
          <Menu
            style={{ backgroundColor: "#1450A3" }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <Button
                    onClick={handleOnSubscribers}
                    className="text-blue-400 text-[18px]"
                    style={{ color: "#FFC436" }}
                  >
                    Subscribers
                  </Button>
                ),
              },
              {
                key: "2",
                icon: <ContactsOutlined />,
                label: (
                  <Button
                    onClick={handleOnProfile}
                    className="text-[18px] text-custom-yellow hover:text-custom-blue-medium"
                    style={{ color: "#FFC436" }}
                  >
                    Profile
                  </Button>
                ),
              },
            ]}
          />
          <AntButton
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              color: "white",
              width: 64,
              height: 64,
            }}
          />
        </Sider>
        <Content
          style={{
            // margin: "10px 10px",
            padding: 24,
            minHeight: 1000,
            background: "#0A2646",
            backgroundImage: `url(${
              apn === "GAS" ? gasBackGround : oilBackGround
            })`,
            backgroundSize: "cover",
            margin: 0,
            maxWidth: "100%",
          }}
        >
          <img src={iranFlag} className="w-[50px] laptop:w-[70px] absolute right-0 mr-8 laptop:mr-8 mt-[10px] laptop:mt-[10px] animate__animated animate__zoomInUp"/>
          <Routes>
            <Route path="/dashboard/subscribers" element={<Subscribers />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Routes>
          {isProfileOpen ? <Profile /> : <Subscribers />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
