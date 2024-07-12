// import React from "react";
// import Sidebar from "./sidebar";
// import Navbar from "./navbar";

// function AdminLayout() {
//   return (
//     <div className="flex ">
//       <Sidebar />
//       <div className="flex-1 flex flex-col relative">
//         <Navbar />
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;
import React from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

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
