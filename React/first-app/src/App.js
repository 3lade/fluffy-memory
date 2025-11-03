import logo from './logo.svg';
import './App.css';
import ClassComponent from './components/ClassComponent';
import FunctionComponent from './components/FunctionComponent';
/*
  Fix: Ensure the import casing matches the actual file name.
  If your file is named 'FunctionComponent.jsx', update the import to:
*/
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi man</p>
        <ClassComponent value = "props in class"/>
        <FunctionComponent value = "props in function"/>
      </header>
    </div>
  );
}

export default App;

// import React, { Component } from 'react'

// class App extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       count: 0
//     }
//   }

//   handleIncrement = () => {
//     this.setState({count: this.state.count + 1})
//   }

//   render() {
//     return (
//       <div>
//         <div className='App'>
//           <h1>Hey! My count is: {this.state.count}</h1>
//           <button onClick={this.handleIncrement}>+</button>
//           <button onClick={() => this.setState({count: this.state.count - 1})}>-</button>
//           <button onClick={() => this.setState({count: 0})}>Reset</button>
//         </div>
//       </div>
//     )
//   }
// }

// export default App;

