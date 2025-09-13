import { useEffect, useState } from "react";
import api from "../api/axios";

function OwnerDashboard() {
  const [store, setStore] = useState(null);

  // Fetch store + ratings
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/owner/dashboard");
      setStore(res.data);
    } catch (err) {
      alert("Failed to fetch dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      {store ? (
        <div>
          {/* Store Info */}
          <div className="mb-6 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold">{store.store.name}</h2>
            <p className="text-gray-700">Address: {store.store.address}</p>
            <p className="font-semibold mt-2">
              Average Rating:{" "}
              {store.averageRating ? store.averageRating.toFixed(2) : "No Ratings"}
            </p>
          </div>

          {/* User Ratings */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Users Who Rated</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Rating</th>
                </tr>
              </thead>
              <tbody>
                {store.ratedUsers.length > 0 ? (
                  store.ratedUsers.map((u) => (
                    <tr key={u.id} className="border">
                      <td className="p-2 border">{u.name}</td>
                      <td className="p-2 border">{u.email}</td>
                      <td className="p-2 border">{u.rating}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-2 text-center">
                      No ratings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
}

export default OwnerDashboard;
