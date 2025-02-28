import React from "react";

class DisplayInfor extends React.Component {
    render() {
        // props => 
        console.log('>> check props: ', this.props)

        const { name, age } = this.props;   // obj
        return (
            <div>
                <div>My name's {name} </div>
                <div>My age's {age} </div>
            </div>
        )
    }
}

export default DisplayInfor;