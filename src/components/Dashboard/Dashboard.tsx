import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
// Images
import logoImage from "../../images/logo.png";

import { Layout, Menu, Button, Space } from "antd";
// import {
//   useGetProfilesQuery,
//   useAddProfileMutation,
//   useDeleteProfileMutation,
//   useUpdateProfileMutation,
// } from "../../services/api";
// Components
import InputWithButton from "../Dashboard/components/SearchInput";
import InputButton from "../Dashboard/components/InputButton/inputButton";

const { Header, Sider, Content } = Layout;

// interface Profile {
//   id: string;
//   IMSI: string;
//   connected: boolean;
// }
const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [newProfile, setNewProfile] = useState("");
  // const {
  //   data: profiles = [],
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetProfilesQuery();
  // const [addProfile] = useAddProfileMutation();
  // const [updateProfile] = useUpdateProfileMutation();
  // const [deleteProfile] = useDeleteProfileMutation();

  // useEffect(() => {
  //   console.log("profile is:", profiles);
  // }, []);
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   addProfile(e.target["IMSI"]);
  //   e.target.reset();
  //   console.log("submit is:", e.target);

  //   setNewProfile("");
  // };

  // const newItemSection = (
  //   <form onSubmit={(e) => handleSubmit(e)} className=" border-2 border-white">
  //     <label htmlFor="new-profile">Enter a new profile item</label>
  //     <div className="new-profile">
  //       <input
  //         type="text"
  //         id="new-profile"
  //         value={newProfile}
  //         onChange={(e) => setNewProfile(e.target.value)}
  //         placeholder="Enter new IMSI ..."
  //       />
  //     </div>
  //     <button type="submit" className="border-2 border-white">
  //       <FontAwesomeIcon icon={faUpload} style={{ color: "#fbfdf7" }} />{" "}
  //     </button>
  //   </form>
  // );

  // let content;
  // if (isLoading) {
  //   content = <p>Loading ...</p>;
  // } else if (isSuccess) {
  //   console.log("profiles is: ", profiles);

  //   content = profiles.map((profile: Profile) => {
  //     //JSON.stringify(todos)
  //     return (
  //       <article key={profile.id} className=" border-2 border-white">
  //         <div className="profile">
  //           <input
  //             type="checkbox"
  //             checked={profile.connected}
  //             id={profile.id}
  //             onChange={() =>
  //               updateProfile({ ...profile, connected: !profile.connected })
  //             }
  //           />
  //           <label htmlFor={profile.id} className="text-white">
  //             {profile.IMSI}
  //           </label>
  //         </div>
  //         <button
  //           className="trash"
  //           onClick={() => deleteProfile({ id: profile.id })}
  //         >
  //           <FontAwesomeIcon icon={faTrash} />
  //         </button>
  //       </article>
  //     );
  //   });
  // } else if (isError) {
  //   content = <p>{error.status}</p>;
  // }

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
          backgroundColor: "#144272",
        }}
      >
        <div className="">
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
          style={{ backgroundColor: "#2C74B3" }}
          onCollapse={(value) => setCollapsed(value)}
          reverseArrow={false}
        >
          <div className="grid place-content-center h-24">
            <img className="w-16" src={logoImage} alt="logo" />
          </div>
          <Menu
            style={{ backgroundColor: "#2C74B3" }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Profiles",
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "Admin Info",
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
            background: "#0A2647",
            margin: 0,
            maxWidth: "100%",
          }}
        >
          <div className="grid place-content-center">
            <span className="text-white">Search</span>
            <InputWithButton />
          </div>
          <InputButton />
          {/* <main className="m-0">
            <h1 className="text-white">Profile List</h1>
            {newItemSection}
            {content}
          </main> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
