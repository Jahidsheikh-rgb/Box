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

const Sidebar = ({ selectedType, setSelectedType }) => {
  return (
    <aside className="w-64 bg-base-100 p-4 border-r min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FaFilter className="text-green-500 text-lg" />
        <h2 className="font-bold text-lg text-gray-700">
          Problem Types
        </h2>
      </div>

      {/* Filter Buttons */}
      <ul className="flex flex-col gap-2">
        {problemTypes.map((type) => (
          <li key={type}>
            <button
              onClick={() => setSelectedType(type)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  selectedType === type
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Dropdown */}
      <div className="mt-6 md:hidden">
        <label className="block mb-1 font-semibold text-gray-600">
          Select Problem Type
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {problemTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
