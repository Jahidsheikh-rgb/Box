import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-8 text-slate-800">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Welcome, John 👋</h1>
        <p className="text-slate-500 mt-1">
          Track and manage university complaints in one place
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Complaints" value="12" color="emerald" />
        <StatCard title="Resolved" value="7" color="blue" />
        <StatCard title="Pending" value="5" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Complaints Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Complaints</h2>
            <input
              type="text"
              placeholder="Search complaints..."
              className="input input-bordered input-sm w-56"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <TableRow
                  title="Broken Road near Gate"
                  dept="Infrastructure"
                  date="Jan 5, 2025"
                  status="Pending"
                />
                <TableRow
                  title="WiFi Not Working"
                  dept="IT Support"
                  date="Jan 3, 2025"
                  status="Resolved"
                />
                <TableRow
                  title="Hostel Water Issue"
                  dept="Hostel"
                  date="Jan 1, 2025"
                  status="In Progress"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Complaint */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Submit Complaint</h2>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center mb-6">
            <p className="text-sm text-slate-500">
              Upload photo (optional)
            </p>
            <button className="btn btn-sm btn-outline mt-3">
              Upload Image
            </button>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Complaint title"
              className="input input-bordered w-full"
            />

            <select className="select select-bordered w-full">
              <option>Select Department</option>
              <option>Infrastructure</option>
              <option>Electrical</option>
              <option>IT Support</option>
              <option>Hostel</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Describe the issue..."
            ></textarea>

            <button className="btn btn-success w-full">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Sub Components ---------------- */

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className={`text-4xl font-bold text-${color}-500 mt-2`}>
      {value}
    </h3>
  </div>
);

const statusStyle = {
  Pending: "badge-warning",
  Resolved: "badge-success",
  "In Progress": "badge-info",
};

const TableRow = ({ title, dept, date, status }) => (
  <tr className="hover:bg-slate-50">
    <td className="font-medium">{title}</td>
    <td>{dept}</td>
    <td className="text-slate-500">{date}</td>
    <td>
      <span className={`badge ${statusStyle[status]}`}>
        {status}
      </span>
    </td>
    <td>
      <button className="btn btn-xs btn-ghost">View</button>
    </td>
  </tr>
);

export default Dashboard;
