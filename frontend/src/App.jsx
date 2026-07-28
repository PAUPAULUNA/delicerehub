import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard,  Auth } from './pages';
import Sidebar from './components/shared/Sidebar';

function App() {

  return (
    <>
      <Router>
        <div className="main">
          <Sidebar />
          <Dashboard />
        </div>
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
