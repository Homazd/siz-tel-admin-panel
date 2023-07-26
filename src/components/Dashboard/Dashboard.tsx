import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

import { Layout, Menu, Button, Space } from "antd";
import {
  useGetProfilesQuery,
  useAddProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} from "../../services/api";

const { Header, Sider, Content } = Layout;

interface Profile {
  id: string;
  IMSI: string;
  connected: boolean;
}
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [newProfile, setNewProfile] = useState("");
  const {
    data: profiles = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProfilesQuery();
  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  // useEffect(() => {
  //   console.log("profile is:", profiles);
  // }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addProfile(e.target["IMSI"]);
    e.target.reset();
    console.log("submit is:", e.target);

    setNewProfile("");
  };

  const newItemSection = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="new-profile">Enter a new profile item</label>
      <div className="new-profile">
        <input
          type="text"
          id="new-profile"
          value={newProfile}
          onChange={(e) => setNewProfile(e.target.value)}
          placeholder="Enter new IMSI ..."
        />
      </div>
      <button type="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    console.log("profiles is: ", profiles);

    content = profiles.map((profile: Profile) => {
      //JSON.stringify(todos)
      return (
        <article key={profile.id}>
          <div className="profile">
            <input
              type="checkbox"
              checked={profile.connected}
              id={profile.id}
              onChange={() =>
                updateProfile({ ...profile, connected: !profile.connected })
              }
            />
            <label htmlFor={profile.id}>{profile.IMSI}</label>
          </div>
          <button
            className="trash"
            onClick={() => deleteProfile({ id: profile.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error.status}</p>;
  }

  return (
    <Layout>
      <Header
        className="space-align-container"
        style={{
          textAlign: "center",
          color: "#fff",
          height: 64,
          paddingInline: 50,
          lineHeight: "64px",
          backgroundColor: "#A4BE7B",
        }}
      >
        <div className="space-align-block">
          <Space align="center">
            <h1>Welcome to Admin Panel!</h1>
          </Space>
        </div>
      </Header>
      <Layout hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "#5F8D4E" }}
          onCollapse={(value) => setCollapsed(value)}
          reverseArrow={false}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{ backgroundColor: "#5F8D4E" }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
          <Button
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
            background: " #E5D9B6",
          }}
        >
          Search
          <main>
            <h1>Profile List</h1>
            {newItemSection}
            {content}
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
