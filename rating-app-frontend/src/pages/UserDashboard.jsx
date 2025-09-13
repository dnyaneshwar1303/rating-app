import { useEffect, useState } from "react";
import api from "../api/axios";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });

  // Fetch stores
  const fetchStores = async () => {
    try {
      const res = await api.get("/stores/public", { params: search });
      setStores(res.data);
    } catch (err) {
      alert("Failed to fetch stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Handle rating submit/update
  const handleRating = async (storeId, rating) => {
    try {
      await api.post("/ratings", { storeId, rating });
      fetchStores(); // refresh after update
    } catch (err) {
      alert("Failed to submit rating");
    }
  };

  // Handle password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/password", passwordForm);
      alert("Password updated");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

      {/* Search */}
      <div className="mb-6 flex gap-2">
        <input
          placeholder="Search by Name"
          className="border p-2"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          placeholder="Search by Address"
          className="border p-2"
          value={search.address}
          onChange={(e) => setSearch({ ...search, address: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={fetchStores}
        >
          Search
        </button>
      </div>

      {/* Store List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Stores</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Overall Rating</th>
              <th className="p-2 border">Your Rating</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id} className="border">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">{s.overallRating || "No Ratings"}</td>
                <td className="p-2 border">{s.userRating || "-"}</td>
                <td className="p-2 border">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      className={`px-2 py-1 m-1 rounded ${
                        s.userRating === r
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleRating(s.id, r)}
                    >
                      {r}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Password */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Update Password</h2>
        <form onSubmit={handlePasswordChange} className="flex gap-2">
          <input
            type="password"
            placeholder="Old Password"
            className="border p-2"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-2"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDashboard;
