import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HappyBirthday from './test/Happy';
import MyComponent from './components/MyComponent';

const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      Hello World With ReactJS
      <MyComponent />
    </div>
    // <Router>
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <div>Count = {count}</div>
    //       <button onClick={() => dispatch(increaseCounter())}>Increase</button>
    //       <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
    //       <nav>
    //         <Link to="/">Home</Link>|<Link to="/birthday">Happy Birthday</Link>
    //       </nav>
    //     </header>
    //     <Routes>
    //       <Route path="/birthday" element={<HappyBirthday />} />
    //       <Route path="/" element={<div>Welcome to the Home Page</div>} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;