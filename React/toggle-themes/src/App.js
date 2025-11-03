import './App.css';
import AuthProvider from './Components/AuthProvider';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import SomeComponent from './Components/SomeComponent';
import ThemeProvider from './Components/ThemeProvider';
import UserProfile from './Components/UserProfile';

function App() {
    console.log('rendering from App');
  return (
    <div className="App">
      <AuthProvider>
        <SomeComponent>
          <ThemeProvider>
            <Dashboard />
            <UserProfile />
            <Settings />
          </ThemeProvider>
        </SomeComponent>
      </AuthProvider>
    </div>
  );
}

export default App;