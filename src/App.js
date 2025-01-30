import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetUser from './component/GetUser';
import EditUser from './component/EditUser';
import CreateUser from './component/CreateUser';

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Gestion des utilisateurs
        </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<GetUser />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
