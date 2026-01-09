import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export const StatCard = ({ total, chartData }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-400 text-sm font-semibold uppercase">Semester Report</h3>
      <span className="text-gray-300">ⓘ</span>
    </div>
    <h2 className="text-4xl font-bold text-indigo-900 mb-1">{total}</h2>
    <p className="text-gray-500 text-sm mb-6">Complaints were registered</p>
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <ScatterChart>
          <XAxis dataKey="x" hide />
          <YAxis dataKey="y" hide />
          <Scatter data={chartData} fill="#60A5FA" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </div>
);