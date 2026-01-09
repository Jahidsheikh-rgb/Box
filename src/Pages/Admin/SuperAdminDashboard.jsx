import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { SourceBar } from "./SourceBar/SourceBar";
import { StatCard } from "./StatCard/StatCard";
import { StatusDonut } from "./StatusDonut/StatusDonut";
import { TrendsLine } from "./TrendsLine/TrendsLine";

const SuperAdminDashboard = () => {
  return (
    <div className="p-6">
      {/* <div>
        <div>
          <StatCard/>
        </div>
        <div>
          <StatusDonut/>
        </div>
      </div>
      <div>

        <div>
          <SourceBar/>
        </div>
        <div>
          <TrendsLine/>
        </div>
      </div> */}

      <div>
        <AdminDashboard/>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
