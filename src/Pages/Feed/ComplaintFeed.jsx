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

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(Array.isArray(data) ? data : []);
      } catch {
        setError("Unable to load complaints from database.");
      } finally {
        setLoading(false);
      }
    };
    loadComplaints();
  }, []);

  const isWithinTime = (createdAt) => {
    if (timeFilter === "all") return true;

    const now = new Date();
    const date = new Date(createdAt);
    const diffInDays = (now - date) / (1000 * 60 * 60 * 24);

    if (timeFilter === "today") return diffInDays <= 1;
    if (timeFilter === "7days") return diffInDays <= 7;
    if (timeFilter === "30days") return diffInDays <= 30;

    return true;
  };

  const filteredComplaints = useMemo(() => {
    if (!Array.isArray(complaints)) return [];

    return complaints.filter((c) => {
      const deptMatch =
        selectedDept === "All" || c.department === selectedDept;

      const statusMatch =
        statusFilter === "all" || c.status === statusFilter;

      const searchMatch =
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase());

      const timeMatch = isWithinTime(c.createdAt);

      return deptMatch && statusMatch && searchMatch && timeMatch;
    });
  }, [complaints, selectedDept, statusFilter, search, timeFilter]);

  const departments = useMemo(() => {
    if (!Array.isArray(complaints)) return ["All"];
    return ["All", ...new Set(complaints.map((c) => c.department))];
  }, [complaints]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar
        selected={selectedDept}
        setSelected={setSelectedDept}
        departments={departments}
      />

      <div className="flex-1 p-4 lg:p-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap gap-4 mb-8 items-center border border-slate-100">
          <input
            type="text"
            placeholder="Search titles..."
            className="input input-bordered flex-1 min-w-[200px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Any Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            className="select select-bordered"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">Any Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        <div className="mb-6 flex justify-between items-center px-2">
          <h2 className="text-xl font-bold text-slate-700">
            Showing {filteredComplaints.length} Complaints
          </h2>
          <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
            {selectedDept} Feed
          </span>
        </div>

        {filteredComplaints.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id || complaint.id}
                complaint={complaint}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">
              No complaints found for this selection 🚫
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setSelectedDept("All");
              }}
              className="btn btn-link btn-sm text-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintFeed;
