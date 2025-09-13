import React from "react";

const Navbar = () => {
  return (
    <nav style={{ background: "#1E40AF", color: "white", padding: "10px", display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>Rating App</div>
      <div>
        <a href="/" style={{ margin: "0 10px", color: "white" }}>Home</a>
        <a href="/stores" style={{ margin: "0 10px", color: "white" }}>Stores</a>
        <a href="/login" style={{ margin: "0 10px", color: "white" }}>Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
