import React, { useEffect, useState } from "react";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/notice.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notice.json");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid notice data");

        console.log("All notices:", data);
        setNotices(data); // ✅ store all data
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading notices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📢 All Notices</h2>

      {notices.length === 0 ? (
        <p className="text-gray-500">No notices found.</p>
      ) : (
        <div className="grid gap-4">
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
  );
};

export default Notice;
