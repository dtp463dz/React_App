import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Dean", age: "17" },
            { id: 2, name: "NgocAnh", age: "22" },
            { id: 3, name: "TPhuc", age: "50" }
        ]
    }

    handleAddNewUser = (userID) => {
        console.log('>>> check data from parent: ', userID)

        // Thêm mới vào state
        this.setState({
            // ... để copy lại state còn sau dấu , userID sẽ được thêm vào đầu hoặc cuối mảng tùy vào cách nó ở đầu hay ở cuối
            listUsers: [userID, ...this.state.listUsers], // userID được thêm ở đầu 
        })
    }
    // delete user
    handleDeleteUser = (userID) => {
        let currentUser = this.state.listUsers;
        currentUser = currentUser.filter(item => item.id !== userID);

        this.setState({
            listUsers: currentUser
        })

    }
    render() {

        return (
            <>
                <div className="a">
                    <AddUserInfor
                        // ko có dấu () trong handleAddNewUser
                        // vì handleAddNewUser() đang gọi đến func, nhưng ta cần tham chiếu  
                        handleAddNewUser={this.handleAddNewUser} // function as Props

                    />
                    <br /><br />
                    <DisplayInfor
                        listUsers={this.state.listUsers}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </div>
                <div className="b">

                </div>
            </>
        );
    }

}

export default MyComponent;