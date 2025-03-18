import SildeBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sildebar">
                {/** truyền props collapsed sang cho SideBar */}
                <SildeBar collapsed={collapsed} />
            </div>

            <div className="admin-content">

                <div className="admin-header">
                    {/** FaBars: nút ẩn hiển thanh sidebar  */}

                    <FaBars onClick={() => setcollapsed(!collapsed)} />

                </div>
                <div className="admin-main">
                    <Outlet />

                </div>

            </div>


        </div>
    )
}

export default Admin;