import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const TrendsLine = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-full">
    <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase">Trends: Complaints per Hostel</h3>
    <div className="h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Line type="monotone" dataKey="h1" stroke="#1D4ED8" strokeWidth={2} />
          <Line type="monotone" dataKey="h2" stroke="#7E22CE" strokeWidth={2} />
          <Line type="monotone" dataKey="h3" stroke="#F472B6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);