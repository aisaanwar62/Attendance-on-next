import React from "react";
import Sidebar from "./userlayout/sidebar";
import Navbar from "./userlayout/navbar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Navbar />

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
