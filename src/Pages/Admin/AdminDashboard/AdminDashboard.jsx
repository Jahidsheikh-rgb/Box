import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, Scatter, PieChart, Pie, Cell, 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, ResponsiveContainer, ReferenceLine, 
  Tooltip
} from 'recharts';

// --- SHARED UI COMPONENT ---
const DashboardCard = ({ title, subtitle, children, className }) => (
  <div className={`bg-white p-7 rounded-2xl shadow-sm border border-gray-50 flex flex-col ${className}`}>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.15em]">{title}</h3>
        {subtitle && <p className="text-[11px] text-gray-400 font-medium mt-0.5">{subtitle}</p>}
      </div>
      <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 text-[10px] cursor-help">i</div>
    </div>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error:", err));
  }, []);

  if (!data) return <div className="p-20 font-bold text-indigo-900 animate-pulse">Initializing Dashboard...</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6 md:p-12 font-sans selection:bg-indigo-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <header className="mb-10">
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">Latest Complaints</p>
          <h1 className="text-3xl font-black text-[#1e1b4b]">Dashboard</h1>
        </header>

        {/* The Photo Grid Layout (12 Columns) */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* 1. Semester Report (8 Columns) */}
          <DashboardCard title="Semester Report" className="col-span-12 lg:col-span-8">
  <div className="mb-6">
    {/* High-weight typography for the main metric */}
    <h2 className="text-5xl font-black text-[#1e1b4b] tracking-tight">
      {data.totalComplaints.toLocaleString()}
    </h2>
    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mt-1">
      Complaints were registered
    </p>
  </div>

  <div className="h-48 -ml-6"> {/* Negative margin to align the axis line with the text above */}
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
        {/* The Grid: Only horizontal lines to match the clean look */}
        <CartesianGrid 
          vertical={false} 
          stroke="#f1f5f9" 
          strokeDasharray="3 3" 
        />
        
        <XAxis 
          type="number" 
          dataKey="x" 
          hide 
        />
        
        {/* The Y-Axis: Adjusted for visibility and professional weight */}
        <YAxis 
          type="number" 
          dataKey="y" 
          domain={[-100, 100]} 
          axisLine={false} 
          tickLine={false} 
          fontSize={10}
          tick={{ fill: '#94a3b8', fontWeight: 500 }}
          tickCount={5}
        />

        <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={1} />

        <Scatter 
          data={data.semesterReportScatter} 
          fill="#818cf8" 
          fillOpacity={0.4} 
          line={false}
          shape={(props) => {
            const { cx, cy } = props;
            const size = (cx % 10) + 4; 
            return <circle cx={cx} cy={cy} r={size} fill="#818cf8" />;
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  </div>
</DashboardCard>

          {/* 2. Solved/Unsolved Donut (4 Columns) */}
<DashboardCard title="Semester Report" subtitle="Solved and Unsolved" className="col-span-12 lg:col-span-4">
  
  {/* Custom High-Weight Legend at the Top Left */}
  <div className="flex flex-wrap gap-4 mb-4 mt-2">
    {data.statusData.map((entry, i) => (
      <div key={i} className="flex items-center gap-2">
        {/* Color Dot */}
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: entry.color }}
        />
        {/* Label and Value */}
        <span className="text-[10px] font-bold text-[#1e1b4b] uppercase tracking-wider">
          {entry.name} <span className="text-gray-400 ml-1">{entry.value}%</span>
        </span>
      </div>
    ))}
  </div>

  <div className="h-60">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={data.statusData} 
          innerRadius={65} 
          outerRadius={85} 
          paddingAngle={10} 
          dataKey="value" 
          stroke="none"
          // Starts the chart from the top for a more balanced look
          startAngle={90}
          endAngle={-270}
        >
          {data.statusData.map((entry, i) => (
            <Cell 
              key={i} 
              fill={entry.color} 
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </Pie>
        
        <Tooltip
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</DashboardCard>

          {/* 3. Resolution Rates Pie (4 Columns) */}
<DashboardCard title="Resolution Rates" subtitle="Showing data of week" className="col-span-12 lg:col-span-4">
  <div className="flex flex-col h-full">
    
    {/* High-Weight Horizontal Legend */}
    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 mt-2">
      {data.resolutionRates.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[10px] font-extrabold text-[#1e1b4b] uppercase tracking-wider">
            {entry.name}
          </span>
        </div>
      ))}
    </div>

    <div className="h-60 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data.resolutionRates} 
            cx="50%" 
            cy="50%" 
            outerRadius={90} 
            dataKey="value" 
            stroke="#fff"      /* Adds a clean white border between segments */
            strokeWidth={2}
            startAngle={90}
            endAngle={450}
          >
            {data.resolutionRates.map((entry, i) => (
              <Cell 
                key={i} 
                fill={entry.color} 
                className="hover:saturate-150 transition-all cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#1e1b4b'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</DashboardCard>

          {/* 4. Complaint Source Bar (8 Columns) */}
          <DashboardCard title="Complaint Source" subtitle="Source of Complaint" className="col-span-12 lg:col-span-8">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.sourceData} margin={{ left: -30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 600}} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} domain={[-100, 100]} />
                  <ReferenceLine y={0} stroke="#e2e8f0" />
                  <Bar dataKey="value" fill="#1e1b4b" radius={[4, 4, 4, 4]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* 5. Trends Line (12 Columns Full Width) */}
<DashboardCard title="Trends" subtitle="Rate of Complaints Per Hostel" className="col-span-12">
  
  {/* Custom High-Weight Legend at Top Right for easy reading */}
  <div className="flex justify-end gap-6 mb-4 px-4">
    {[
      { label: 'Hostel A', color: '#1e1b4b' },
      { label: 'Hostel B', color: '#db2777' },
      { label: 'Hostel C', color: '#7c3aed' }
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="w-3 h-1 rounded-full" style={{ backgroundColor: item.color }} />
        <span className="text-[10px] font-extrabold text-[#1e1b4b] uppercase tracking-wider">{item.label}</span>
      </div>
    ))}
  </div>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data.trendData} 
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {/* Soft horizontal grid lines only */}
        <CartesianGrid 
          strokeDasharray="0" 
          vertical={false} 
          stroke="#f1f5f9" 
        />
        
        <XAxis 
          dataKey="month" 
          fontSize={11} 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#94a3b8', fontWeight: 700}}
          dy={15} 
        />
        
        <YAxis 
          fontSize={11} 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#94a3b8', fontWeight: 500}} 
          domain={[-100, 100]}
          tickCount={5}
        />

        {/* Hover Tooltip - adds the premium feel */}
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            fontSize: '12px',
            fontWeight: 'bold'
          }} 
        />

        {/* The Zero Baseline */}
        <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={2} />

        {/* High-Weight Lines with White-Border Dots (Halo effect) */}
        <Line 
          type="monotone" 
          dataKey="h1" 
          stroke="#1e1b4b" 
          strokeWidth={4} 
          dot={{ r: 6, fill: '#1e1b4b', stroke: '#fff', strokeWidth: 3 }}
          activeDot={{ r: 8, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          dataKey="h2" 
          stroke="#db2777" 
          strokeWidth={4} 
          dot={{ r: 6, fill: '#db2777', stroke: '#fff', strokeWidth: 3 }}
          activeDot={{ r: 8, strokeWidth: 0 }}
        />
        <Line 
          type="monotone" 
          dataKey="h3" 
          stroke="#7c3aed" 
          strokeWidth={4} 
          dot={{ r: 6, fill: '#7c3aed', stroke: '#fff', strokeWidth: 3 }}
          activeDot={{ r: 8, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</DashboardCard>

        </div>
      </div>
    </div>
  );
}