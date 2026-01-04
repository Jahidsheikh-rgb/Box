// components/Sidebar.jsx
const departments = [
  "All",
  "Infrastructure",
  "Electrical",
  "IT Support",
  "Hostel",
  "Administration",
];

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div className="w-64 bg-base-100 p-4 border-r min-h-screen">
      <h2 className="font-bold text-lg mb-4">Departments</h2>

      <ul className="menu space-y-1">
        {departments.map((dept) => (
          <li key={dept}>
            <button
              onClick={() => setSelected(dept)}
              className={`btn btn-sm w-full justify-start ${
                selected === dept ? "btn-success" : "btn-ghost"
              }`}
            >
              {dept}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
