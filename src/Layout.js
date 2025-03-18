import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    {/** Index Route */}
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>

                <Route path="/admin" element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>

                <Route path="/login" element={<Login />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}
export default Layout;