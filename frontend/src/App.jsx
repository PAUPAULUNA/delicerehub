import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Auth } from "./pages";
import Sidebar from "./components/shared/Sidebar";
import Processing from "./components/shared/Processing";
import Dashboard from "./pages/Admin/Dashboard";
import Inventory from "./pages/Admin/Inventory";
import UserManagement from "./pages/Admin/UserManagement";
import SalesReport from "./pages/Admin/SalesReport";
import Settings from "./pages/Admin/Settings";
import OrderModal from "./components/shared/OrderModal";
import ActiveOrders from "./components/shared/ActiveOrders";

function App() {
  return (
    <Router>
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/order-window" element={<OrderModal />} />
          <Route path="active-orders" element={<ActiveOrders />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
