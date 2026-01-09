import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ================= FETCH ALL NOTICES =================
  const fetchNotices = async () => {
    try {
      const res = await axios.get("/notice.json");
      setNotices(res.data);
    } catch (error) {
      console.error("Failed to fetch notices", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ================= POST NEW NOTICE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      return alert("Title and message are required");
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/notices",
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setMessage("");
      fetchNotices();
    } catch (error) {
      console.error("Failed to post notice", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6">
      
      {/* ================= NOTICE LIST (LEFT - SCROLLABLE) ================= */}
      <div className="flex-1 h-[calc(100vh-100px)] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold mb-4">📢 All Notices</h2>

        {notices.length === 0 ? (
          <p className="text-gray-500">No notices found.</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className={`border-l-4 p-4 rounded shadow bg-white ${
                  notice.priority === "high"
                    ? "border-red-500"
                    : "border-green-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {notice.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {notice.issuedBy}
                  </span>
                </div>

                <p className="text-gray-600 mt-1">
                  {notice.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  From: {new Date(notice.startTime).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  To: {new Date(notice.endTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= POST NOTICE (RIGHT - STICKY) ================= */}
      <div className="w-[380px] sticky top-6 h-fit">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Post New Notice
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <textarea
              placeholder="Notice Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-3 rounded"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Posting..." : "Post Notice"}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AdminNotice;
