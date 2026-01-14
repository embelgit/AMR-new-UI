import { useState, useMemo } from "react";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  CalendarIcon,
  ChartBarIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EyeIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const dummyReports = [
  {
    id: 1,
    name: "Monthly Consumption Report",
    type: "Consumption",
    meterType: "ELECTRIC",
    generatedDate: "2025-01-07",
    period: "December 2024",
    status: "Ready",
    size: "2.4 MB",
    description: "Detailed electricity consumption analysis for all connected meters during December 2024.",
    totalMeters: 45,
    totalConsumption: "12,450 kWh",
    avgDaily: "401.6 kWh",
  },
  {
    id: 2,
    name: "Water Usage Summary",
    type: "Usage",
    meterType: "WATER",
    generatedDate: "2025-01-06",
    period: "Q4 2024",
    status: "Ready",
    size: "1.8 MB",
    description: "Quarterly water usage summary with consumption trends and anomaly detection.",
    totalMeters: 32,
    totalConsumption: "8,920 KL",
    avgDaily: "96.9 KL",
  },
  {
    id: 3,
    name: "Solar Generation Analysis",
    type: "Generation",
    meterType: "SOLAR",
    generatedDate: "2025-01-05",
    period: "2024 Annual",
    status: "Ready",
    size: "5.2 MB",
    description: "Annual solar power generation report with efficiency metrics and ROI analysis.",
    totalMeters: 18,
    totalConsumption: "156,780 kWh",
    avgDaily: "429.5 kWh",
  },
  {
    id: 4,
    name: "Gas Consumption Trends",
    type: "Consumption",
    meterType: "GAS",
    generatedDate: "2025-01-04",
    period: "November 2024",
    status: "Ready",
    size: "1.5 MB",
    description: "Gas consumption patterns and trend analysis for November 2024.",
    totalMeters: 28,
    totalConsumption: "4,560 m³",
    avgDaily: "152 m³",
  },
  {
    id: 5,
    name: "Device Health Report",
    type: "Maintenance",
    meterType: "ALL",
    generatedDate: "2025-01-03",
    period: "January 2025",
    status: "Processing",
    size: "-",
    description: "Comprehensive device health and maintenance status report.",
    totalMeters: 123,
    totalConsumption: "-",
    avgDaily: "-",
  },
  {
    id: 6,
    name: "Billing Summary Report",
    type: "Billing",
    meterType: "ELECTRIC",
    generatedDate: "2025-01-02",
    period: "December 2024",
    status: "Ready",
    size: "890 KB",
    description: "Monthly billing summary with payment status and revenue analysis.",
    totalMeters: 45,
    totalConsumption: "₹4,85,000",
    avgDaily: "₹15,645",
  },
];

const reportTypes = ["All", "Consumption", "Usage", "Generation", "Maintenance", "Billing"];
const meterTypes = ["All", "SOLAR", "GAS", "WATER", "ELECTRIC"];

const Reports = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterMeter, setFilterMeter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filteredReports = useMemo(() => {
    return dummyReports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.period.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "All" || report.type === filterType;
      const matchesMeter = filterMeter === "All" || report.meterType === filterMeter;
      return matchesSearch && matchesType && matchesMeter;
    });
  }, [search, filterType, filterMeter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMeterColor = (meterType) => {
    switch (meterType) {
      case "SOLAR":
        return "bg-amber-100 text-amber-700";
      case "GAS":
        return "bg-orange-100 text-orange-700";
      case "WATER":
        return "bg-blue-100 text-blue-700";
      case "ELECTRIC":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDownload = (report, e) => {
    if (e) e.stopPropagation();
    if (report.status !== "Ready") return;

    setToastMessage(`Downloading "${report.name}"...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePrint = (report) => {
    setToastMessage(`Preparing "${report.name}" for printing...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
            <p className="text-sm text-slate-500 mt-1">
              View and download system reports
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
            <DocumentTextIcon className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="px-4 py-6 md:p-6 space-y-6">


        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="relative w-full sm:w-auto">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all w-full sm:w-64"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${showFilters ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg transition ${viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-slate-200"
                  }`}
              >
                <TableCellsIcon className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"
                  }`}
              >
                <ChartBarIcon className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Report Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Meter Type</label>
                <select
                  value={filterMeter}
                  onChange={(e) => setFilterMeter(e.target.value)}
                  className="px-4 py-2 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {meterTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 text-left font-semibold">Report Name</th>
                    <th className="px-5 py-4 text-left font-semibold">Type</th>
                    <th className="px-5 py-4 text-left font-semibold">Meter</th>
                    <th className="px-5 py-4 text-left font-semibold">Period</th>
                    <th className="px-5 py-4 text-left font-semibold">Generated</th>
                    <th className="px-5 py-4 text-left font-semibold">Status</th>
                    <th className="px-5 py-4 text-left font-semibold">Size</th>
                    <th className="px-5 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 rounded-lg">
                            <DocumentTextIcon className="w-5 h-5 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-800">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{report.type}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getMeterColor(report.meterType)}`}>
                          {report.meterType}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{report.period}</td>
                      <td className="px-5 py-4 text-slate-600">{report.generatedDate}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{report.size}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReport(report);
                            }}
                            className="p-2 hover:bg-blue-100 rounded-lg transition"
                            title="View Report"
                          >
                            <EyeIcon className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => handleDownload(report, e)}
                            disabled={report.status !== "Ready"}
                            className="p-2 hover:bg-green-100 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Download"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4 text-green-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      <DocumentTextIcon className="w-6 h-6 text-slate-600" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mt-3">{report.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{report.period}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getMeterColor(report.meterType)}`}>
                      {report.meterType}
                    </span>
                    <span className="text-xs text-slate-400">{report.size}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReport(report);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      <EyeIcon className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={(e) => handleDownload(report, e)}
                      disabled={report.status !== "Ready"}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-sm font-medium transition"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <DocumentTextIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No reports found</p>
            </div>
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{selectedReport.name}</h2>
                  <p className="text-sm text-slate-500">{selectedReport.period}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <XMarkIcon className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Status and Info */}
                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getMeterColor(selectedReport.meterType)}`}>
                    {selectedReport.meterType}
                  </span>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                    {selectedReport.type}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
                  <p className="text-slate-600">{selectedReport.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">{selectedReport.totalMeters}</p>
                    <p className="text-sm text-slate-500">Total Meters</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">{selectedReport.totalConsumption}</p>
                    <p className="text-sm text-slate-500">Total</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-slate-800">{selectedReport.avgDaily}</p>
                    <p className="text-sm text-slate-500">Avg/Day</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Generated On</p>
                    <p className="font-medium text-slate-800">{selectedReport.generatedDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">File Size</p>
                    <p className="font-medium text-slate-800">{selectedReport.size}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => handlePrint(selectedReport)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
              >
                <PrinterIcon className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => handleDownload(selectedReport)}
                disabled={selectedReport.status !== "Ready"}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-sm font-medium transition"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slideUp z-50">
          <ArrowDownTrayIcon className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Reports;
