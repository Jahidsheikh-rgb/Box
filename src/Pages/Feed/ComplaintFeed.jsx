// pages/ComplaintFeed.jsx
import { useEffect, useState } from "react";
import Sidebar from "../../Components/Complaint/Sidebar"

import { fetchComplaints } from "../../Services/complaintService";
import ComplaintCard from "../../Components/Complaint/ComplaintCard";


const ComplaintFeed = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        setError("Unable to load complaints" + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  const filteredComplaints = complaints.filter((c) => {
    const deptMatch =
      selectedDept === "All" || c.department === selectedDept;

    const searchMatch = c.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return deptMatch && searchMatch;
  });

  if (loading)
    return <p className="p-6">Loading complaints...</p>;

  if (error)
    return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        selected={selectedDept}
        setSelected={setSelectedDept}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-base-200 min-h-screen">
        {/* Search */}
        <input
          type="text"
          placeholder="Search complaints..."
          className="input input-bordered w-full max-w-md mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Complaint Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredComplaints.length ? (
            filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No complaints found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintFeed;
