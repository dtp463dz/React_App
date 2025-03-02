import React from "react";

class AddUserInfor extends React.Component {
    state = {
        name: 'Dean',
        address: 'Vinh Phuc',
        age: 22,
    }

    handleClick(event) {
        // console.log(" My name is", this.state.name, "Adress ", this.state.address);
        // console.log(">> click me")

        //thay doi state 
        // merge state chỉ ở react class
        this.setState({
            name: 'Ngoc Anh',
            age: Math.floor((Math.random() * 100) + 1)
        })
    }

    handleOnMoverOver(event) {
        // console.log(event)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
        // console.log(">>> check form input:  ", event.target.value)
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
        // console.log(">>> check form input:  ", event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault(); // hàm k load lại website
        // console.log('>> check submit: ', this.state)

        // gọi props
        // đang chạy nó thì cần dấu ()
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random', // đảm bảo ko bị trùng id đã có 
            name: this.state.name,
            age: this.state.age
        })
        // khi ấn submit xong thì form dc clear
        this.setState({
            name: '',
            age: ''
        })

    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age} years old.
                {/* <button onClick={(event) => { this.handleClick(event) }}>Click me</button> */}
                {/* <button onMouseOver={this.handleOnMoverOver}>Over</button> */}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Your name: </label>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />

                    <label>Your age: </label>
                    <input
                        value={this.state.age}
                        type="text"
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfor;