import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  ClipboardIcon,
  ArrowDownTrayIcon,
  ViewColumnsIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { HiChevronDown } from "react-icons/hi2";
import DataExport from "../components/DataExport";
import DeviceForm from "../components/DeviceForm";
import UploadModal from "../components/UploadModal";

const PAGE_SIZE = 10;
const DEVICE_TYPES = ["4G", "WIFI", "ETHERNET", "NBIOT"];

const initialDevices = [
  {
    id: 1,
    srNo: 1,
    admin: "demoadmin",
    user: "ashwini",
    deviceId: "C6:92:06:F0:F8:58",
    deviceName: "EMBEL-HTTPS",
    deviceType: "NBIOT",
    macId: "EE:8A:C2:A1:F7:CD",
    deviceAmr: "1",
    sampleCount: "",
    literPulse: "0.01",
    wakeupTime: "01:14:56",
    timezone: "Asia/Kolkata",
    dateTime: "",
    applicationOfAmr: "Domestic",
    type: "volumetric",
    diameter: "20",
    state: "Maharashtra",
    city: "pune",
    area: "baner",
    zone: "baner",
    startReading: "",
    status: "Active",
    isLinked: true,
    linkedMeterId: "MTR-001",
  },
  {
    id: 2,
    srNo: 2,
    admin: "kunal",
    user: "siddhesh",
    deviceId: "E4:DF:99:FB:F4:3F",
    deviceName: "EMBEL-OPENCPU_24_04_24",
    deviceType: "NBIOT",
    macId: "E4:DF:99:FB:F4:3F",
    deviceAmr: "1",
    sampleCount: "0",
    literPulse: "0.01",
    wakeupTime: "",
    timezone: "Asia/Kolkata",
    dateTime: "2024-04-24T12:41:51.000+00:00",
    applicationOfAmr: "Domestic",
    type: "volumetric",
    diameter: "15",
    state: "Maharashtra",
    city: "pune",
    area: "baner",
    zone: "baner",
    startReading: "150",
    status: "Active",
    isLinked: false,
    linkedMeterId: null,
  },
  {
    id: 3,
    srNo: 3,
    admin: "demoadmin",
    user: "demouser",
    deviceId: "1234",
    deviceName: "Embel-OPEN_CPU",
    deviceType: "NBIOT",
    macId: "E5:E5:61:39:9F:F8",
    deviceAmr: "1",
    sampleCount: "0",
    literPulse: "0.01",
    wakeupTime: "",
    timezone: "Asia/Kolkata",
    dateTime: "2024-04-12T12:09:00.000+00:00",
    applicationOfAmr: "Domestic",
    type: "volumetric",
    diameter: "20",
    state: "Maharashtra",
    city: "pune",
    area: "baner",
    zone: "baner",
    startReading: "0",
    status: "Active",
    isLinked: false,
    linkedMeterId: null,
  },
  // Adding more mock data to test pagination
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 4,
    srNo: i + 4,
    admin: "demoadmin",
    user: `user${i + 4}`,
    deviceId: `ID-00${i + 4}`,
    deviceName: `Device-${i + 4}`,
    deviceType: "NBIOT",
    macId: `MAC-00${i + 4}`,
    deviceAmr: "1",
    sampleCount: "0",
    literPulse: "0.01",
    wakeupTime: "00:00:00",
    timezone: "Asia/Kolkata",
    dateTime: "2024-05-01T10:00:00.000+00:00",
    applicationOfAmr: "Domestic",
    type: "volumetric",
    diameter: "20",
    state: "Maharashtra",
    city: "pune",
    area: "baner",
    zone: "baner",
    startReading: "0",
    status: "Active",
    isLinked: false,
    linkedMeterId: null,
  })),
];

const Devices = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [detailsDevice, setDetailsDevice] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");
  const [form, setForm] = useState({
    deviceName: "",
    macAddress: "",
    deviceType: "4G",
  });

  /* ---------------- FILTER + PAGINATION ---------------- */
  const [statusFilter, setStatusFilter] = useState("All");

  /* ---------------- FILTER + PAGINATION ---------------- */
  /* ---------------- FILTER + PAGINATION ---------------- */
  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const currentRole = localStorage.getItem('role');
      const assignedMeters = JSON.parse(localStorage.getItem('assignedMeters') || '[]');

      // If ADMIN, check if they have access to this device based on some property
      // For now, let's assume devices are associated with meter types in a real app.
      // Since mock data is limited, we'll allow all for now or mock the property.
      // But based on the request, we should restrict.
      if (currentRole === 'ADMIN') {
        // Mocking a check: if deviceName contains assigned meter type (case insensitive)
        const hasAccess = assignedMeters.some(type =>
          (d.deviceName || '').toUpperCase().includes(type) ||
          (d.applicationOfAmr || '').toUpperCase().includes(type)
        );
        if (!hasAccess && assignedMeters.length > 0) return false;
      }

      const matchesSearch =
        d.deviceName?.toLowerCase().includes(search.toLowerCase()) ||
        d.macId?.toLowerCase().includes(search.toLowerCase()) ||
        d.deviceId?.toLowerCase().includes(search.toLowerCase()) ||
        d.user?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Active"
            ? d.status === "Active"
            : d.status === "Deactive"; // "Deactive" or any non-active status

      return matchesSearch && matchesStatus;
    });
  }, [devices, search, statusFilter]);

  const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

  const paginatedDevices = filteredDevices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  /* ---------------- CRUD ---------------- */
  const openCreate = () => {
    setEditingDevice(null);
    setForm({ deviceName: "", macAddress: "", deviceType: "4G" });
    setShowModal(true);
  };

  const openEdit = (e, device) => {
    e.stopPropagation();
    setEditingDevice(device);
    setForm(device);
    setShowModal(true);
  };

  const saveDevice = () => {
    if (!form.deviceName || !form.macAddress) return;

    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) => (d.id === editingDevice.id ? { ...d, ...form } : d)),
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
    e.stopPropagation();
    setDevices((prev) => prev.filter((d) => d.id !== id));
    if (detailsDevice && detailsDevice.id === id) {
      setDetailsDevice(null);
    }
  };

  const handleDownloadList = () => {
    if (devices.length === 0) return;

    const headers = [
      "SR. NO.", "ADMIN", "USER", "DEVICE ID", "DEVICE NAME", "DEVICE TYPE",
      "MAC ID", "DEVICE AMR", "SAMPLE COUNT", "LITER/PULSE", "WAKEUP TIME",
      "TIMEZONE", "DATE TIME", "APPLICATION OF AMR", "TYPE", "DIAMETER",
      "STATE", "CITY", "AREA", "ZONE", "START READING", "STATUS"
    ];

    const rows = devices.map(d => [
      d.srNo, d.admin, d.user, d.deviceId, d.deviceName, d.deviceType,
      d.macId, d.deviceAmr, d.sampleCount, d.literPulse, d.wakeupTime,
      d.timezone, d.dateTime, d.applicationOfAmr, d.type, d.diameter,
      d.state, d.city, d.area, d.zone, d.startReading, d.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "devices_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadExcel = () => {
    setShowUploadModal(true);
  };

  const onUploadFile = (file) => {
    alert(`File "${file.name}" selected for upload.`);
    setShowUploadModal(false);
  };

  const handleDownloadTemplate = () => {
    // Dummy template download logic
    const headers = [
      "SR. NO.", "ADMIN", "USER", "DEVICE ID", "DEVICE NAME", "DEVICE TYPE",
      "MAC ID", "DEVICE AMR", "SAMPLE COUNT", "LITER/PULSE", "WAKEUP TIME",
      "TIMEZONE", "DATE TIME", "APPLICATION OF AMR", "TYPE", "DIAMETER",
      "STATE", "CITY", "AREA", "ZONE", "START READING", "STATUS"
    ];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "device_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- ROW CLICK ---------------- */
  const handleRowClick = (device) => {
    setDetailsDevice(device);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="relative flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      {/* LEFT CONTENT - TABLE */}
      <div className="flex-1 flex flex-col w-full h-full">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-5 space-y-4 h-full flex flex-col overflow-hidden">
          {/* HEADER */}
          <div className="flex flex-row justify-between items-center gap-4 mb-2 bg-gray-50/50 -mx-4 -mt-4 md:-mx-5 md:-mt-5 p-4 border-b rounded-t-lg">
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <ClipboardIcon className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-black text-[#002D5E] uppercase tracking-tight">Devices</h1>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              {/* STATUS FILTER DROPDOWN */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm transition-all appearance-none cursor-pointer text-gray-700 hover:border-blue-300"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Deactive">Deactive</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              <div className="relative w-full max-w-[400px]">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search Device..."
                  className="pl-9 pr-3 py-2 w-full border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm transition-all"
                />
              </div>

              <div className="flex items-center gap-2">


                {/* CREATE BUTTON */}
                <div className="relative group">
                  <button
                    onClick={openCreate}
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg text-sm font-bold uppercase transition-all shadow-md active:scale-95 flex items-center justify-center"
                  >
                    <PlusIcon className="w-5 h-5 stroke-[3]" />
                  </button>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    Create Device
                  </span>
                </div>

                {/* DOWNLOAD BUTTON */}
                <div className="relative group">
                  <button
                    onClick={handleDownloadList}
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 stroke-[3]" />
                  </button>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    Download List
                  </span>
                </div>

                {/* UPLOAD BUTTON */}
                <div className="relative group">
                  <button
                    onClick={handleUploadExcel}
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg text-sm font-bold uppercase transition-all shadow-md active:scale-95 flex items-center justify-center"
                  >
                    <ArrowUpTrayIcon className="w-5 h-5 stroke-[3]" />
                  </button>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                    Upload Excel
                  </span>
                </div>

              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 flex-1 text-[13px] custom-scrollbar bg-white shadow-sm">
            <table className="w-full relative border-collapse">
              <thead className="bg-[#F8FAFC] sticky top-0 z-10 border-b border-gray-200">
                <tr className="text-[#002D5E] font-black uppercase text-sm">
                  <th className="px-4 py-2 text-left border-r border-gray-200">NO.</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">ADMIN</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">USER</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">DEVICE ID</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">DEVICE NAME</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">TYPE</th>
                  <th className="px-4 py-2 text-left border-r border-gray-200">MAC ID</th>
                  <th className="px-4 py-2 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedDevices.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => handleRowClick(d)}
                    className={`cursor-pointer transition-colors text-gray-700
                      ${detailsDevice?.id === d.id ? "bg-blue-50" : "hover:bg-gray-50"}
                    `}
                  >
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.srNo}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.admin}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.user}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.deviceId}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.deviceName}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.deviceType}</td>
                    <td className="px-4 py-1.5 border-r border-gray-200 text-gray-700">{d.macId}</td>
                    <td className="px-4 py-1.5 flex justify-end gap-2 text-right">
                      <button
                        onClick={(e) => openEdit(e, d)}
                        className="hover:bg-blue-100 p-1 rounded-lg transition-colors active:scale-90"
                      >
                        <PencilIcon className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={(e) => deleteDevice(e, d.id)}
                        className="hover:bg-red-100 p-1 rounded-lg transition-colors active:scale-90"
                      >
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center gap-4 pt-2 border-t">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Showing <span className="text-blue-600">{Math.min((page - 1) * PAGE_SIZE + 1, filteredDevices.length)} - {Math.min(page * PAGE_SIZE, filteredDevices.length)}</span> of <span className="text-gray-900">{filteredDevices.length}</span> devices
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
              >
                Prev
              </button>

              <span className="px-3 py-1.5 text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={onUploadFile}
        title="UPLOAD DEVICES EXCEL"
        onDownloadTemplate={handleDownloadTemplate}
      />

      {/* RIGHT CONTENT - DETAILS DRAWER */}
      {detailsDevice && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300"
            onClick={() => setDetailsDevice(null)}
          />

          <div
            className="fixed right-0 top-0 h-full w-full sm:w-[600px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.15)] z-[70] flex flex-col transition-transform duration-300 ease-in-out"
          >
            {/* BLUE HEADER */}
            <div className="bg-blue-600 text-white p-6 pr-16 flex justify-between items-start shrink-0 relative">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight leading-tight">
                  {detailsDevice.deviceName}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-blue-500/50 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-400/30">
                    Device Details
                  </span>
                  <span className="text-blue-100 text-[10px] font-bold opacity-80">
                    ID: {detailsDevice.deviceId}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setDetailsDevice(null)}
                className="absolute top-6 right-6 bg-white text-blue-600 p-2.5 rounded-2xl shadow-2xl hover:bg-blue-50 transition-all z-[80] active:scale-90 border border-blue-100 flex items-center justify-center group"
                title="Close Details"
              >
                <XMarkIcon className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* TABS */}
            <div className="flex border-b border-gray-200 bg-white shrink-0 overflow-x-auto custom-scrollbar">
              {[
                "Details",
                "Attributes",
                "Telemetry",
                "Alarms",
                "Events",
                "Relations",
                "Audit",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-all active:bg-gray-50
                  ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"}
                `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-0 bg-white">
              {/* DETAILS TAB */}
              {activeTab === "Details" && (
                <div className="h-full flex flex-col bg-gray-50/30 overflow-y-auto custom-scrollbar p-6">

                  {/* GENERAl SECTION */}
                  <div className="mb-8">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      General Information
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Device Name</span>
                        <span className="text-sm text-gray-800">{detailsDevice.deviceName || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Device ID</span>
                        <span className="text-sm text-gray-800">{detailsDevice.deviceId || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Mac ID</span>
                        <span className="text-sm text-gray-800">{detailsDevice.macId || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Device Type</span>
                        <span className="text-sm text-gray-800">{detailsDevice.deviceType || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Status</span>
                        <div className="relative w-fit">
                          <select
                            value={detailsDevice.status || "Active"}
                            onChange={(e) => {
                              const newStatus = e.target.value;

                              // Update local details view
                              setDetailsDevice(prev => ({ ...prev, status: newStatus }));

                              // Update main list
                              setDevices(prev => prev.map(d => d.id === detailsDevice.id ? { ...d, status: newStatus } : d));
                            }}
                            className={`appearance-none pl-3 pr-8 py-0.5 rounded text-[10px] font-black uppercase tracking-wider cursor-pointer border focus:ring-2 outline-none transition-all
                              ${(detailsDevice.status || "Active") === "Active"
                                ? "bg-green-100 text-green-700 border-green-200 focus:ring-green-500/20"
                                : "bg-gray-100 text-gray-500 border-gray-200 focus:ring-gray-500/20"}
                            `}
                          >
                            <option value="Active">Active</option>
                            <option value="Deactive">Deactive</option>
                          </select>
                          <HiChevronDown className={`w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none
                            ${(detailsDevice.status || "Active") === "Active" ? "text-green-600" : "text-gray-400"}`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Sr. No.</span>
                        <span className="text-sm text-gray-800">{detailsDevice.srNo || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Admin</span>
                        <span className="text-sm text-gray-800">{detailsDevice.admin || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">User</span>
                        <span className="text-sm text-gray-800">{detailsDevice.user || "-"}</span>
                      </div>
                    </div>
                  </div>

                  {/* SETUP SECTION */}
                  <div className="mb-8">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      Setup Details
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Wakeup Time</span>
                        <span className="text-sm text-gray-800">{detailsDevice.wakeupTime || "00:00:00"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Timezone</span>
                        <span className="text-sm text-gray-800">{detailsDevice.timezone || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Date Time</span>
                        <span className="text-sm text-gray-800 break-all">{detailsDevice.dateTime || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">App of AMR</span>
                        <span className="text-sm text-gray-800">{detailsDevice.applicationOfAmr || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Type</span>
                        <span className="text-sm text-gray-800">{detailsDevice.type || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Diameter</span>
                        <span className="text-sm text-gray-800">{detailsDevice.diameter || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Start Reading</span>
                        <span className="text-sm text-gray-800">{detailsDevice.startReading || "0"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Liter/Pulse</span>
                        <span className="text-sm text-gray-800">{detailsDevice.literPulse || "0.01"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Sample Count</span>
                        <span className="text-sm text-gray-800">{detailsDevice.sampleCount || "0"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Device AMR</span>
                        <span className="text-sm text-gray-800">{detailsDevice.deviceAmr || "-"}</span>
                      </div>
                    </div>
                  </div>

                  {/* AREA SECTION */}
                  <div className="mb-4">
                    <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      Area Information
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">State</span>
                        <span className="text-sm text-gray-800">{detailsDevice.state || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">City</span>
                        <span className="text-sm text-gray-800">{detailsDevice.city || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Area</span>
                        <span className="text-sm text-gray-800">{detailsDevice.area || "-"}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Zone</span>
                        <span className="text-sm text-gray-800">{detailsDevice.zone || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ATTRIBUTES TAB */}
              {activeTab === "Attributes" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Server Attributes
                    </h3>
                    <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm text-xs">
                    <div className="grid grid-cols-2 p-3 border-b font-black bg-gray-50 text-[#002D5E] uppercase tracking-tighter">
                      <span>Key</span>
                      <span>Value</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b border-gray-50 hover:bg-slate-50 transition-colors">
                      <span className="text-gray-500 font-medium font-mono">active</span>
                      <span className="text-gray-900 font-bold">true</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 border-b border-gray-50 hover:bg-slate-50 transition-colors">
                      <span className="text-gray-500 font-medium font-mono text-[10px]">lastActivityTime</span>
                      <span className="text-gray-900 font-bold">1736402830211</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-slate-50 transition-colors">
                      <span className="text-gray-500 font-medium font-mono text-[10px]">inactivityAlarmTime</span>
                      <span className="text-gray-900 font-bold">1736402830211</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2 mt-6">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Shared Attributes
                    </h3>
                    <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-xl text-gray-400 italic text-xs">
                    No shared attributes found
                  </div>
                </div>
              )}

              {/* TELEMETRY TAB */}
              {activeTab === "Telemetry" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Latest Values
                    </h3>
                    <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                      <ClockIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm text-xs">
                    <div className="grid grid-cols-3 p-3 border-b font-black bg-gray-50 text-[#002D5E] uppercase tracking-tighter">
                      <span>Key</span>
                      <span>Value</span>
                      <span>Update</span>
                    </div>
                    {[
                      { k: "temperature", v: "24.5", t: "1m ago" },
                      { k: "humidity", v: "45", t: "1m ago" },
                      { k: "voltage", v: "220.1", t: "5s ago" },
                      { k: "current", v: "1.2", t: "5s ago" },
                      { k: "power", v: "264.12", t: "5s ago" },
                      { k: "energy", v: "45021.5", t: "10m ago" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 p-3 border-b border-gray-50 last:border-0 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-gray-500 font-medium font-mono">{row.k}</span>
                        <span className="text-gray-900 font-bold">{row.v}</span>
                        <span className="text-gray-400 text-[10px]">{row.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ALARMS TAB */}
              {activeTab === "Alarms" && (
                <div className="space-y-3">
                  <div className="flex gap-2 mb-2">
                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-black border border-red-100 uppercase tracking-tighter">
                      CRITICAL
                    </span>
                    <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-black border border-orange-100 uppercase tracking-tighter">
                      MAJOR
                    </span>
                  </div>
                  {[
                    { severity: "CRITICAL", type: "High Temperature", time: "2024-01-08 14:30", status: "Active" },
                    { severity: "MAJOR", type: "Connectivity Loss", time: "2024-01-07 09:15", status: "Cleared" },
                  ].map((alarm, i) => (
                    <div
                      key={i}
                      className={`bg-white border-l-4 shadow-sm p-4 rounded-xl flex justify-between items-start transition-all hover:translate-x-1
                      ${alarm.severity === 'CRITICAL' ? 'border-l-red-500' : 'border-l-orange-500'}
                    `}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">
                            {alarm.type}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase">
                            {alarm.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1 font-medium">
                          {alarm.time}
                        </div>
                      </div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${alarm.severity === 'CRITICAL' ? 'text-red-600' : 'text-orange-600'}`}>
                        {alarm.severity}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EVENTS TAB */}
              {activeTab === "Events" && (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm text-xs">
                    <div className="grid grid-cols-3 p-3 border-b font-black bg-gray-50 text-[#002D5E] uppercase tracking-tighter">
                      <span>Event</span>
                      <span>Status</span>
                      <span>Time</span>
                    </div>
                    {[
                      { e: "Error Alert", s: "Success", t: "2024-01-09 10:00" },
                      { e: "Stats Log", s: "Success", t: "2024-01-09 09:00" },
                      { e: "Heartbeat", s: "Success", t: "2024-01-08 12:00" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 p-3 border-b border-gray-50 last:border-0 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-gray-700 font-bold">{row.e}</span>
                        <span className="text-emerald-600 font-black text-[10px] uppercase">{row.s}</span>
                        <span className="text-gray-400 text-[10px]">{row.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RELATIONS TAB */}
              {activeTab === "Relations" && (
                <div className="space-y-6 flex flex-col items-center py-4">
                  <div className="w-full p-5 bg-white border border-blue-100 rounded-2xl text-center shadow-lg shadow-blue-50">
                    <div className="text-blue-600 font-black text-sm mb-1 uppercase tracking-tight">
                      {detailsDevice.deviceName}
                    </div>
                    <div className="text-[10px] text-blue-300 font-black uppercase tracking-widest">Target Device</div>
                  </div>
                  <div className="w-px h-10 bg-gradient-to-b from-blue-200 to-transparent"></div>
                  <div className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
                    <div className="text-gray-700 font-bold text-xs uppercase">
                      Asset: Building A
                    </div>
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">Contains</div>
                  </div>
                  <div className="w-px h-10 bg-gray-100"></div>
                  <div className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-center">
                    <div className="text-gray-700 font-bold text-xs uppercase">
                      Customer: Embel Tech
                    </div>
                    <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">Owner</div>
                  </div>
                </div>
              )}

              {/* AUDIT TAB */}
              {activeTab === "Audit" && (
                <div className="space-y-3">
                  {[
                    { u: "Admin", a: "Attributes Updated", t: "2 min ago" },
                    { u: "Manager", a: "Credentials Reset", t: "1h ago" },
                    { u: "System", a: "Device Initialized", t: "1d ago" },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                    >
                      <div className="bg-slate-100 group-hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-slate-500 group-hover:text-white font-black shrink-0 transition-colors">
                        {log.u.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {log.a}
                        </div>
                        <div className="text-[11px] text-gray-400 font-medium">
                          {log.u} • {log.t}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div >
          </div>
        </>
      )
      }

      {/* CREATE / EDIT MODAL */}
      {
        showModal && (
          <DeviceForm
            initialData={editingDevice}
            onClose={() => setShowModal(false)}
            onSave={(formData) => {
              if (editingDevice) {
                setDevices((prev) =>
                  prev.map((d) =>
                    d.id === editingDevice.id ? { ...d, ...formData } : d,
                  ),
                );
              } else {
                setDevices((prev) => [
                  ...prev,
                  {
                    ...formData,
                    id: Date.now(),
                    isLinked: false,
                    linkedMeterId: null,
                  },
                ]);
              }
              setShowModal(false);
            }}
          />
        )
      }
    </div >
  );
};

export default Devices;
