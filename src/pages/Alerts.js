import { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const dummyAlerts = [
  {
    id: 1,
    type: "critical",
    title: "Battery Low - MTR-001",
    message: "Meter MTR-001 battery level is below 10%",
    meterNumber: "MTR-001",
    meterType: "SOLAR",
    timestamp: "2025-01-07 10:30:00",
    isRead: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Offline Device - MTR-003",
    message: "Meter MTR-003 has been offline for 2 hours",
    meterNumber: "MTR-003",
    meterType: "WATER",
    timestamp: "2025-01-07 09:15:00",
    isRead: false,
  },
  {
    id: 3,
    type: "info",
    title: "Maintenance Scheduled",
    message: "Scheduled maintenance for MTR-002 on 2025-01-10",
    meterNumber: "MTR-002",
    meterType: "GAS",
    timestamp: "2025-01-06 14:20:00",
    isRead: true,
  },
  {
    id: 4,
    type: "critical",
    title: "Faulty Reading - MTR-004",
    message: "Meter MTR-004 reporting abnormal readings",
    meterNumber: "MTR-004",
    meterType: "ELECTRIC",
    timestamp: "2025-01-07 08:45:00",
    isRead: false,
  },
  {
    id: 5,
    type: "success",
    title: "Meter Replaced Successfully",
    message: "MTR-005 has been replaced and is now active",
    meterNumber: "MTR-005",
    meterType: "SOLAR",
    timestamp: "2025-01-05 16:00:00",
    isRead: true,
  },
  {
    id: 6,
    type: "warning",
    title: "High Usage Detected",
    message: "Unusually high consumption on MTR-001",
    meterNumber: "MTR-001",
    meterType: "SOLAR",
    timestamp: "2025-01-07 07:30:00",
    isRead: false,
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.title.toLowerCase().includes(search.toLowerCase()) ||
        alert.message.toLowerCase().includes(search.toLowerCase()) ||
        alert.meterNumber.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || alert.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [alerts, search, filterType]);

  const paginatedAlerts = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAlerts.slice(start, start + perPage);
  }, [filteredAlerts, page]);

  const totalPages = Math.ceil(filteredAlerts.length / perPage) || 1;

  const markAsRead = (id) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, isRead: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return <ExclamationCircleIcon className="w-5 h-5 text-red-600" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertBg = (type, isRead) => {
    if (isRead) return "bg-gray-50";
    switch (type) {
      case "critical":
        return "bg-red-50 border-l-4 border-red-500";
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "success":
        return "bg-green-50 border-l-4 border-green-500";
      default:
        return "bg-blue-50 border-l-4 border-blue-500";
    }
  };

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="px-4 py-6 md:p-6">
      <div className="bg-white rounded-lg shadow p-5 space-y-5">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-800">Alerts</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>

          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4">
          <div className="relative w-full sm:w-72">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search alerts..."
              className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded-md text-sm"
          >
            <option value="all">All Types</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>
        </div>

        {/* ALERTS LIST */}
        <div className="space-y-3">
          {paginatedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${getAlertBg(alert.type, alert.isRead)} transition-all hover:shadow-md cursor-pointer`}
              onClick={() => markAsRead(alert.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h3 className={`font-medium ${alert.isRead ? "text-gray-600" : "text-gray-900"}`}>
                      {alert.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-200 rounded">{alert.meterType}</span>
                      <span>{alert.meterNumber}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAlert(alert.id);
                  }}
                  className="text-gray-400 hover:text-red-600 text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}

          {paginatedAlerts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No alerts found
            </div>
          )}
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
    </div>
  );
};

export default Alerts;
