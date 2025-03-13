import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const ManageUser = () => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [listUsers, setListUsers] = useState([]);


    // hàm này chạy sau khi hàm return chạy
    // componentDidMount
    useEffect(() => {
        // console.log('run second useEffect')
        // let res = await getAllUser()
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        console.log('>> check res useEffect: ', res)
        if (res.EC === 0) {
            // trong res có array DT
            // cập nhật List User trong data 
            setListUsers(res.DT)
        }
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manager User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}> <FcPlus /> Add new user</button>
                </div>
                <div className="table-user-container">
                    <TableUser listUsers={listUsers} />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}// truyền fetchListUsers cho modal
                />

            </div>
        </div>
    )
}

export default ManageUser;