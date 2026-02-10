import { useState } from "react";
import Devices from "./Device"; // Make sure these are exported correctly
import Meters from "./Meter";

const DeviceMeter = () => {
  return (
    <div className="px-2 py-4 md:px-4">
      <Devices />
    </div>
  );
};

export default DeviceMeter;
