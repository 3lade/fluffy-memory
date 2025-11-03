import './App.css';
import { useState } from 'react';
import TodoForm from './components/ToolForm';
import TodoList from './components/ToolList';

function App() {
  const [tools, setTools] = useState([]);

  const addTool = (newTool) => {
    setTools((prevTools) => [...prevTools, newTool])
  }

  const removeTool = (id) => {
    setTools((prevTools) => prevTools.filter(tool => tool.id !== id))
  }

  return (
    <div className="container">
      <h1>Tool Lending Tracker</h1>
      <p>Total Lent: {tools.length}</p>
      <TodoForm addTool={addTool}/>
      <TodoList 
        tools={tools}
        removeTool={removeTool}
      />
    </div>
  );
}

export default App;
