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

    handleAddNewUser = (userObj) => {
        console.log('>>> check data from parent: ', userObj)

        // Thêm mới vào state
        this.setState({
            // ... để copy lại state còn sau dấu , userObj sẽ được thêm vào đầu hoặc cuối mảng tùy vào cách nó ở đầu hay ở cuối
            listUsers: [userObj, ...this.state.listUsers], // userObj được thêm ở đầu 
        })
    }
    render() {
        const test = { name: 'Dean', age: 25 }

        return (
            <>
                {console.log('check test', test)}
                {JSON.stringify(test)}  {/** Hiển thị obj ra ngoài màn hình */}
                <br />
                <div className="a">
                    <AddUserInfor
                        // ko có dấu () trong handleAddNewUser
                        // vì handleAddNewUser() đang gọi đến func, nhưng ta cần tham chiếu  
                        handleAddNewUser={this.handleAddNewUser} // function as Props
                    />
                    <br /><br />
                    <DisplayInfor
                        listUsers={this.state.listUsers}
                    />
                </div>
                <div className="b">

                </div>
            </>
        );
    }

}

export default MyComponent;