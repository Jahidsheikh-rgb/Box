import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorityAcconts = () => {
  const [accounts, setAccounts] = useState([]);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH ACCOUNTS =================
  const fetchAccounts = async () => {
    try {
      const res = await axios.get("/accounts.json"); // replace with your API
      setAccounts(res.data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ================= CREATE ACCOUNT =================
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields are required");

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/admin/create-account",
        { role, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmail("");
      setPassword("");
      fetchAccounts();
    } catch (error) {
      console.error("Account creation failed", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE ACCOUNT =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this account?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/accounts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAccounts();
    } catch (error) {
      console.error("Failed to delete account", error);
    }
  };

  // ================= SPLIT ACCOUNTS =================
  const studentAccounts = accounts.filter((acc) => acc.role === "student");
  const Moderatoraccounts = accounts.filter((acc) => acc.role === "moderator");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* ================= CREATE ACCOUNT ================= */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <form
          onSubmit={handleCreateAccount}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-3 rounded"
          >
            <option value="student">Student</option>
            <option value="authority">Moderator</option>
          </select>

          <input
            type="email"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded px-4 py-3 hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {/* ================= ACCOUNTS LIST ================= */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE - STUDENTS */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 h-[500px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          {studentAccounts.length === 0 ? (
            <p className="text-gray-500">No students found.</p>
          ) : (
            <ul className="space-y-2">
              {studentAccounts.map((acc) => (
                <li
                  key={acc._id}
                  className="flex justify-between items-center border p-3 rounded hover:bg-gray-50"
                >
                  <span>{acc.email}</span>
                  <span>{acc.createdAt}</span>
                  <button
                    onClick={() => handleDelete(acc._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT SIDE - AUTHORITIES */}
        <div className="flex-1 bg-white shadow rounded-lg p-6 h-[500px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Moderator</h2>
          {Moderatoraccounts.length === 0 ? (
            <p className="text-gray-500">No Moderator found.</p>
          ) : (
            <ul className="space-y-2">
              {Moderatoraccounts.map((acc) => (
                <li
                  key={acc._id}
                  className="flex justify-between items-center border p-3 rounded hover:bg-gray-50"
                >
                  <span>{acc.email}</span>
                   <span>{acc.createdAt}</span>
                  <button
                    onClick={() => handleDelete(acc._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityAcconts;


