import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

export const SourceBar = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase">Complaint Source</h3>
    <div className="h-48">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize={10} />
          <YAxis hide />
          <ReferenceLine y={0} stroke="#eee" />
          <Bar dataKey="value" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);