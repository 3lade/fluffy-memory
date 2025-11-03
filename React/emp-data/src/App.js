import './App.css';
import EmpDashboard from './components/EmpDashboard';

const employees = ['Yeshwanth', 'venu', 'VenuGf', 'VenuGf2', 'randiVenu', 'kutti', 'bevdi']

function App() {
  return (
    <div className="App">
      <EmpDashboard Emp={employees}/>
    </div>
  );
}

export default App;
