import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  { id: "1", meterNumber: "MTR-001", meterType: "SOLAR", assignedToRole: "USER", assignedToUsername: "john_doe", status: "ACTIVE", online: true },
  { id: "2", meterNumber: "MTR-002", meterType: "GAS", assignedToRole: "ADMIN", assignedToUsername: "admin_user", status: "INACTIVE", online: false },
  { id: "3", meterNumber: "MTR-003", meterType: "WATER", assignedToRole: "USER", assignedToUsername: "alice", status: "FAULTY", online: true },
  { id: "4", meterNumber: "MTR-004", meterType: "ELECTRIC", assignedToRole: "USER", assignedToUsername: "bob", status: "MAINTENANCE", online: false },
  { id: "5", meterNumber: "MTR-005", meterType: "SOLAR", assignedToRole: "ADMIN", assignedToUsername: "superadmin", status: "REPLACED", online: true },
  { id: "6", meterNumber: "MTR-006", meterType: "WATER", assignedToRole: "USER", assignedToUsername: "charlie", status: "ACTIVE", online: true },
  { id: "7", meterNumber: "MTR-007", meterType: "ELECTRIC", assignedToRole: "USER", assignedToUsername: "david", status: "ACTIVE", online: true },
  { id: "8", meterNumber: "MTR-008", meterType: "GAS", assignedToRole: "USER", assignedToUsername: "emma", status: "ACTIVE", online: false },
];

const dummyUsers = [
  { id: 1, name: "Super Admin", email: "superadmin@amr.com", role: "SUPER_ADMIN", active: true, createdBy: null },
  { id: 2, name: "Admin One", email: "admin1@amr.com", role: "ADMIN", active: true, createdBy: 1 },
  { id: 3, name: "Admin Two", email: "admin2@amr.com", role: "ADMIN", active: false, createdBy: 1 },
  { id: 4, name: "John Doe", email: "john@amr.com", role: "USER", active: true, createdBy: 2 },
  { id: 5, name: "Alice Smith", email: "alice@amr.com", role: "USER", active: true, createdBy: 2 },
  { id: 6, name: "Bob Wilson", email: "bob@amr.com", role: "USER", active: false, createdBy: 3 },
  { id: 7, name: "Charlie Brown", email: "charlie@amr.com", role: "USER", active: true, createdBy: 2 },
  { id: 8, name: "David Lee", email: "david@amr.com", role: "USER", active: true, createdBy: 3 },
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
  const [search, setSearch] = useState("");

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

  return (
    <div className="min-h-full">
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
                className={`bg-gradient-to-br ${getMeterGradient(type)} text-white rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedMeterType === type ? "shadow-2xl scale-105" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {getMeterIcon(type)}
                  </div>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${selectedMeterType === type ? "rotate-180" : ""}`} />
                </div>
                <h3 className="text-xl font-bold mt-4">{type}</h3>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
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
                      <th className="px-5 py-3 text-left font-semibold">Online</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {metersForSelectedType.map((meter) => (
                      <tr key={meter.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 font-medium text-slate-800">{meter.meterNumber}</td>
                        <td className="px-5 py-3 text-slate-600">{meter.assignedToUsername}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            meter.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                            meter.status === "INACTIVE" ? "bg-slate-100 text-slate-600" :
                            meter.status === "FAULTY" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {meter.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            meter.online ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
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
                className={`bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedUserRole === "ADMIN" ? "shadow-2xl scale-105" : ""
                }`}
              >
                <ShieldCheckIcon className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">{userStats.totalAdmins}</p>
                <p className="text-sm opacity-80">Admins</p>
                <p className="text-xs mt-1 opacity-70">{userStats.activeAdmins} active</p>
              </div>

              {/* Users Card */}
              <div
                onClick={() => setSelectedUserRole(selectedUserRole === "USER" ? null : "USER")}
                className={`bg-gradient-to-br from-teal-400 to-cyan-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedUserRole === "USER" ? "shadow-2xl scale-105" : ""
                }`}
              >
                <UsersIcon className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">{userStats.totalUsers}</p>
                <p className="text-sm opacity-80">Users</p>
                <p className="text-xs mt-1 opacity-70">{userStats.activeUsers} active</p>
              </div>

              {/* Total Card */}
              <div
                onClick={() => navigate("/users")}
                className="bg-gradient-to-br from-emerald-400 to-green-600 text-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <UserGroupIcon className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">{filteredUsers.length}</p>
                <p className="text-sm opacity-80">Total Users</p>
                <p className="text-xs mt-1 opacity-70">Click to manage</p>
              </div>

              {/* Inactive Card */}
              <div className="bg-gradient-to-br from-slate-400 to-slate-600 text-white rounded-2xl p-4">
                <UserIcon className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold">{filteredUsers.filter(u => !u.active).length}</p>
                <p className="text-sm opacity-80">Inactive</p>
                <p className="text-xs mt-1 opacity-70">Need attention</p>
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
                          className={`px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition ${
                            expandedUser === user.id ? "bg-blue-50" : ""
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
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
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
                                <div key={cu.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                      {cu.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-slate-700">{cu.name}</p>
                                      <p className="text-xs text-slate-400">{cu.email}</p>
                                    </div>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-xs ${cu.active ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                                    {cu.active ? "Active" : "Inactive"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ALERTS SECTION */}
          <section className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-800">Alerts</h2>
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
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {unreadFilteredAlerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => navigate("/alerts")}
                    className={`p-4 cursor-pointer transition hover:bg-slate-50 ${
                      alert.type === "critical" ? "border-l-4 border-red-500" : "border-l-4 border-amber-500"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {alert.type === "critical" ? (
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate">{alert.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{alert.message}</p>
                        <p className="text-xs text-slate-400 mt-2">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {unreadFilteredAlerts.length === 0 && (
                  <div className="p-8 text-center">
                    <BellAlertIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No new alerts</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
