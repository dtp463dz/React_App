import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {

    // const listUsers = props.listUsers
    const { listUsers, pageCount } = props;

    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected} `);
        props.fetchListUsersWithPaginate(+event.selected + 1); // do tính từ 0 nên phải +1, dấu + để convert sang number của chuỗi string
        props.setCurrentPage(+event.selected + 1); // môĩ khi chuyển trang, có state để biêts ng dùng đang ở trang naò
    };

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
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(item)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)} // từ cha truyền xuống, clicl update user, gắn item để hiển thị thông tin đã có
                                        >Update</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >Delete</button>
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
            <div className="user-pagination d-flex justify-content-center"> {/** đã dùng boostrap */}
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount} // tổng số trang đang có
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1} // ép quay về trang 1, thư viện tính trang từ số 0, còn currentPage tính từ 1
                />
            </div>

        </>
    )
}

export default TableUserPaginate;