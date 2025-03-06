import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';

const DisplayInfor = (props) => {
    const { listUsers } = props;   // obj
    // bao quát const [state, setState] = useState(initialState)
    const [isShowHideListUser, setShowHideListUser] = useState(true);  // useState trả ra 2 tham số,  tên state, và công cụ để cập nhật state

    // function component ko có this     
    // this.state = {
    //     isShowHideListUser: true
    // }

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    console.log('>>> call me render')
    useEffect(
        () => {
            // setTimeout(() => {
            //     document.title = 'Miss AnhLe'
            // }, 3000)

            if (listUsers.length === 0) {
                alert('You delete all the user')
            }
            console.log('>>> call me useEffect')
        }, [listUsers]
    );

    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>
                    {isShowHideListUser === true ? 'Hide List User' : 'Show List User'}
                </span>
            </div>
            {isShowHideListUser &&
                <>
                    {/** sử dụng map để lặp */}
                    {listUsers.map((user, index) => {
                        // user ở đây chỉ thể hiện dữ liệu (ở listUsers) đã tạo, có thể thay đổi tên tùy ý
                        // console.log("check user: ", user)
                        return (
                            <>
                                {/* // chuyển từ string sang number thêm dấu + đằng trước
                                // cau dieu kien ? : */}

                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name} </div>
                                    <div>My age's {user.age} </div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                    <hr />
                                </div>
                            </>
                        )
                    })}
                </>
            }
        </div>
    )

}

export default DisplayInfor;