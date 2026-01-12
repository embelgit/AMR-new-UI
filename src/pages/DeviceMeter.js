import { useState } from "react";
import Devices from "./Device"; // Make sure these are exported correctly
import Meters from "./Meter";

const DeviceMeter = () => {
  const [activeTab, setActiveTab] = useState("devices");

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("devices")}
          className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === "devices"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Devices
        </button>
        <button
          onClick={() => setActiveTab("meters")}
          className={`pb-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === "meters"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Meters
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "devices" ? <Devices /> : <Meters />}
      </div>
    </div>
  );
};

export default DeviceMeter;
