import React from "react";

class DisplayInfor extends React.Component {
    render() {
        // props => 
        console.log('>> check props: ', this.props)

        const { listUsers } = this.props;   // obj
        // console.log('>> check listUsers: ', listUsers)
        return (
            <div>
                {listUsers.map((user) => {
                    // user ở đây chỉ thể hiện dữ liệu (ở listUsers) đã tạo, có thể thay đổi tên tùy ý
                    console.log("check user: ", user)
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name} </div>
                            <div>My age's {user.age} </div>
                            <hr />
                        </div>
                    )
                })}
                {/* <div>My name's {name} </div>
                <div>My age's {age} </div> */}

            </div>
        )
    }
}

export default DisplayInfor;