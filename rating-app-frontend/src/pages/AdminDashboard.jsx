import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [userForm, setUserForm] = useState({ name: "", email: "", address: "", password: "", role: "USER" });
  const [storeForm, setStoreForm] = useState({ name: "", email: "", address: "", owner_id: "" });

  // Fetch dashboard stats
  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/admin/dashboard");
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await api.get("/stores");
    setStores(res.data);
  };

  // Handle Add User
  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const handleAddUser = async (e) => {
    e.preventDefault();
    await api.post("/users", userForm);
    fetchUsers();
    alert("User added");
  };

  // Handle Add Store
  const handleStoreChange = (e) => setStoreForm({ ...storeForm, [e.target.name]: e.target.value });
  const handleAddStore = async (e) => {
    e.preventDefault();
    await api.post("/stores", storeForm);
    fetchStores();
    alert("Store added");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">Users: {stats.totalUsers}</div>
        <div className="bg-green-100 p-4 rounded shadow">Stores: {stats.totalStores}</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Ratings: {stats.totalRatings}</div>
      </div>

      {/* Add User */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add User</h2>
        <form onSubmit={handleAddUser} className="grid grid-cols-5 gap-2">
          <input name="name" placeholder="Name" className="border p-2" value={userForm.name} onChange={handleUserChange} />
          <input name="email" placeholder="Email" className="border p-2" value={userForm.email} onChange={handleUserChange} />
          <input name="address" placeholder="Address" className="border p-2" value={userForm.address} onChange={handleUserChange} />
          <input name="password" placeholder="Password" type="password" className="border p-2" value={userForm.password} onChange={handleUserChange} />
          <select name="role" className="border p-2" value={userForm.role} onChange={handleUserChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="OWNER">OWNER</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded col-span-5">Add User</button>
        </form>
      </div>

      {/* User List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.address}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Store */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Store</h2>
        <form onSubmit={handleAddStore} className="grid grid-cols-4 gap-2">
          <input name="name" placeholder="Store Name" className="border p-2" value={storeForm.name} onChange={handleStoreChange} />
          <input name="email" placeholder="Store Email" className="border p-2" value={storeForm.email} onChange={handleStoreChange} />
          <input name="address" placeholder="Address" className="border p-2" value={storeForm.address} onChange={handleStoreChange} />
          <input name="owner_id" placeholder="Owner ID" className="border p-2" value={storeForm.owner_id} onChange={handleStoreChange} />
          <button type="submit" className="bg-green-500 text-white p-2 rounded col-span-4">Add Store</button>
        </form>
      </div>

      {/* Store List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Stores</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id} className="border">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.email}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">{s.averageRating || "No Ratings"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
