import React from "react";

class DisplayInfor extends React.Component {
    state = {
        isShowListUser: true,
    }
    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {
        // props => 
        // console.log('>> check props: ', this.props)

        const { listUsers } = this.props;   // obj
        // console.log('>> check listUsers: ', listUsers)
        const { isShowListUser } = this.state;
        const check = isShowListUser === true ? 'isShowListUser = true' : 'isShowListUser = false';
        console.log('>> check is show ListUser: ', check)
        return (
            <div>
                <div>
                    <span onClick={() => this.handleShowHide()} style={{ cursor: 'pointer' }}>
                        {this.state.isShowListUser === true ? 'Hide list user' : 'Show list user'}
                    </span>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {/** sử dụng map để lặp */}
                        {listUsers.map((user) => {
                            // user ở đây chỉ thể hiện dữ liệu (ở listUsers) đã tạo, có thể thay đổi tên tùy ý
                            // console.log("check user: ", user)
                            return (
                                // chuyển từ string sang number thêm dấu + đằng trước
                                // cau dieu kien ? :
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name} </div>
                                    <div>My age's {user.age} </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor;