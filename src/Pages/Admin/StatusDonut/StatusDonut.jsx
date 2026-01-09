import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const StatusDonut = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase">Solved & Unsolved</h3>
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);