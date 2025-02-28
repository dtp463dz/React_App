import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Dean',
        address: 'Vinh Phuc',
        age: 22,
    }

    handleClick(event) {
        // console.log(" My name is", this.state.name, "Adress ", this.state.address);
        console.log(">> click me")

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
        console.log(">>> check form input:  ", event.target.value)

    }

    handleSubmit = (event) => {
        event.preventDefault(); // hàm k load lại website
        console.log('>> check submit: ', this.state.name)
    }

    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age} years old.
                {/* <button onClick={(event) => { this.handleClick(event) }}>Click me</button> */}
                {/* <button onMouseOver={this.handleOnMoverOver}>Over</button> */}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }

}

export default MyComponent;