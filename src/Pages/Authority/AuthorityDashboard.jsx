import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AuthorityDashboard = () => {
  // Sample data for the cards
  const totalProblems = 120;
  const solvedProblems = 85;

  // Sample data for the chart
  const monthlyProblems = [
    { month: "Jan", reported: 20, solved: 15 ,rejeacted: 5},
    { month: "Feb", reported: 25, solved: 20 ,rejeacted: 5},
    { month: "Mar", reported: 18, solved: 14 ,rejeacted: 4},
    { month: "Apr", reported: 22, solved: 18, rejeacted: 7 },
    { month: "May", reported: 15, solved: 12, rejeacted: 3 },
    { month: "Jun", reported: 20, solved: 16, rejeacted: 4 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          Authority Dashboard
        </h1>
       
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-gray-500">Problems Reported</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {totalProblems}
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <p className="text-gray-500">Problems Solved</p>
          <h2 className="text-3xl font-bold text-green-500 mt-2">
            {solvedProblems}
          </h2>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Monthly Problems Report
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyProblems} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reported" fill="#f87171" name="Reported" />
            <Bar dataKey="solved" fill="#34d399" name="Solved" />
            <Bar dataKey="rejeacted" fill="#f59e0b" name="Rejected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
