// import { useState } from "react";

// /* ------------------ Constants ------------------ */
// const deviceTypes = ["4G", "WIFI", "ETHERNET"];

// /* ------------------ Dummy Data ------------------ */
// const dummyDevices = [
//   {
//     id: "1",
//     macAddress: "AA:BB:CC:11:22",
//     deviceName: "4G-Gateway-001",
//     deviceType: "4G",
//     createdBySuperAdmin: "superadmin",
//     assignedToAdmin: "admin1",
//     isLinked: true,
//     linkedMeterId: "MTR-001",
//     createdAt: "2024-12-01 10:30",
//     updatedAt: "2024-12-10 15:45",
//   },
//   {
//     id: "2",
//     macAddress: "DD:EE:FF:33:44",
//     deviceName: "WiFi-Gateway-002",
//     deviceType: "WIFI",
//     createdBySuperAdmin: "superadmin",
//     assignedToAdmin: "admin2",
//     isLinked: false,
//     linkedMeterId: null,
//     createdAt: "2024-12-05 12:20",
//     updatedAt: "2024-12-08 18:10",
//   },
// ];

// const Devices = () => {
//   const [devices, setDevices] = useState(dummyDevices);
//   const [showModal, setShowModal] = useState(false);

//   const [form, setForm] = useState({
//     macAddress: "",
//     deviceName: "",
//     deviceType: "4G",
//     assignedToAdmin: "",
//   });

//   /* ------------------ Create Device ------------------ */
//   const saveDevice = () => {
//     if (!form.macAddress || !form.deviceName) {
//       alert("MAC Address and Device Name are required");
//       return;
//     }

//     setDevices([
//       ...devices,
//       {
//         id: Date.now().toString(),
//         ...form,
//         createdBySuperAdmin: "superadmin",
//         isLinked: false,
//         linkedMeterId: null,
//         createdAt: new Date().toLocaleString(),
//         updatedAt: new Date().toLocaleString(),
//       },
//     ]);

//     setShowModal(false);
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-xl font-semibold text-gray-800">Devices</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
//         >
//           + Create Device
//         </button>
//       </div>

//       {/* Device Table */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">MAC Address</th>
//               <th className="px-4 py-3 text-left">Device Name</th>
//               <th className="px-4 py-3 text-left">Type</th>
//               <th className="px-4 py-3 text-left">Assigned Admin</th>
//               <th className="px-4 py-3 text-left">Linked</th>
//               <th className="px-4 py-3 text-left">Meter ID</th>
//               <th className="px-4 py-3 text-left">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map((d) => (
//               <tr key={d.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-3 font-mono">{d.macAddress}</td>
//                 <td className="px-4 py-3">{d.deviceName}</td>
//                 <td className="px-4 py-3">{d.deviceType}</td>
//                 <td className="px-4 py-3">{d.assignedToAdmin || "-"}</td>
//                 <td className="px-4 py-3">
//                   {d.isLinked ? (
//                     <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
//                       Linked
//                     </span>
//                   ) : (
//                     <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
//                       Not Linked
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3">
//                   {d.linkedMeterId || "-"}
//                 </td>
//                 <td className="px-4 py-3 text-gray-500">{d.createdAt}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Create Device Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
//             <h2 className="text-lg font-semibold">Create Device</h2>

//             <input
//               placeholder="MAC Address (AA:BB:CC:11:22)"
//               className="w-full border px-3 py-2 rounded"
//               value={form.macAddress}
//               onChange={(e) =>
//                 setForm({ ...form, macAddress: e.target.value })
//               }
//             />

//             <input
//               placeholder="Device Name"
//               className="w-full border px-3 py-2 rounded"
//               value={form.deviceName}
//               onChange={(e) =>
//                 setForm({ ...form, deviceName: e.target.value })
//               }
//             />

//             <select
//               className="w-full border px-3 py-2 rounded"
//               value={form.deviceType}
//               onChange={(e) =>
//                 setForm({ ...form, deviceType: e.target.value })
//               }
//             >
//               {deviceTypes.map((t) => (
//                 <option key={t}>{t}</option>
//               ))}
//             </select>

//             <input
//               placeholder="Assign to Admin"
//               className="w-full border px-3 py-2 rounded"
//               value={form.assignedToAdmin}
//               onChange={(e) =>
//                 setForm({ ...form, assignedToAdmin: e.target.value })
//               }
//             />

//             <div className="flex justify-end gap-2 pt-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveDevice}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Save Device
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Devices;

// import { useState } from "react";

// const deviceTypes = ["4G", "WIFI", "ETHERNET"];

// const dummyDevices = [
//   {
//     id: "1",
//     macAddress: "AA:BB:CC:11:22",
//     deviceName: "4G-Gateway-001",
//     deviceType: "4G",
//     createdBySuperAdmin: "superadmin",
//     assignedToAdmin: "admin1",
//     isLinked: true,
//     linkedMeterId: "MTR-001",
//     createdAt: "2024-12-01 10:30",
//     updatedAt: "2024-12-10 15:45",
//   },
//   {
//     id: "2",
//     macAddress: "DD:EE:FF:33:44",
//     deviceName: "WiFi-Gateway-002",
//     deviceType: "WIFI",
//     createdBySuperAdmin: "superadmin",
//     assignedToAdmin: "admin2",
//     isLinked: false,
//     linkedMeterId: null,
//     createdAt: "2024-12-05 12:20",
//     updatedAt: "2024-12-08 18:10",
//   },
// ];

// const Devices = () => {
//   const [devices, setDevices] = useState(dummyDevices);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const [meterId, setMeterId] = useState("");

//   /* ---------- Link Meter ---------- */
//   const openLinkModal = (device) => {
//     setSelectedDevice(device);
//     setMeterId("");
//     setShowLinkModal(true);
//   };

//   const linkMeter = () => {
//     if (!meterId) {
//       alert("Meter ID is required");
//       return;
//     }

//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === selectedDevice.id
//           ? {
//               ...d,
//               isLinked: true,
//               linkedMeterId: meterId,
//               updatedAt: new Date().toLocaleString(),
//             }
//           : d
//       )
//     );

//     setShowLinkModal(false);
//   };

//   /* ---------- Unlink Meter ---------- */
//   const unlinkMeter = (deviceId) => {
//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === deviceId
//           ? {
//               ...d,
//               isLinked: false,
//               linkedMeterId: null,
//               updatedAt: new Date().toLocaleString(),
//             }
//           : d
//       )
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold mb-4">Devices</h1>

//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">MAC</th>
//               <th className="px-4 py-3 text-left">Device</th>
//               <th className="px-4 py-3 text-left">Type</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-left">Meter</th>
//               <th className="px-4 py-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map((d) => (
//               <tr key={d.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-3 font-mono">{d.macAddress}</td>
//                 <td className="px-4 py-3">{d.deviceName}</td>
//                 <td className="px-4 py-3">{d.deviceType}</td>
//                 <td className="px-4 py-3">
//                   {d.isLinked ? (
//                     <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
//                       Linked
//                     </span>
//                   ) : (
//                     <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
//                       Not Linked
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3">
//                   {d.linkedMeterId || "-"}
//                 </td>
//                 <td className="px-4 py-3">
//                   {d.isLinked ? (
//                     <button
//                       onClick={() => unlinkMeter(d.id)}
//                       className="text-xs text-red-600 hover:underline"
//                     >
//                       Unlink
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => openLinkModal(d)}
//                       className="text-xs text-blue-600 hover:underline"
//                     >
//                       Link Meter
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Link Meter Modal */}
//       {showLinkModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
//             <h2 className="text-lg font-semibold">Link Meter</h2>

//             <input
//               placeholder="Enter Meter ID"
//               className="w-full border px-3 py-2 rounded"
//               value={meterId}
//               onChange={(e) => setMeterId(e.target.value)}
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowLinkModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={linkMeter}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Devices;

// import { useState, useMemo } from "react";
// import {
//   PlusIcon,
//   LinkIcon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";

// const PAGE_SIZE = 5;

// const dummyDevices = [
//   {
//     id: 1,
//     macAddress: "AA:BB:CC:11:22",
//     deviceName: "4G-Gateway-001",
//     deviceType: "4G",
//     isLinked: true,
//     linkedMeterId: "MTR-001",
//   },
//   {
//     id: 2,
//     macAddress: "DD:EE:FF:33:44",
//     deviceName: "WiFi-Gateway-002",
//     deviceType: "WIFI",
//     isLinked: false,
//     linkedMeterId: null,
//   },
//   {
//     id: 3,
//     macAddress: "11:22:33:44:55",
//     deviceName: "Ethernet-003",
//     deviceType: "ETHERNET",
//     isLinked: false,
//     linkedMeterId: null,
//   },
// ];

// const Devices = () => {
//   const [devices, setDevices] = useState(dummyDevices);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const [meterId, setMeterId] = useState("");

//   /* ---------------- FILTER + PAGINATION ---------------- */
//   const filteredDevices = useMemo(() => {
//     return devices.filter(
//       (d) =>
//         d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
//         d.macAddress.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [devices, search]);

//   const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

//   const paginatedDevices = filteredDevices.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   /* ---------------- ACTIONS ---------------- */
//   const openLinkModal = (device) => {
//     setSelectedDevice(device);
//     setMeterId("");
//     setShowModal(true);
//   };

//   const linkMeter = () => {
//     if (!meterId) return;

//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === selectedDevice.id
//           ? { ...d, isLinked: true, linkedMeterId: meterId }
//           : d
//       )
//     );
//     setShowModal(false);
//   };

//   const unlinkMeter = (id) => {
//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === id
//           ? { ...d, isLinked: false, linkedMeterId: null }
//           : d
//       )
//     );
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-lg shadow p-5 space-y-5">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold text-gray-800">Devices</h1>

//           <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
//             <PlusIcon className="w-5 h-5" />
//             Add Device
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="relative w-72">
//           <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//           <input
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             placeholder="Search devices..."
//             className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="overflow-hidden rounded-md border">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="px-4 py-3 text-left">Device</th>
//                 <th className="px-4 py-3 text-left">MAC Address</th>
//                 <th className="px-4 py-3 text-left">Type</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Meter</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedDevices.map((d) => (
//                 <tr key={d.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium">{d.deviceName}</td>
//                   <td className="px-4 py-3 font-mono">{d.macAddress}</td>
//                   <td className="px-4 py-3">{d.deviceType}</td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         d.isLinked
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {d.isLinked ? "Linked" : "Not Linked"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     {d.linkedMeterId || "-"}
//                   </td>

//                   <td className="px-4 py-3 flex justify-end gap-3">
//                     {d.isLinked ? (
//                       <button onClick={() => unlinkMeter(d.id)}>
//                         <XMarkIcon className="w-5 h-5 text-red-600" />
//                       </button>
//                     ) : (
//                       <button onClick={() => openLinkModal(d)}>
//                         <LinkIcon className="w-5 h-5 text-blue-600" />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {paginatedDevices.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
//                     No devices found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-end gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Prev
//           </button>

//           <span className="px-3 py-1.5 text-sm">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* LINK METER MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">Link Meter</h2>

//             <input
//               className="w-full border px-3 py-2 rounded mb-4"
//               placeholder="Meter ID"
//               value={meterId}
//               onChange={(e) => setMeterId(e.target.value)}
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={linkMeter}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Devices;


// import { useState, useMemo } from "react";
// import {
//   PlusIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import {
//   PlugIcon,
//   PlugSlashIcon,
// } from "@heroicons/react/24/solid";

// const PAGE_SIZE = 5;

// const dummyDevices = [
//   {
//     id: 1,
//     macAddress: "AA:BB:CC:11:22",
//     deviceName: "4G-Gateway-001",
//     deviceType: "4G",
//     isLinked: true,
//     linkedMeterId: "MTR-001",
//   },
//   {
//     id: 2,
//     macAddress: "DD:EE:FF:33:44",
//     deviceName: "WiFi-Gateway-002",
//     deviceType: "WIFI",
//     isLinked: false,
//     linkedMeterId: null,
//   },
//   {
//     id: 3,
//     macAddress: "11:22:33:44:55",
//     deviceName: "Ethernet-003",
//     deviceType: "ETHERNET",
//     isLinked: false,
//     linkedMeterId: null,
//   },
// ];

// const Devices = () => {
//   const [devices, setDevices] = useState(dummyDevices);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   /* ---------- CREATE DEVICE ---------- */
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newDevice, setNewDevice] = useState({
//     deviceName: "",
//     macAddress: "",
//     deviceType: "4G",
//   });

//   /* ---------- LINK METER ---------- */
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const [meterId, setMeterId] = useState("");

//   /* ---------- FILTER + PAGINATION ---------- */
//   const filteredDevices = useMemo(() => {
//     return devices.filter(
//       (d) =>
//         d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
//         d.macAddress.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [devices, search]);

//   const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

//   const paginatedDevices = filteredDevices.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   /* ---------- ACTIONS ---------- */
//   const addDevice = () => {
//     if (!newDevice.deviceName || !newDevice.macAddress) return;

//     setDevices([
//       ...devices,
//       {
//         id: Date.now(),
//         ...newDevice,
//         isLinked: false,
//         linkedMeterId: null,
//       },
//     ]);

//     setNewDevice({
//       deviceName: "",
//       macAddress: "",
//       deviceType: "4G",
//     });
//     setShowCreateModal(false);
//   };

//   const openLinkModal = (device) => {
//     setSelectedDevice(device);
//     setMeterId("");
//     setShowLinkModal(true);
//   };

//   const linkMeter = () => {
//     if (!meterId) return;

//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === selectedDevice.id
//           ? { ...d, isLinked: true, linkedMeterId: meterId }
//           : d
//       )
//     );
//     setShowLinkModal(false);
//   };

//   const unlinkMeter = (id) => {
//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === id
//           ? { ...d, isLinked: false, linkedMeterId: null }
//           : d
//       )
//     );
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-lg shadow p-5 space-y-5">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold text-gray-800">Devices</h1>

//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
//           >
//             <PlusIcon className="w-5 h-5" />
//             Add Device
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="relative w-72">
//           <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//           <input
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             placeholder="Search devices..."
//             className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="overflow-hidden rounded-md border">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="px-4 py-3 text-left">Device</th>
//                 <th className="px-4 py-3 text-left">MAC Address</th>
//                 <th className="px-4 py-3 text-left">Type</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Meter</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedDevices.map((d) => (
//                 <tr key={d.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium">{d.deviceName}</td>
//                   <td className="px-4 py-3 font-mono">{d.macAddress}</td>
//                   <td className="px-4 py-3">{d.deviceType}</td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         d.isLinked
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {d.isLinked ? "Linked" : "Not Linked"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">{d.linkedMeterId || "-"}</td>

//                   <td className="px-4 py-3 flex justify-end gap-3">
//                     {d.isLinked ? (
//                       <button
//                         onClick={() => unlinkMeter(d.id)}
//                         title="Unlink Meter"
//                       >
//                         <PlugSlashIcon className="w-5 h-5 text-red-600" />
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => openLinkModal(d)}
//                         title="Link Meter"
//                       >
//                         <PlugIcon className="w-5 h-5 text-blue-600" />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-end gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Prev
//           </button>

//           <span className="px-3 py-1.5 text-sm">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* CREATE DEVICE MODAL */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">Add Device</h2>

//             <input
//               className="w-full border px-3 py-2 rounded mb-3"
//               placeholder="Device Name"
//               value={newDevice.deviceName}
//               onChange={(e) =>
//                 setNewDevice({ ...newDevice, deviceName: e.target.value })
//               }
//             />

//             <input
//               className="w-full border px-3 py-2 rounded mb-3"
//               placeholder="MAC Address"
//               value={newDevice.macAddress}
//               onChange={(e) =>
//                 setNewDevice({ ...newDevice, macAddress: e.target.value })
//               }
//             />

//             <select
//               className="w-full border px-3 py-2 rounded mb-4"
//               value={newDevice.deviceType}
//               onChange={(e) =>
//                 setNewDevice({ ...newDevice, deviceType: e.target.value })
//               }
//             >
//               <option value="4G">4G</option>
//               <option value="WIFI">WIFI</option>
//               <option value="ETHERNET">ETHERNET</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={addDevice}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* LINK METER MODAL */}
//       {showLinkModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">Link Meter</h2>

//             <input
//               className="w-full border px-3 py-2 rounded mb-4"
//               placeholder="Meter ID"
//               value={meterId}
//               onChange={(e) => setMeterId(e.target.value)}
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowLinkModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={linkMeter}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Devices;

import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  LinkIcon,
  LinkSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const PAGE_SIZE = 5;
const DEVICE_TYPES = ["4G", "WIFI", "ETHERNET"];

const initialDevices = [
  {
    id: 1,
    deviceName: "4G-Gateway-001",
    macAddress: "AA:BB:CC:11:22",
    deviceType: "4G",
    isLinked: true,
    linkedMeterId: "MTR-001",
  },
  {
    id: 2,
    deviceName: "WiFi-Gateway-002",
    macAddress: "DD:EE:FF:33:44",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 3,
    deviceName: "WiFi-Gateway-002",
    macAddress: "DD:EE:FF:33:44",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 4,
    deviceName: "WiFi-Gateway-002",
    macAddress: "DD:EE:FF:33:44",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 5,
    deviceName: "WiFi-Gateway-002",
    macAddress: "DD:EE:FF:33:44",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 6,
    deviceName: "WiFi-Gateway-002",
    macAddress: "DD:EE:FF:33:44",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
];

const Devices = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const [linkModal, setLinkModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [meterId, setMeterId] = useState("");

  const [form, setForm] = useState({
    deviceName: "",
    macAddress: "",
    deviceType: "4G",
  });

  /* ---------------- FILTER + PAGINATION ---------------- */
  const filteredDevices = useMemo(() => {
    return devices.filter(
      (d) =>
        d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
        d.macAddress.toLowerCase().includes(search.toLowerCase())
    );
  }, [devices, search]);

  const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

  const paginatedDevices = filteredDevices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- CRUD ---------------- */
  const openCreate = () => {
    setEditingDevice(null);
    setForm({ deviceName: "", macAddress: "", deviceType: "" });
    setShowModal(true);
  };

  const openEdit = (device) => {
    setEditingDevice(device);
    setForm(device);
    setShowModal(true);
  };

  const saveDevice = () => {
    if (!form.deviceName || !form.macAddress) return;

    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) => (d.id === editingDevice.id ? { ...d, ...form } : d))
      );
    } else {
      setDevices((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          isLinked: false,
          linkedMeterId: null,
        },
      ]);
    }
    setShowModal(false);
  };

  const deleteDevice = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  /* ---------------- LINK / UNLINK ---------------- */
  const openLinkModal = (device) => {
    setSelectedDevice(device);
    setMeterId("");
    setLinkModal(true);
  };

  const linkMeter = () => {
    if (!meterId) return;

    setDevices((prev) =>
      prev.map((d) =>
        d.id === selectedDevice.id
          ? { ...d, isLinked: true, linkedMeterId: meterId }
          : d
      )
    );
    setLinkModal(false);
  };

  const unlinkMeter = (id) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, isLinked: false, linkedMeterId: null } : d
      )
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-5 space-y-5">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Devices</h1>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <PlusIcon className="w-5 h-5" />
            Add Device
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative w-72">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search devices..."
            className="pl-10 pr-3 py-2 w-full border rounded-md text-sm"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Device</th>
                <th className="px-4 py-3 text-left">MAC</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Meter</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedDevices.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{d.deviceName}</td>
                  <td className="px-4 py-3 font-mono">{d.macAddress}</td>
                  <td className="px-4 py-3">{d.deviceType}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${d.isLinked
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {d.isLinked ? "Linked" : "Not Linked"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {d.linkedMeterId || "-"}
                  </td>

                  <td className="px-4 py-3 flex justify-end gap-3">
                    <button onClick={() => openEdit(d)}>
                      <PencilIcon className="w-4 h-4 text-blue-600" />
                    </button>

                    <button onClick={() => deleteDevice(d.id)}>
                      <TrashIcon className="w-4 h-4 text-red-600" />
                    </button>

                    {d.isLinked ? (
                      <button onClick={() => unlinkMeter(d.id)}>
                        <LinkSlashIcon className="w-4 h-4 text-red-600" />
                      </button>
                    ) : (
                      <button onClick={() => openLinkModal(d)}>
                        <LinkIcon className="w-4 h-4 text-green-600" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-3 py-1.5 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingDevice ? "Edit Device" : "Add Device"}
            </h2>

            <input
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Device Name"
              value={form.deviceName}
              onChange={(e) => setForm({ ...form, deviceName: e.target.value })}
            />

            <input
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="MAC Address"
              value={form.macAddress}
              onChange={(e) => setForm({ ...form, macAddress: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={form.deviceType}
              onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
            >
              <option value="" disabled>Select Device Type</option>
              {DEVICE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveDevice}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LINK METER MODAL */}
      {linkModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Link Meter</h2>

            <input
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Meter ID"
              value={meterId}
              onChange={(e) => setMeterId(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setLinkModal(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={linkMeter}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
              >
                Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
