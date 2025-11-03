import { useState } from 'react';
import './App.css';
import CropForm from './components/CropForm';
import CropList from './components/CropList';

function App() {
  const [currentCrop, setCurrentCrop] = useState(null)

  return (
    <div className="App">
      <CropForm currentCrop={currentCrop} setCurrentCrop={setCurrentCrop}/>
      <CropList setCurrentCrop={setCurrentCrop}/>
    </div>
  );
}

export default App;
