import React from "react";
import './DisplayInfor.scss';
// import logo from '../assets/images/hoa2.jpg';

//Stateful 
// class DisplayInfor extends React.Component {
//     render() {
//         // props => 
//         // console.log('>> check props: ', this.props)
//         console.log('>> call me render')
//         const { listUsers } = this.props;   // obj
//         // console.log('>> check listUsers: ', listUsers)
//         // const { isShowListUser } = this.state;
//         // const check = isShowListUser === true ? 'isShowListUser = true' : 'isShowListUser = false';
//         // console.log('>> check is show ListUser: ', check)
//         return (
//             <div className="display-infor-container">
//                 {true &&
//                     <>
//                         {/** sử dụng map để lặp */}
//                         {listUsers.map((user, index) => {
//                             // user ở đây chỉ thể hiện dữ liệu (ở listUsers) đã tạo, có thể thay đổi tên tùy ý
//                             // console.log("check user: ", user)
//                             return (
//                                 <>
//                                     {/* // chuyển từ string sang number thêm dấu + đằng trước
//                                 // cau dieu kien ? : */}
//                                     <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                                         <div>My name's {user.name} </div>
//                                         <div>My age's {user.age} </div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                         <hr />
//                                     </div>
//                                 </>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

// stateless
const DisplayInfor = (props) => {
    const { listUsers } = props;   // obj
    return (
        <div className="display-infor-container">
            {true &&
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