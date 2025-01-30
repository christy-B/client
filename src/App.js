import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetUser from './component/GetUser';
import EditUser from './component/EditUser';

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Gestion des utilisateurs
        </p>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<GetUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
