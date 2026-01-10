// pages/ComplaintFeed.jsx
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../Components/Complaint/Sidebar";
import ComplaintCard from "../../Components/Complaint/ComplaintCard";
import { fetchComplaints } from "../../Services/complaintService";

const ComplaintFeed = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH COMPLAINTS =================
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch {
        setError("Unable to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  // ================= TIME FILTER FUNCTION =================
  const isWithinTime = (createdAt) => {
    if (timeFilter === "all") return true;

    const now = new Date();
    const date = new Date(createdAt);
    const diffInDays =
      (now - date) / (1000 * 60 * 60 * 24);

    switch (timeFilter) {
      case "today":
        return diffInDays <= 1;
      case "7days":
        return diffInDays <= 7;
      case "30days":
        return diffInDays <= 30;
      default:
        return true;
    }
  };

  // ================= FILTERED COMPLAINTS =================
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const deptMatch =
        selectedDept === "All" || c.department === selectedDept;

      const statusMatch =
        statusFilter === "all" || c.status === statusFilter;

      const searchMatch = c.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const timeMatch = isWithinTime(c.createdAt);

      return deptMatch && statusMatch && searchMatch && timeMatch;
    });
  }, [complaints, selectedDept, statusFilter, search, timeFilter]);

  // ================= UNIQUE DEPARTMENTS =================
  const departments = useMemo(() => {
    return ["All", ...new Set(complaints.map((c) => c.department))];
  }, [complaints]);

  // ================= UI STATES =================
  if (loading)
    return (
      <div className="p-6 text-center text-lg font-medium">
        Loading complaints...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* ================= SIDEBAR ================= */}
      <Sidebar selected={selectedDept} setSelected={setSelectedDept} />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6">
        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search complaints..."
            className="input input-bordered w-full md:max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Department Filter */}
          <select
            className="select select-bordered w-full md:max-w-xs"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="select select-bordered w-full md:max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="solved">Solved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Time Filter */}
          <select
            className="select select-bordered w-full md:max-w-xs"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        {/* ================= COMPLAINT GRID ================= */}
        {filteredComplaints.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No complaints found 🚫
          </p>
        )}
      </div>
    </div>
  );
};

export default ComplaintFeed;
