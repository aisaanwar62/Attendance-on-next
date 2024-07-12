import React from "react";
import Sidebar from "./adminlayout/sidebar";
import Navbar from "./adminlayout/navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Navbar />

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
