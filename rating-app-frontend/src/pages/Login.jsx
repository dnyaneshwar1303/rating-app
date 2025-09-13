import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      if (res.data.role === "USER") navigate("/user");
      if (res.data.role === "OWNER") navigate("/owner");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email"
          className="border p-2 w-full mb-3" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          className="border p-2 w-full mb-3" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
