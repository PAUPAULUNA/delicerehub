import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from './pages';
import Sidebar from './components/shared/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import Inventory from './pages/Admin/Inventory';
import UserManagement from './pages/Admin/UserManagement';
import SalesReport from './pages/Admin/SalesReport';
import Settings from './pages/Admin/Settings';

function App() {

  return (
      <Router>
        <div className="main">
          <Sidebar />
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/Sales" element={<SalesReport />} />
          <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    
  )
}

export default App
