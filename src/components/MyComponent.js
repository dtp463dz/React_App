import React from "react";
import UserInfor from "./Userinfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {

    render() {
        const myInfor = ['ab', 'abc', 'al']
        return (
            <div>
                <UserInfor />
                <br /><br />
                <DisplayInfor
                    // khai bao trc 
                    name={'Dean'}
                    age={'22'}
                />
                <hr />
                <DisplayInfor
                    name={'Phuc'}
                    age={26}
                    myInfor={myInfor}
                />
            </div>
        );
    }

}

export default MyComponent;