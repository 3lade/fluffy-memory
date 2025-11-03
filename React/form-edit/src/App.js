import React from 'react';
import ExpenseTracker from './components/ExpenseTracker';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ExpenseTracker/>
      </div>
    );
  }
}

export default App;