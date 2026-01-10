import { useState } from "react";

const statusColors = {
  running: "badge-warning",
  solved: "badge-success",
  rejected: "badge-error",
};

const ComplaintCard = ({ complaint, onStatusUpdate }) => {
  const [status, setStatus] = useState(complaint.status || "running");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // callback for API call (clean architecture)
      if (onStatusUpdate) {
        await onStatusUpdate(complaint.id, status);
      }

    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      
      {/* Image */}
      {complaint.image && (
        <figure>
          <img
            src={complaint.image}
            alt="complaint"
            className="h-52 w-full object-cover"
          />
        </figure>
      )}

      {/* Body */}
      <div className="card-body space-y-3">

        {/* Title & Department */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title text-lg">
            {complaint.title}
          </h2>

          <span className="badge w-full badge-outline">
            {complaint.department}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {complaint.description}
        </p>
        

       
        <div className="flex justify-between text-xs text-gray-400">
          <span>By {complaint.author}</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded-full">
            By {complaint.problemType}
          </span>
          <span>
            {new Date(complaint.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Status & Action */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t">

          {/* Status Badge */}
          <span
            className={`badge capitalize ${
              statusColors[status]
            }`}
          >
            {status}
          </span>

          {/* Status Selector */}
          <div className="flex gap-2 items-center">
            <select
              className="select select-sm select-bordered"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="running">Running</option>
              <option value="solved">Solved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-sm btn-primary"
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintCard;
