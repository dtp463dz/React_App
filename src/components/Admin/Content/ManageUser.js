import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {

    const LIMIT_USER = 6;   // giới hạn user
    const [pageCount, setPageCount] = useState(0); // trong trg hợp tham số page count = 0 thì nó k hiển thị phân trang

    const [showModalCreateUser, setShowModalCreateUser] = useState(false); // modal create user: false (đóng)
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false); // modal update user: false (đóng)
    const [showModalViewUser, setShowModalViewUser] = useState(false); // modal view user 
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false); // modal delete user

    const [dataUpdate, setDataUpdate] = useState({});  // data tượng trưng cho user muốn update, kiểu obj rỗng
    const [dataView, setDataView] = useState({}); // data tượng trưng cho user muốn view
    const [dataDelete, setDataDelete] = useState({})
    const [listUsers, setListUsers] = useState([]); // list user


    // hàm này chạy sau khi hàm return chạy
    // componentDidMount
    useEffect(() => {
        // console.log('run second useEffect')
        // let res = await getAllUser()
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);
    // fetchListUsers get tất cả người dùng 
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        //    console.log('>> check res useEffect: ', res)
        if (res.EC === 0) {
            // trong res có array DT
            // cập nhật List User trong data 
            setListUsers(res.DT)
        }
    }
    // fetchListUsersWithPaginte get người dùng theo kiểu phân trang 
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            console.log('res.data user with paginate: ', res.DT.users)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)     // totalPages xem trong API
        }
    }
    // click button update user
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true); // click vào btn thì modal được mở 
        setDataUpdate(user);
        //    console.log('check user btn update: ', user) // user: hiển thị đầy đủ thông tin user muốn update
    }
    // reset lại phần modal update khi ấn close
    const resetUpdateData = () => {
        setDataUpdate({});
    }

    // click button view user
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true); // click btn -> modal open
        setDataView(user);
        // console.log('check view user', user)
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true) // click btn delete -> modal open
        setDataDelete(user);
        console.log('check delete user', user)
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
                    {/* <TableUser
                        listUsers={listUsers}   // truyền list user 
                        handleClickBtnUpdate={handleClickBtnUpdate} // truyền xg con (table user)
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}   // truyền list user 
                        handleClickBtnUpdate={handleClickBtnUpdate} // truyền xg con (table user)
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                    />
                </div>

                <ModalCreateUser
                    show={showModalCreateUser}      // hiển thị modal create user
                    setShow={setShowModalCreateUser} // truyền setShow cho modal create
                    fetchListUsers={fetchListUsers}// truyền fetchListUsers cho modal
                />
                <ModalUpdateUser
                    show={showModalUpdateUser} // hiển thị modal update user
                    setShow={setShowModalUpdateUser} // truyền setShow cho modal update
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}     // truyền fetchListUser API cho modal
                    resetUpdateData={resetUpdateData}
                />

                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}

                />
                <ModalDeleteUser
                    show={showModalDeleteUser}// hiển thị modal delete user
                    setShow={setShowModalDeleteUser} // truyen setShow cho modal
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}     // truyền fetchListUser API cho modal để gọi lại ds user
                />
            </div>
        </div>
    )
}

export default ManageUser;