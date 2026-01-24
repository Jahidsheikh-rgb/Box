import { FaFilter } from "react-icons/fa";

const problemTypes = [
  "All",
  "Infrastructure",
  "Electrical",
  "IT Support",
  "BUS",
  "Administration",
  "Library",
  "Cafeteria",
  "Security",
  "Maintenance",
  "Other",
];

const Sidebar = ({ selected, setSelected }) => {
  return (
    <aside className="hidden md:block w-64 bg-base-100 p-6 border-r min-h-screen sticky top-0">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <FaFilter className="text-green-600 text-lg" />
        <h2 className="font-bold text-xl text-gray-800 tracking-tight">
          Categories
        </h2>
      </div>

      {/* Desktop Filter List */}
      <ul className="flex flex-col gap-1.5">
        {problemTypes.map((type) => (
          <li key={type}>
            <button
              onClick={() => setSelected(type)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 group
                ${
                  selected === type
                    ? "bg-green-600 text-white shadow-lg shadow-green-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              <div className="flex justify-between items-center">
                <span>{type}</span>
                {selected === type && <span className="w-2 h-2 bg-white rounded-full"></span>}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;