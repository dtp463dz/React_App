
const TableUser = (props) => {
    // const listUsers = props.listUsers
    const { listUsers } = props;



    // console.log('render view')
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">ID</th>
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
                            // console.log('check item', item)
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary">View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)} // từ cha truyền xuống, clicl update user, gắn item để hiển thị thông tin đã có
                                        >Update</button>
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