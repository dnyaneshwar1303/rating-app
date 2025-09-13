import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">User Signup</h2>
        <input name="name" placeholder="Full Name"
          className="border p-2 w-full mb-3" value={form.name}
          onChange={handleChange} />
        <input name="email" type="email" placeholder="Email"
          className="border p-2 w-full mb-3" value={form.email}
          onChange={handleChange} />
        <input name="address" placeholder="Address"
          className="border p-2 w-full mb-3" value={form.address}
          onChange={handleChange} />
        <input name="password" type="password" placeholder="Password"
          className="border p-2 w-full mb-3" value={form.password}
          onChange={handleChange} />
        <button type="submit"
          className="bg-green-500 text-white p-2 w-full rounded">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
