import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const TableUser = (props) => {

    const [listUsers, setListUsers] = useState([

    ]);

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

    // console.log('render view')
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/** loop list user dùng map */}
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            console.log('check item', item)
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {/**check nếu k có data */}
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>
                                Not found data

                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;