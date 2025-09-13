// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AdminDashboard from "./pages/AdminDashboard";
// import UserDashboard from "./pages/UserDashboard";
// import OwnerDashboard from "./pages/OwnerDashboard";
// import Navbar from "./components/Navbar";
// import StoreCard from "./components/StoreCard";

// function App() {
//   const role = localStorage.getItem("role");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {role === "ADMIN" && <Route path="/admin" element={<AdminDashboard />} />}
//         {role === "USER" && <Route path="/user" element={<UserDashboard />} />}
//         {role === "OWNER" && <Route path="/owner" element={<OwnerDashboard />} />}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your pages and components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Navbar from "./components/Navbar";
import StoreCard from "./components/StoreCard";

// Sample store data
const stores = [
  { id: 1, name: "SuperMart", category: "Grocery", rating: 4 },
  { id: 2, name: "TechWorld", category: "Electronics", rating: 5 },
];

function App() {
  // Get user role from localStorage
  const role = localStorage.getItem("role");

  // Minimal dashboards for submission
  const Dashboard = ({ role }) => (
    <div style={{ padding: "20px" }}>
      <h1>{role} Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );

  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based dashboards */}
        {role === "ADMIN" && (
          <Route path="/admin" element={<Dashboard role="Admin" />} />
        )}
        {role === "USER" && (
          <Route path="/user" element={<Dashboard role="User" />} />
        )}
        {role === "OWNER" && (
          <Route path="/owner" element={<Dashboard role="Owner" />} />
        )}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
