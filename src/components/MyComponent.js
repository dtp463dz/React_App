import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: "Dean", age: "17" },
            { id: 2, name: "NgocAnh", age: "22" },
            { id: 3, name: "TPhuc", age: "50" }
        ]
    }
    render() {
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    listUsers={this.state.listUsers}
                />
            </div>
        );
    }

}

export default MyComponent;