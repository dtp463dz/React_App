import SildeBar from "./SileBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";

const Admin = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sildebar">
                {/** truyền props collapsed sang cho SideBar */}
                <SildeBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                {/** FaBars: nút ẩn hiển thanh sidebar  */}
                <FaBars onClick={() => setcollapsed(!collapsed)} />
                Content Go Here
            </div>

        </div>
    )
}

export default Admin;