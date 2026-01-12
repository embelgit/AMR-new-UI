import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  LinkIcon,
  LinkSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  CpuChipIcon,
  ListBulletIcon,
  ShareIcon,
  ClockIcon,
  DocumentTextIcon,
  ClipboardIcon,
  ArchiveBoxIcon,
  SignalIcon,
  KeyIcon
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
    deviceName: "WiFi-Gateway-003",
    macAddress: "DD:EE:FF:33:55",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 4,
    deviceName: "WiFi-Gateway-004",
    macAddress: "DD:EE:FF:33:66",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 5,
    deviceName: "WiFi-Gateway-005",
    macAddress: "DD:EE:FF:33:77",
    deviceType: "WIFI",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 6,
    deviceName: "WiFi-Gateway-006",
    macAddress: "DD:EE:FF:33:88",
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
  const [selectedDevice, setSelectedDevice] = useState(null); // For Link Modal
  const [meterId, setMeterId] = useState("");

  const [detailsDevice, setDetailsDevice] = useState(null); // For Details Panel
  const [activeTab, setActiveTab] = useState("Details");

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

  const openEdit = (e, device) => {
    e.stopPropagation(); // Prevent row click
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

  const deleteDevice = (e, id) => {
    e.stopPropagation(); // Prevent row click
    setDevices((prev) => prev.filter((d) => d.id !== id));
    if (detailsDevice && detailsDevice.id === id) {
      setDetailsDevice(null);
    }
  };

  /* ---------------- LINK / UNLINK ---------------- */
  const openLinkModal = (e, device) => {
    e.stopPropagation(); // Prevent row click
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

  const unlinkMeter = (e, id) => {
    e.stopPropagation(); // Prevent row click
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, isLinked: false, linkedMeterId: null } : d
      )
    );
  };

  /* ---------------- ROW CLICK ---------------- */
  const handleRowClick = (device) => {
    setDetailsDevice(device);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="relative flex gap-4 h-[calc(100vh-140px)]">
      {/* LEFT CONTENT - TABLE */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${detailsDevice ? "w-2/3" : "w-full"}`}>
        <div className="bg-white rounded-lg shadow p-5 space-y-5 h-full flex flex-col">
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
          <div className="overflow-auto flex-1 rounded-md border text-sm">
            <table className="w-full relative">
              <thead className="bg-gray-50 sticky top-0 z-10">
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
                  <tr
                    key={d.id}
                    onClick={() => handleRowClick(d)}
                    className={`border-t cursor-pointer transition-colors
                      ${detailsDevice?.id === d.id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-50"}
                    `}
                  >
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

                    <td className="px-4 py-3">{d.linkedMeterId || "-"}</td>

                    <td className="px-4 py-3 flex justify-end gap-3">
                      <button onClick={(e) => openEdit(e, d)}>
                        <PencilIcon className="w-4 h-4 text-blue-600" />
                      </button>

                      <button onClick={(e) => deleteDevice(e, d.id)}>
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </button>

                      {d.isLinked ? (
                        <button onClick={(e) => unlinkMeter(e, d.id)}>
                          <LinkSlashIcon className="w-4 h-4 text-red-600" />
                        </button>
                      ) : (
                        <button onClick={(e) => openLinkModal(e, d)}>
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
          <div className="flex justify-end gap-2 pt-2 border-t">
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
      </div>

      {/* RIGHT CONTENT - DETAILS PANEL */}
      {detailsDevice && (
        <div className="w-[450px] bg-white text-sm shadow-2xl border-l border-gray-200 flex flex-col transition-all duration-300 animate-slide-in z-20">
          {/* BLUE HEADER */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-lg font-medium">{detailsDevice.deviceName}</h2>
              <p className="text-blue-200 text-xs mt-1">Device details</p>
            </div>
            <button
              onClick={() => setDetailsDevice(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* TABS */}
          <div className="flex border-b border-gray-200 bg-white shrink-0 overflow-x-auto">
            {["Details", "Attributes", "Latest telemetry", "Alarms", "Events", "Relations", "Audit logs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors
                  ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">

            {/* DETAILS TAB */}
            {activeTab === "Details" && (
              <>
                {/* ACTION BUTTONS ROW */}
                <div className="space-y-3 mb-6">
                  <div className="flex gap-2 flex-wrap">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors uppercase">
                      Open details page
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors uppercase">
                      View credentials
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors uppercase">
                      Check connectivity
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 uppercase">
                      <ClipboardIcon className="w-4 h-4 bg-black text-white rounded p-0.5" />
                      Copy device Id
                    </button>
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 uppercase">
                      <ClipboardIcon className="w-4 h-4 bg-black text-white rounded p-0.5" />
                      Copy access token
                    </button>
                  </div>
                </div>

                {/* FORM FIELDS */}
                <div className="space-y-4">
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Name*</label>
                    <div className="text-sm text-gray-700 font-medium">{detailsDevice.deviceName}</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Device profile*</label>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-700 font-medium">energy_meter</div>
                    </div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Label</label>
                    <input type="text" placeholder="" className="w-full text-sm outline-none text-gray-700 placeholder-gray-300" />
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Assigned firmware</label>
                    <div className="text-sm text-gray-700 italic opacity-50">No firmware assigned</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Assigned software</label>
                    <div className="text-sm text-gray-700 italic opacity-50">No software assigned</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Description</label>
                    <textarea className="w-full h-16 p-0 bg-transparent outline-none resize-none text-sm text-gray-700" placeholder="Add description" defaultValue={detailsDevice.isLinked ? `Linked to ${detailsDevice.linkedMeterId}` : ""}></textarea>
                  </div>
                </div>
              </>
            )}

            {/* ATTRIBUTES TAB */}
            {activeTab === "Attributes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase">Server Attributes</h3>
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><PlusIcon className="w-4 h-4" /></button>
                </div>
                <div className="bg-white border rounded text-xs">
                  <div className="grid grid-cols-2 p-2 border-b font-medium bg-gray-50 text-gray-500">
                    <span>Key</span><span>Value</span>
                  </div>
                  <div className="grid grid-cols-2 p-2 border-b">
                    <span className="text-gray-600">active</span><span className="text-gray-800">true</span>
                  </div>
                  <div className="grid grid-cols-2 p-2 border-b">
                    <span className="text-gray-600">lastActivityTime</span><span className="text-gray-800">1736402830211</span>
                  </div>
                  <div className="grid grid-cols-2 p-2">
                    <span className="text-gray-600">inactivityAlarmTime</span><span className="text-gray-800">1736402830211</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2 mt-6">
                  <h3 className="text-xs font-bold text-gray-500 uppercase">Shared Attributes</h3>
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><PlusIcon className="w-4 h-4" /></button>
                </div>
                <div className="text-center py-8 text-gray-400 italic text-xs">No shared attributes found</div>
              </div>
            )}

            {/* TELEMETRY TAB */}
            {activeTab === "Latest telemetry" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase">Latest Values</h3>
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><ClockIcon className="w-4 h-4" /></button>
                </div>
                <div className="bg-white border rounded text-xs">
                  <div className="grid grid-cols-3 p-2 border-b font-medium bg-gray-50 text-gray-500">
                    <span>Key</span><span>Value</span><span>Last Update</span>
                  </div>
                  {[
                    { k: "temperature", v: "24.5", t: "1 min ago" },
                    { k: "humidity", v: "45", t: "1 min ago" },
                    { k: "voltage", v: "220.1", t: "5 sec ago" },
                    { k: "current", v: "1.2", t: "5 sec ago" },
                    { k: "power", v: "264.12", t: "5 sec ago" },
                    { k: "energy", v: "45021.5", t: "10 min ago" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-2 border-b last:border-0 hover:bg-gray-50">
                      <span className="text-gray-600 font-medium">{row.k}</span>
                      <span className="text-gray-900">{row.v}</span>
                      <span className="text-gray-400">{row.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ALARMS TAB */}
            {activeTab === "Alarms" && (
              <div className="space-y-3">
                <div className="flex gap-2 mb-2">
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200">CRITICAL</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold border border-orange-200">MAJOR</span>
                </div>
                {[
                  { severity: "CRITICAL", type: "High Temperature", time: "2024-01-08 14:30:00", status: "Active" },
                  { severity: "MAJOR", type: "Connectivity Loss", time: "2024-01-07 09:15:00", status: "Cleared" },
                ].map((alarm, i) => (
                  <div key={i} className="bg-white border-l-4 border-l-red-500 shadow-sm p-3 rounded flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-800">{alarm.type}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600`}>{alarm.status}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{alarm.time}</div>
                    </div>
                    <div className="text-[10px] font-bold text-red-600">{alarm.severity}</div>
                  </div>
                ))}
              </div>
            )}

            {/* EVENTS TAB */}
            {activeTab === "Events" && (
              <div className="space-y-2">
                <div className="bg-white border rounded text-xs">
                  <div className="grid grid-cols-3 p-2 border-b font-medium bg-gray-50 text-gray-500">
                    <span>Event</span><span>Status</span><span>Time</span>
                  </div>
                  {[
                    { e: "Error", s: "Success", t: "2024-01-09 10:00:00" },
                    { e: "Stats", s: "Success", t: "2024-01-09 09:00:00" },
                    { e: "Life Cycle", s: "Success", t: "2024-01-08 12:00:00" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-2 border-b last:border-0">
                      <span className="text-gray-600">{row.e}</span>
                      <span className="text-green-600">{row.s}</span>
                      <span className="text-gray-400">{row.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RELATIONS TAB */}
            {activeTab === "Relations" && (
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded text-center">
                  <div className="text-blue-600 font-bold text-lg mb-1">{detailsDevice.deviceName}</div>
                  <div className="text-xs text-gray-400">Current Device</div>
                </div>
                <div className="flex justify-center"><div className="w-px h-6 bg-gray-300"></div></div>
                <div className="p-3 bg-gray-50 border border-dashed rounded text-center">
                  <div className="text-gray-600 font-medium text-sm">Asset: Building A</div>
                  <div className="text-[10px] text-gray-400">Contains</div>
                </div>
                <div className="flex justify-center"><div className="w-px h-6 bg-gray-300"></div></div>
                <div className="p-3 bg-gray-50 border border-dashed rounded text-center">
                  <div className="text-gray-600 font-medium text-sm">Customer: Refined Oil</div>
                  <div className="text-[10px] text-gray-400">Owns</div>
                </div>
              </div>
            )}

            {/* AUDIT LOGS TAB */}
            {activeTab === "Audit logs" && (
              <div className="space-y-2">
                {[
                  { user: "System Administrator", action: "Attributes Updated", time: "2 min ago" },
                  { user: "System Administrator", action: "Credentials Viewed", time: "5 min ago" },
                  { user: "Tenant Admin", action: "Device Created", time: "2 days ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs p-3 bg-white border-b last:border-0 hover:bg-gray-50">
                    <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 font-bold shrink-0">
                      {log.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{log.action}</div>
                      <div className="text-gray-500">{log.user} • {log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

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
