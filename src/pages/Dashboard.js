import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LiveMap from "../components/LiveMap";
import MeterDetails from "../components/MeterDetails";
import {
  BoltIcon,
  FireIcon,
  BeakerIcon,
  SunIcon,
  UsersIcon,
  ShieldCheckIcon,
  UserIcon,
  BellAlertIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const meterTypes = ["SOLAR", "GAS", "WATER", "ELECTRIC"];

const dummyMeters = [
  { id: "1", meterNumber: "Solar-Panel-01", meterType: "SOLAR", assignedToRole: "USER", assignedToUsername: "john_doe", status: "ACTIVE", online: true, battery: 85 },
  { id: "2", meterNumber: "Gas-Line-Main", meterType: "GAS", assignedToRole: "ADMIN", assignedToUsername: "admin_user", status: "INACTIVE", online: false, battery: 12 },
  { id: "3", meterNumber: "Main Water Tank", meterType: "WATER", assignedToRole: "USER", assignedToUsername: "alice", status: "ACTIVE", online: true, battery: 92 },
  { id: "4", meterNumber: "Substation-01", meterType: "ELECTRIC", assignedToRole: "USER", assignedToUsername: "bob", status: "MAINTENANCE", online: false, battery: 0 },
  { id: "5", meterNumber: "Solar-Panel-02", meterType: "SOLAR", assignedToRole: "ADMIN", assignedToUsername: "superadmin", status: "REPLACED", online: true, battery: 100 },
  { id: "6", meterNumber: "Reserve Water Tank", meterType: "WATER", assignedToRole: "USER", assignedToUsername: "charlie", status: "ACTIVE", online: true, battery: 45 },
  { id: "7", meterNumber: "Office-AC-01", meterType: "ELECTRIC", assignedToRole: "USER", assignedToUsername: "david", status: "ACTIVE", online: true, battery: 78 },
  { id: "8", meterNumber: "Kitchen-Gas", meterType: "GAS", assignedToRole: "USER", assignedToUsername: "emma", status: "ACTIVE", online: false, battery: 20 },
];

const dummyUsers = [
  { id: 1, name: "Super Admin", email: "superadmin@amr.com", username: "superadmin", role: "SUPER_ADMIN", active: true, createdBy: null, lat: 28.6139, lng: 77.2090 }, // Delhi
  { id: 2, name: "Admin One", email: "admin1@amr.com", username: "admin_user", role: "ADMIN", active: true, createdBy: 1, lat: 19.0760, lng: 72.8777 }, // Mumbai
  { id: 3, name: "Admin Two", email: "admin2@amr.com", username: "admin_two", role: "ADMIN", active: false, createdBy: 1, lat: 12.9716, lng: 77.5946 }, // Bangalore
  { id: 4, name: "John Doe", email: "john@amr.com", username: "john_doe", role: "USER", active: true, createdBy: 2, lat: 17.3850, lng: 78.4867 }, // Hyderabad
  { id: 5, name: "Alice Smith", email: "alice@amr.com", username: "alice", role: "USER", active: true, createdBy: 2, lat: 23.0225, lng: 72.5714 }, // Ahmedabad
  { id: 6, name: "Bob Wilson", email: "bob@amr.com", username: "bob", role: "USER", active: false, createdBy: 3, lat: 13.0827, lng: 80.2707 }, // Chennai
  { id: 7, name: "Charlie Brown", email: "charlie@amr.com", username: "charlie", role: "USER", active: true, createdBy: 2, lat: 22.5726, lng: 88.3639 }, // Kolkata
  { id: 8, name: "David Lee", email: "david@amr.com", username: "david", role: "USER", active: true, createdBy: 3, lat: 26.9124, lng: 75.7873 }, // Jaipur
  { id: 9, name: "Emma Wilson", email: "emma@amr.com", username: "emma", role: "USER", active: true, createdBy: 2, lat: 18.5204, lng: 73.8567 }, // Pune
];

const dummyAlerts = [
  { id: 1, type: "critical", title: "Battery Low - MTR-001", message: "Battery level below 10%", timestamp: "2025-01-07 10:30:00", isRead: false },
  { id: 2, type: "warning", title: "Offline Device - MTR-003", message: "Offline for 2 hours", timestamp: "2025-01-07 09:15:00", isRead: false },
  { id: 3, type: "critical", title: "Faulty Reading - MTR-004", message: "Abnormal readings detected", timestamp: "2025-01-07 08:45:00", isRead: false },
  { id: 4, type: "warning", title: "High Usage - MTR-001", message: "Unusually high consumption", timestamp: "2025-01-07 07:30:00", isRead: false },
  { id: 5, type: "info", title: "Maintenance Due", message: "Scheduled maintenance for MTR-002", timestamp: "2025-01-06 14:20:00", isRead: true },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMeterType, setSelectedMeterType] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedSubUser, setExpandedSubUser] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedMeter, setSelectedMeter] = useState(null); // [NEW] State for selected meter details

  const filteredMeters = useMemo(() => {
    if (!search) return dummyMeters;
    const lowerSearch = search.toLowerCase();
    return dummyMeters.filter(
      (m) =>
        m.meterNumber.toLowerCase().includes(lowerSearch) ||
        m.meterType.toLowerCase().includes(lowerSearch) ||
        m.assignedToUsername.toLowerCase().includes(lowerSearch) ||
        m.status.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const filteredUsers = useMemo(() => {
    if (!search) return dummyUsers;
    const lowerSearch = search.toLowerCase();
    return dummyUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch) ||
        u.role.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const filteredAlerts = useMemo(() => {
    if (!search) return dummyAlerts;
    const lowerSearch = search.toLowerCase();
    return dummyAlerts.filter(
      (a) =>
        a.title.toLowerCase().includes(lowerSearch) ||
        a.message.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const meterStats = useMemo(() => {
    const stats = {};
    meterTypes.forEach((type) => {
      const metersOfType = filteredMeters.filter((m) => m.meterType === type);
      stats[type] = {
        total: metersOfType.length,
        active: metersOfType.filter((m) => m.status === "ACTIVE").length,
        online: metersOfType.filter((m) => m.online).length,
      };
    });
    return stats;
  }, [filteredMeters]);

  const userStats = useMemo(() => {
    const admins = filteredUsers.filter((u) => u.role === "ADMIN");
    const users = filteredUsers.filter((u) => u.role === "USER");
    return {
      totalAdmins: admins.length,
      activeAdmins: admins.filter((u) => u.active).length,
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.active).length,
    };
  }, [filteredUsers]);

  const getMeterIcon = (type) => {
    switch (type) {
      case "SOLAR": return <SunIcon className="w-10 h-10" />;
      case "GAS": return <FireIcon className="w-10 h-10" />;
      case "WATER": return <BeakerIcon className="w-10 h-10" />;
      case "ELECTRIC": return <BoltIcon className="w-10 h-10" />;
      default: return <BoltIcon className="w-10 h-10" />;
    }
  };

  const getMeterGradient = (type) => {
    switch (type) {
      case "SOLAR": return "from-amber-400 to-orange-500";
      case "GAS": return "from-orange-400 to-red-500";
      case "WATER": return "from-cyan-400 to-blue-500";
      case "ELECTRIC": return "from-violet-400 to-purple-600";
      default: return "from-gray-400 to-gray-500";
    }
  };

  const metersForSelectedType = selectedMeterType
    ? filteredMeters.filter((m) => m.meterType === selectedMeterType)
    : [];

  const usersForSelectedRole = selectedUserRole
    ? filteredUsers.filter((u) => u.role === selectedUserRole)
    : [];

  const getUsersCreatedBy = (userId) => {
    return filteredUsers.filter((u) => u.createdBy === userId);
  };

  const unreadFilteredAlerts = filteredAlerts.filter((a) => !a.isRead);

  /* ---------------- MOCK DATA FOR LIVE METERS LIST ---------------- */
  const liveMeters = [
    { id: "MTR-001", name: "Water Tank System", type: "Water", status: "Online", last: "2 mins ago" },
    { id: "MTR-002", name: "Secondary Tank", type: "Water", status: "Online", last: "5 mins ago" },
    { id: "MTR-003", name: "Reserve Tank", type: "Water", status: "Offline", last: "2 hours ago" },
    { id: "MTR-004", name: "Main Supply", type: "Water", status: "Online", last: "Just now" },
  ];

  /* ---------------- RETURN ---------------- */
  // If a meter is selected, show the Details View
  if (selectedMeter) {
    return (
      <div className="p-6">
        <MeterDetails meter={selectedMeter} onBack={() => setSelectedMeter(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-6">
      {/* Header with Search */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800"> SuperAdmin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of your AMR system</p>
          </div>
          <div className="relative w-full sm:w-80">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meters, users, alerts..."
              className="w-full pl-11 pr-10 py-3 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition"
              >
                <XMarkIcon className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>
        {search && (
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-slate-500">Results:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">{filteredMeters.length} meters</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-medium">{filteredUsers.length} users</span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg font-medium">{filteredAlerts.length} alerts</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">





        {/* METER TYPES SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Meter Types</h2>
            <button
              onClick={() => navigate("/meters")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View All <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {meterTypes.map((type) => (
              <div
                key={type}
                onClick={() => setSelectedMeterType(selectedMeterType === type ? null : type)}
                className={`bg-gradient-to-br ${getMeterGradient(type)} text-white rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedMeterType === type ? "shadow-2xl scale-105" : ""
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      {getMeterIcon(type)}
                    </div>
                    <h3 className="text-xl font-bold">{type}</h3>
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${selectedMeterType === type ? "rotate-180" : ""}`} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-white/20 rounded-lg px-2 py-1.5 text-center backdrop-blur-sm">
                    <p className="font-bold text-lg">{meterStats[type].total}</p>
                    <p className="opacity-80">Total</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 py-1.5 text-center backdrop-blur-sm">
                    <p className="font-bold text-lg">{meterStats[type].active}</p>
                    <p className="opacity-80">Active</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-2 py-1.5 text-center backdrop-blur-sm">
                    <p className="font-bold text-lg">{meterStats[type].online}</p>
                    <p className="opacity-80">Online</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* METER DETAILS TABLE */}
          {selectedMeterType && (
            <div className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 animate-fadeIn">
              <div className="bg-slate-50 px-5 py-4 flex justify-between items-center border-b">
                <h3 className="font-semibold text-slate-700">{selectedMeterType} Meters ({metersForSelectedType.length})</h3>
                <button
                  onClick={() => setSelectedMeterType(null)}
                  className="p-1 hover:bg-slate-200 rounded-lg transition"
                >
                  <XMarkIcon className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 sticky top-0">
                    <tr>
                      <th className="px-5 py-3 text-left font-semibold">Meter Number</th>
                      <th className="px-5 py-3 text-left font-semibold">Assigned To</th>
                      <th className="px-5 py-3 text-left font-semibold">Status</th>
                      <th className="px-5 py-3 text-left font-semibold">Battery</th>
                      <th className="px-5 py-3 text-left font-semibold">Online</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {metersForSelectedType.map((meter) => (
                      <tr
                        key={meter.id}
                        onClick={() => setSelectedMeter(meter)}
                        className="hover:bg-slate-50 transition cursor-pointer"
                      >
                        <td className="px-5 py-3 font-medium text-slate-800">{meter.meterNumber}</td>
                        <td className="px-5 py-3 text-slate-600">{meter.assignedToUsername}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${meter.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                            meter.status === "INACTIVE" ? "bg-slate-100 text-slate-600" :
                              meter.status === "FAULTY" ? "bg-red-100 text-red-700" :
                                "bg-amber-100 text-amber-700"
                            }`}>
                            {meter.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${meter.battery > 50 ? "bg-green-500" : meter.battery > 20 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${meter.battery}%` }}></div>
                            </div>
                            <span className="text-xs font-medium text-slate-500">{meter.battery}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meter.online ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${meter.online ? "bg-green-500" : "bg-slate-400"}`}></span>
                            {meter.online ? "Online" : "Offline"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* USER MANAGEMENT & ALERTS - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* USER MANAGEMENT */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">User Management</h2>
              <button
                onClick={() => navigate("/users")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                View All <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Admin Card */}
              <div
                onClick={() => setSelectedUserRole(selectedUserRole === "ADMIN" ? null : "ADMIN")}
                className={`bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedUserRole === "ADMIN" ? "shadow-2xl scale-105" : ""
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Admins</p>
                    <p className="text-3xl font-bold mt-1">{userStats.totalAdmins}</p>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-90">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-sm"></span>
                  {userStats.activeAdmins} Active
                </div>
              </div>

              {/* Users Card */}
              <div
                onClick={() => setSelectedUserRole(selectedUserRole === "USER" ? null : "USER")}
                className={`bg-gradient-to-br from-teal-400 to-cyan-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedUserRole === "USER" ? "shadow-2xl scale-105" : ""
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Users</p>
                    <p className="text-3xl font-bold mt-1">{userStats.totalUsers}</p>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <UsersIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-90">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-sm"></span>
                  {userStats.activeUsers} Active
                </div>
              </div>

              {/* Total Card */}
              <div
                onClick={() => navigate("/users")}
                className="bg-gradient-to-br from-emerald-400 to-green-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Total</p>
                    <p className="text-3xl font-bold mt-1">{filteredUsers.length}</p>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-90">
                  <ChevronRightIcon className="w-3 h-3" />
                  Manage All
                </div>
              </div>

              {/* Inactive Card */}
              <div className="bg-gradient-to-br from-slate-400 to-slate-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Inactive</p>
                    <p className="text-3xl font-bold mt-1">{filteredUsers.filter(u => !u.active).length}</p>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-90">
                  <ExclamationCircleIcon className="w-3 h-3 text-red-200" />
                  Need Action
                </div>
              </div>
            </div>

            {/* USER TABLE */}
            {selectedUserRole && (
              <div className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 animate-fadeIn">
                <div className="bg-slate-50 px-5 py-4 flex justify-between items-center border-b">
                  <h3 className="font-semibold text-slate-700">{selectedUserRole} List ({usersForSelectedRole.length})</h3>
                  <button
                    onClick={() => setSelectedUserRole(null)}
                    className="p-1 hover:bg-slate-200 rounded-lg transition"
                  >
                    <XMarkIcon className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {usersForSelectedRole.map((user) => {
                    const createdUsers = getUsersCreatedBy(user.id);
                    return (
                      <div key={user.id}>
                        <div
                          className={`px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition ${expandedUser === user.id ? "bg-blue-50" : ""
                            }`}
                          onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                              }`}>
                              {user.active ? "Active" : "Inactive"}
                            </span>
                            {createdUsers.length > 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {createdUsers.length} sub-users
                              </span>
                            )}
                            {createdUsers.length > 0 && (
                              <ChevronRightIcon className={`w-4 h-4 text-slate-400 transition-transform ${expandedUser === user.id ? "rotate-90" : ""}`} />
                            )}
                          </div>
                        </div>
                        {/* Sub-users */}
                        {expandedUser === user.id && createdUsers.length > 0 && (
                          <div className="bg-slate-50 px-5 py-3 border-t border-slate-100">
                            <p className="text-xs text-slate-500 mb-2">Created by {user.name}:</p>
                            <div className="space-y-2">
                              {createdUsers.map((cu) => (
                                <div key={cu.id} className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300">
                                  {/* User Info Row */}
                                  <div
                                    className={`flex items-center justify-between p-3 bg-white cursor-pointer hover:bg-slate-50 transition border-b border-transparent ${expandedSubUser === cu.id ? "!border-slate-100 bg-slate-50/50" : ""}`}
                                    onClick={() => setExpandedSubUser(expandedSubUser === cu.id ? null : cu.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                        {cu.name.charAt(0)}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-slate-700">{cu.name}</p>
                                        <div className="flex items-center gap-2">
                                          <p className="text-xs text-slate-400">{cu.email}</p>
                                          {expandedSubUser === cu.id && (
                                            <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-semibold ${cu.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                                              {cu.active ? "Active" : "Inactive"}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {!expandedSubUser && cu.id !== expandedSubUser && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${cu.active ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                                          {cu.active ? "Active" : "Inactive"}
                                        </span>
                                      )}
                                      <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedSubUser === cu.id ? "rotate-180" : ""}`} />
                                    </div>
                                  </div>

                                  {/* Assigned Meters Section (Expandable) */}
                                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSubUser === cu.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                    {dummyMeters.filter(m => m.assignedToUsername === cu.username).length > 0 ? (
                                      <div className="bg-slate-50 px-3 py-3 border-t border-slate-100">
                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 pl-1">Assigned Meters</p>
                                        <div className="space-y-2">
                                          {dummyMeters.filter(m => m.assignedToUsername === cu.username).map(meter => (
                                            <div key={meter.id} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition cursor-default">
                                              <div className="p-1.5 bg-blue-50 rounded-md text-blue-500">
                                                {getMeterIcon(meter.meterType)}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-slate-700 truncate">{meter.meterNumber}</p>
                                                <p className="text-[10px] text-slate-400 capitalize">{meter.meterType.toLowerCase()} Meter</p>
                                              </div>
                                              <div className="flex flex-col items-end gap-1">
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${meter.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                                  {meter.status}
                                                </span>
                                                <span className={`flex items-center gap-1 text-[10px] ${meter.online ? 'text-green-600' : 'text-slate-400'}`}>
                                                  <span className={`w-1.5 h-1.5 rounded-full ${meter.online ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                                  {meter.online ? 'Online' : 'Offline'}
                                                </span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bg-slate-50 px-3 py-4 text-center border-t border-slate-100">
                                        <p className="text-xs text-slate-400 italic">No meters assigned to this user.</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LIVE LOCATION MAP SECTION */}
            <div className="mt-6 h-96 w-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">Live User Locations</h2>
              </div>
              <LiveMap users={filteredUsers} />
            </div>
          </section>

          {/* ALERTS SECTION */}
          <section className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-800">Recent Alerts</h2>
                {unreadFilteredAlerts.length > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {unreadFilteredAlerts.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate("/alerts")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                View All <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden p-4">
              <div className="h-96 overflow-y-auto grid grid-cols-1 gap-3 pr-2 custom-scrollbar">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => navigate("/alerts")}
                    className="relative pl-4 pr-4 py-4 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer transition hover:shadow-md group"
                  >
                    {/* Left Colored Accent */}
                    <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md ${alert.type === "critical" ? "bg-red-500" : "bg-amber-500"
                      }`}></div>

                    <div className="flex justify-between items-start pl-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {alert.type === "critical" ? (
                            <ExclamationCircleIcon className="w-4 h-4 text-red-500" />
                          ) : (
                            <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" />
                          )}
                          <h4 className={`text-sm font-bold truncate ${!alert.isRead ? "text-slate-800" : "text-slate-600"}`}>
                            {alert.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{alert.message}</p>
                        <p className="text-[10px] text-slate-400 mt-2">{alert.timestamp}</p>
                      </div>

                      {/* Red Dot for Unread */}
                      {!alert.isRead && (
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1.5 shadow-sm"></span>
                      )}
                    </div>
                  </div>
                ))}

                {filteredAlerts.length === 0 && (
                  <div className="p-8 text-center col-span-full">
                    <BellAlertIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No alerts</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>


      </div >

      {/* Animation styles */}
      < style > {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style >
    </div >
  );
};

export default Dashboard;
