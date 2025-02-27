import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyComponent from './components/MyComponent';
import React from 'react';

class App extends React.Component {
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

    // 
  }

  handleOnMoverOver(event) {
    console.log(event)
  }

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <button onClick={(event) => { this.handleClick(event) }}>Click me</button>
        <button onMouseOver={this.handleOnMoverOver}>Over</button>
      </div>
    );
  }
}

// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// }

export default App;