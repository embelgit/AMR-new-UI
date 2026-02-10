import { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import LiveMap from "../components/LiveMap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label
} from "recharts";
import {
  UserIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  ArrowRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  SunIcon,
  BeakerIcon,
  FireIcon,
  BoltIcon,
  ArrowsPointingOutIcon
} from "@heroicons/react/24/outline";

// Mock Data
const meterStatsBase = [
  { name: 'Active', value: 70, color: '#10b981' }, // Emerald
  { name: 'Inactive', value: 35, color: '#f59e0b' }, // Amber
  { name: 'Deactive', value: 15, color: '#ef4444' }, // Red
];

// Mock Meter Data for Filtering Logic
const dashboardUsers = [
  { id: 1, name: "S", role: 3.30, sites: 12.25, status: 0.75, meterType: "SOLAR" },
  { id: 2, name: "M", role: 3.30, sites: 13.20, status: 0.00, meterType: "WATER" },
  { id: 3, name: "XL", role: 3.30, sites: 10.15, status: 0.05, meterType: "GAS" },
  { id: 4, name: "TL", role: 3.30, sites: 10.76, status: 0.85, meterType: "ELECTRIC" },
  { id: 5, name: "RT", role: 3.30, sites: 0.97, status: 0.03, meterType: "SOLAR" },
  { id: 6, name: "BL", role: 3.30, sites: 0.69, status: 0.66, meterType: "WATER" },
  { id: 7, name: "QC", role: 3.30, sites: 1.38, status: 5.27, meterType: "GAS" },
];

const mapLocations = [
  { id: 1, name: "Site A", lat: 28.6139, lng: 77.2090, role: "ADMIN", active: true, meterType: "SOLAR" },
  { id: 2, name: "Site B", lat: 19.0760, lng: 72.8777, role: "USER", active: false, meterType: "GAS" },
  { id: 3, name: "Site C", lat: 12.9716, lng: 77.5946, role: "USER", active: true, meterType: "WATER" },
  { id: 4, name: "Site D", lat: 17.3850, lng: 78.4867, role: "USER", active: true, meterType: "ELECTRIC" },
];

// Mock Data for Consumption Graph
const consumptionDataDay = [
  { day: '00:00', value: 0.2 }, { day: '04:00', value: 0.5 }, { day: '08:00', value: 1.2 },
  { day: '12:00', value: 2.1 }, { day: '16:00', value: 1.8 }, { day: '20:00', value: 0.9 },
];
const consumptionDataWeek = [
  { day: 'Mon', value: 10 }, { day: 'Tue', value: 15 }, { day: 'Wed', value: 12 },
  { day: 'Thu', value: 18 }, { day: 'Fri', value: 22 }, { day: 'Sat', value: 14 }, { day: 'Sun', value: 8 },
];
const consumptionDataMonth = [
  { day: 'Week 1', value: 50 }, { day: 'Week 2', value: 80 }, { day: 'Week 3', value: 60 }, { day: 'Week 4', value: 90 },
];
const consumptionDataYear = [
  { day: 'Jan', value: 200 }, { day: 'Feb', value: 300 }, { day: 'Mar', value: 250 }, { day: 'Apr', value: 400 },
  { day: 'May', value: 350 }, { day: 'Jun', value: 500 }, { day: 'Jul', value: 450 }, { day: 'Aug', value: 550 },
  { day: 'Sep', value: 500 }, { day: 'Oct', value: 600 }, { day: 'Nov', value: 550 }, { day: 'Dec', value: 650 },
];

const alerts = [
  { id: 1, title: "Rufftex, 25 OX Offline", subtitle: "Wonning", type: "offline", count: 1 },
  { id: 2, title: "Ngtek, High Alert", subtitle: "Fluctuating Readings", type: "high", count: 1 },
  { id: 3, title: "HasL, Using Alert", subtitle: "Commn: 00", type: "info", count: 1 },
  { id: 4, title: "Thera, 90 Alert Offline", subtitle: "Tarmer: 1X", type: "offline", count: 1 },
  { id: 5, title: "Tamsa Vicite VesseSide", subtitle: "Commn: 15", type: "warning", count: 1 },
  { id: 6, title: "Metto 35 Alert Warning", subtitle: "Large F brwade", type: "warning", count: 1 },
  { id: 7, title: "Thane; Hugo Alert", subtitle: "Commn: 10", type: "high", count: 1 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { selectedMeterType, setSelectedMeterType } = useOutletContext();
  const [selectedConsumptionPeriod, setSelectedConsumptionPeriod] = useState('1M');
  const [fullScreenWidget, setFullScreenWidget] = useState(null); // 'METERS' | 'CONSUMPTION' | null
  const [searchTerm, setSearchTerm] = useState("");

  const currentConsumptionData = useMemo(() => {
    switch (selectedConsumptionPeriod) {
      case '1D': return consumptionDataDay;
      case '1W': return consumptionDataWeek;
      case '1M': return consumptionDataMonth;
      case '1Y': return consumptionDataYear;
      default: return consumptionDataMonth;
    }
  }, [selectedConsumptionPeriod]);

  // Global Filtering Logic
  const filteredUsers = useMemo(() => {
    let users = dashboardUsers;
    const currentRole = localStorage.getItem('role');
    const assignedMeters = JSON.parse(localStorage.getItem('assignedMeters') || '[]');

    if (currentRole === 'ADMIN') {
      users = users.filter(u => assignedMeters.includes(u.meterType));
    }

    if (selectedMeterType) {
      users = users.filter(u => u.meterType === selectedMeterType);
    }
    if (searchTerm) {
      users = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return users;
  }, [selectedMeterType, searchTerm]);

  const filteredMapLocations = useMemo(() => {
    if (!selectedMeterType) return mapLocations;
    return mapLocations.filter(m => m.meterType === selectedMeterType);
  }, [selectedMeterType]);

  const stats = useMemo(() => {
    const currentRole = localStorage.getItem('role');
    const assignedMeters = JSON.parse(localStorage.getItem('assignedMeters') || '[]');

    let baseTotal = 120;
    let baseData = meterStatsBase;

    if (currentRole === 'ADMIN') {
      // If Admin, the "Total" should only be for assigned types
      // For demonstration, we'll scale it based on number of assigned types
      const ratio = assignedMeters.length / 4;
      baseTotal = Math.round(120 * ratio);
      baseData = meterStatsBase.map(s => ({ ...s, value: Math.round(s.value * ratio) }));
    }

    if (!selectedMeterType) return { total: baseTotal, data: baseData };

    // Simulate different stats for different types
    const multiplier = selectedMeterType === 'SOLAR' ? 0.4 : selectedMeterType === 'WATER' ? 0.35 : 0.25;
    return {
      total: Math.round(120 * multiplier),
      data: meterStatsBase.map(s => ({ ...s, value: Math.round(s.value * multiplier) }))
    };
  }, [selectedMeterType]);

  const filterIcon = useMemo(() => {
    switch (selectedMeterType) {
      case 'SOLAR': return <SunIcon className="w-4 h-4 text-amber-500" />;
      case 'WATER': return <BeakerIcon className="w-4 h-4 text-blue-500" />;
      case 'GAS': return <FireIcon className="w-4 h-4 text-orange-500" />;
      case 'ELECTRIC': return <BoltIcon className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  }, [selectedMeterType]);

  // Full Screen Modal Component
  const FullScreenModal = () => {
    if (!fullScreenWidget) return null;

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setFullScreenWidget(null)}
        />
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-800">
              {fullScreenWidget === 'METERS'
                ? (selectedMeterType ? `Total ${selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Meters` : 'Total Meters Distribution')
                : fullScreenWidget === 'CONSUMPTION'
                  ? 'Consumption Trends Over Time'
                  : (selectedMeterType ? `${selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Site Locations` : 'Global Site Map')}
            </h2>
            <button
              onClick={() => setFullScreenWidget(null)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 p-10 overflow-hidden">
            {fullScreenWidget === 'METERS' ? (
              <div className="w-full h-full flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 w-full h-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{ fontSize: '14px', borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                      />
                      <Pie
                        data={stats.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Label
                          value={stats.total}
                          position="center"
                          className="text-4xl font-black fill-slate-800"
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-4 min-w-[240px]">
                  {stats.data.map((stat) => (
                    <div key={stat.name} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: stat.color }}></span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.name}</span>
                        <span className="text-2xl font-black text-slate-900">{selectedMeterType ? stat.value : `${stat.value}%`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : fullScreenWidget === 'CONSUMPTION' ? (
              <div className="w-full h-full flex flex-col gap-6">
                <div className="flex justify-end gap-2 bg-slate-100 p-1.5 rounded-xl self-end">
                  {['1D', '1W', '1M', '1Y'].map(p => (
                    <button
                      key={p}
                      onClick={() => setSelectedConsumptionPeriod(p)}
                      className={`text-xs px-4 py-2 rounded-lg transition-all ${selectedConsumptionPeriod === p ? 'bg-white text-blue-600 shadow-md font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentConsumptionData}>
                      <defs>
                        <linearGradient id="fullColorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                      <Tooltip
                        contentStyle={{ fontSize: '14px', borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#fullColorValue)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                <LiveMap users={filteredMapLocations} />
              </div>
            )}
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center italic text-sm text-slate-400 font-medium">
            Analysis Date: 20 Jan 2026 • Real-time Monitoring Active
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-[1600px] mx-auto w-full">
      <FullScreenModal />

      {selectedMeterType && (
        <div className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100 animate-slide-down">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-50 rounded-md">
              {filterIcon}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                {selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Dashboard
              </h2>
              <p className="text-[10px] text-slate-500">Showing filtered results for {selectedMeterType.toLowerCase()} infrastructure</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedMeterType(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold transition-colors border border-slate-100"
          >
            <XMarkIcon className="w-3 h-3" />
            Clear Filter
          </button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4 flex-1 overflow-hidden">

        {/* LEFT COLUMN (Widgets + List + Map) */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4 overflow-y-auto pr-1">

          {/* ROW 1: Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

            {/* Widget 1: Total Meters */}
            <div className="flex flex-col gap-1.5 h-full">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-[130px] group relative">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xs font-bold text-slate-800">
                    {selectedMeterType ? `Total ${selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Meters` : 'Total Meters'}
                  </h3>
                  <button
                    onClick={() => setFullScreenWidget('METERS')}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-50 rounded-lg transition-all text-slate-300 hover:text-blue-500"
                    title="Maximize Chart"
                  >
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{ fontSize: '10px', borderRadius: '6px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293a', fontWeight: 'bold' }}
                      />
                      <Pie
                        data={stats.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={38}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {stats.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Label
                          value={stats.total}
                          position="center"
                          className="text-lg font-bold fill-slate-800"
                        />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                {stats.data.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stat.color }}></span>
                    <span className="text-[9px] font-bold text-slate-600 underline decoration-slate-200 underline-offset-2">{stat.name}</span>
                    <span className="text-[9px] font-black text-slate-800">{selectedMeterType ? stat.value : `${stat.value}%`}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Total Users/Admin */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-[130px]">
              <div>
                <h3 className="text-xs font-bold text-slate-800">Total Users/Admin</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {filteredUsers.filter(u => u.status > 0).length} / {filteredUsers.filter(u => u.role > 3).length || 2}
                  </span>
                  <div className="flex gap-4 mt-0.5 text-[10px] text-slate-400">
                    <span className="ml-0.5">Users</span>
                    <span className="ml-4">Admin</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 opacity-5">
                <UserIcon className="w-14 h-14" />
              </div>
            </div>

            {/* Widget 3: Total Consumption */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-[130px] group relative">
              <div className="flex justify-between items-start">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Total Consumption</h3>
                    <p className="text-sm font-bold text-slate-800 mt-1 flex items-baseline gap-1">
                      {selectedMeterType ? (Math.random() * 0.5 + 0.2).toFixed(2) : '1.53'} <span className="text-[10px] text-slate-500 font-medium">MWh</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setFullScreenWidget('CONSUMPTION')}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-50 rounded-lg transition-all text-slate-300 hover:text-blue-500"
                      title="Maximize Chart"
                    >
                      <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex gap-0.5 bg-slate-100 p-0.5 rounded">
                      {['1D', '1W', '1M', '1Y'].map(p => (
                        <button
                          key={p}
                          onClick={() => setSelectedConsumptionPeriod(p)}
                          className={`text-[8px] px-1 py-0.5 rounded ${selectedConsumptionPeriod === p ? 'bg-white text-[#1e3a8a] shadow-sm font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[40px] mt-0.5 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentConsumptionData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ fontSize: '10px', borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#1e3a8a' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={1.5}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                    <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center text-[8px] text-slate-400 px-1 mt-0.5">
                <span>{selectedConsumptionPeriod === '1D' ? 'Today' : selectedConsumptionPeriod === '1M' ? 'This Month' : 'This Year'}</span>
                <span>{selectedMeterType ? (Math.random() * 0.5 + 0.2).toFixed(2) : '1.53'} MWh</span>
              </div>
            </div>

            {/* Widget 4: Active Issues */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 h-[130px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xs font-bold text-slate-800 mb-1">Active Issues</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span className="text-[10px] text-slate-600 font-medium">Meters Offline</span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {selectedMeterType ? Math.floor(Math.random() * 3) + 1 : 6}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span className="text-[10px] text-slate-600 font-medium">High Usage</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="bg-red-100 text-red-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {selectedMeterType ? Math.floor(Math.random() * 2) + 1 : 5}
                    </span>
                    <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {selectedMeterType ? Math.floor(Math.random() * 4) + 1 : 8}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    <span className="text-[10px] text-slate-600 font-medium">Faulty Update</span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {selectedMeterType ? Math.floor(Math.random() * 2) : 2}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: Admin/Users List + Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-[350px]">

            {/* List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">
                  {selectedMeterType ? `${selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Admin/Users` : 'Admin/Users List'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="pl-6 pr-2 py-1 bg-slate-50 border-none rounded-md text-[10px] w-32 focus:ring-0"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-600 flex items-center gap-1">
                    10 / page <ArrowRightIcon className="w-2 h-2" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/50 text-slate-500 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">Name</th>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">Role</th>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">Meter</th>
                      <th className="px-4 py-2 font-bold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map((u, i) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-slate-700">{u.name}</td>
                        <td className="px-4 py-2.5 text-slate-500">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role > 3 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'}`}>
                            {u.role > 3 ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-500">
                          <span className="flex items-center gap-1 capitalize font-bold text-[10px]">
                            {u.meterType === 'ELECTRIC' ? 'Energy' : u.meterType.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status > 0.5 ? 'bg-green-100 text-green-600' :
                            u.status > 0.1 ? 'bg-orange-100 text-orange-600' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                            {u.status > 0.5 ? 'Active' : u.status > 0.1 ? 'Inactive' : 'Deactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-4 py-10 text-center text-slate-400">No users found for this filter.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination Mock */}
              <div className="p-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-500">
                <span>{filteredUsers.length} Results</span>
                <div className="flex gap-1">
                  <button className="px-1 font-bold text-slate-700">1</button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm flex items-center gap-1.5">
                <MapPinIcon className="w-3 h-3 text-red-500" />
                {selectedMeterType ? `${selectedMeterType.charAt(0) + selectedMeterType.slice(1).toLowerCase()} Sites` : 'All Sites'}
              </div>
              <button
                onClick={() => setFullScreenWidget('MAP')}
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 p-1 bg-white/90 backdrop-blur rounded shadow-sm transition-all text-slate-400 hover:text-blue-500"
                title="Maximize Map"
              >
                <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 min-h-[300px]">
                <LiveMap users={filteredMapLocations} />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                20 Jan 2026 {selectedMeterType ? (Math.random() * 0.5 + 0.2).toFixed(2) : '1.53'} MWh
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (Alerts) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col h-full overflow-hidden bg-white rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="p-4 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-800">Alerts/Alarms</h3>
            <div className="mt-2 relative">
              <MagnifyingGlassIcon className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search alert..." className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border-none rounded-md text-xs focus:ring-0" />
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs font-bold text-slate-800">Filter</span>
              <FunnelIcon className="w-3 h-3 text-orange-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex items-start gap-2 hover:bg-slate-100 transition cursor-pointer">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alert.type === 'offline' ? 'bg-orange-500' :
                  alert.type === 'high' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-700 truncate">{alert.title}</h4>
                  <p className="text-[10px] text-slate-500">{alert.subtitle}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-orange-200 text-orange-500 text-[10px] font-bold">
                    <ExclamationTriangleIcon className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-slate-50 flex justify-center text-[10px] text-slate-500 bg-slate-50/30">
            <div className="flex gap-2 items-center">
              <button className="px-1 text-slate-400">&lt;</button>
              <button className="font-bold text-slate-700">1</button>
              <button>2</button>
              <button>3</button>
              <span className="text-slate-300">...</span>
              <button>6</button>
              <button className="px-1 text-slate-400">&gt;</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
