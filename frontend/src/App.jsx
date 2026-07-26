import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Orders, Auth } from './pages';
import Sidebar from './components/shared/Sidebar';

function App() {

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
