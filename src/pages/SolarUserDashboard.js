import React, { useState } from 'react';
import {
    SunIcon,
    BoltIcon,
    ArrowTrendingUpIcon,
    ArrowUpRightIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    ArrowsPointingOutIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, LineChart, Line
} from 'recharts';

const chartData = {
    Daily: [
        { time: '00:00', generated: 0, consumed: 120, exported: 0 },
        { time: '04:00', generated: 0, consumed: 100, exported: 0 },
        { time: '08:00', generated: 200, consumed: 150, exported: 50 },
        { time: '12:00', generated: 900, consumed: 300, exported: 600 },
        { time: '16:00', generated: 750, consumed: 350, exported: 400 },
        { time: '20:00', generated: 100, consumed: 400, exported: 0 },
    ],
    Weekly: [
        { time: 'Mon', generated: 4500, consumed: 3200, exported: 1300 },
        { time: 'Tue', generated: 5200, consumed: 3100, exported: 2100 },
        { time: 'Wed', generated: 4800, consumed: 3500, exported: 1300 },
        { time: 'Thu', generated: 3900, consumed: 3800, exported: 100 },
        { time: 'Fri', generated: 5500, consumed: 3000, exported: 2500 },
        { time: 'Sat', generated: 4200, consumed: 2800, exported: 1400 },
        { time: 'Sun', generated: 3800, consumed: 2500, exported: 1300 },
    ],
    Monthly: [
        { time: 'Week 1', generated: 32000, consumed: 22000, exported: 10000 },
        { time: 'Week 2', generated: 35000, consumed: 21000, exported: 14000 },
        { time: 'Week 3', generated: 28000, consumed: 24000, exported: 4000 },
        { time: 'Week 4', generated: 31000, consumed: 23000, exported: 8000 },
    ],
    Yearly: [
        { time: 'Jan', generated: 120000, consumed: 95000, exported: 25000 },
        { time: 'Feb', generated: 135000, consumed: 90000, exported: 45000 },
        { time: 'Mar', generated: 150000, consumed: 85000, exported: 65000 },
        { time: 'Apr', generated: 165000, consumed: 90000, exported: 75000 },
        { time: 'May', generated: 180000, consumed: 95000, exported: 85000 },
        { time: 'Jun', generated: 195000, consumed: 100000, exported: 95000 },
        { time: 'Jul', generated: 210000, consumed: 110000, exported: 100000 },
        { time: 'Aug', generated: 205000, consumed: 115000, exported: 90000 },
        { time: 'Sep', generated: 180000, consumed: 105000, exported: 75000 },
        { time: 'Oct', generated: 160000, consumed: 95000, exported: 65000 },
        { time: 'Nov', generated: 140000, consumed: 90000, exported: 50000 },
        { time: 'Dec', generated: 125000, consumed: 95000, exported: 30000 },
    ]
};

const alerts = [
    { id: 1, title: 'Rufftex, 25 OX Offline', desc: 'Commns', time: '20 mins ago', type: 'critical' },
    { id: 2, title: 'Fault in inverter #3', desc: 'Inverter Error', time: '40 mins ago', type: 'warning' },
    { id: 3, title: 'Ngtek, High Alert', desc: 'Fluctuating readings', time: '55 mins ago', type: 'info' },
    { id: 4, title: 'HasL, Battery Fault', desc: 'Disconnect Issue', time: '3 hours ago', type: 'info' },
    { id: 5, title: 'Thera, 90 Alert Offline', desc: 'String Issue', time: '5 hours ago', type: 'critical' },
    { id: 6, title: 'Tamsa Victe VesseSide...', desc: 'Large Flare side', time: '8 hours ago', type: 'critical' },
];

const SolarUserDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('Critical');
    const [timeRange, setTimeRange] = useState('Daily');
    const [maximizedChart, setMaximizedChart] = useState(null); // 'production' or 'distribution'

    const currentData = chartData[timeRange];

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#f8fafc] p-4 gap-4">
            {/* LEFT CONTENT */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">

                {/* STATS CARDS */}
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { title: 'TOTAL GENERATED', value: '6152.8', unit: 'kWh', desc: 'Solar plants in total', icon: SunIcon, color: 'text-orange-500', bg: 'bg-orange-50' },
                        { title: 'TOTAL CONSUMED (GRID)', value: '5021.6', unit: 'kWh', desc: 'Solar panels installed', icon: BoltIcon, color: 'text-green-500', bg: 'bg-green-50' },
                        { title: 'TOTAL CONSUMED (SOLAR)', value: '891.4', unit: 'kWh', desc: 'Solar consumed', icon: BoltIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { title: 'TOTAL EXPORTED', value: '2415.3', unit: 'kWh', desc: 'Solar power grid', icon: ArrowUpRightIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    ].map((stat) => (
                        <div key={stat.title} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group">
                            <h4 className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{stat.title}</h4>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                                <span className="text-xs font-bold text-slate-400">{stat.unit}</span>
                            </div>
                            <p className="mt-4 text-[10px] font-bold text-slate-400">{stat.desc}</p>
                            <div className={`absolute -right-2 -bottom-2 ${stat.bg} ${stat.color} p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                                <stat.icon className="w-12 h-12 rotate-[-15deg]" />
                            </div>
                            {stat.title === 'TOTAL GENERATED' && (
                                <div className="absolute right-3 top-10 text-yellow-400">
                                    <SunIcon className="w-10 h-10 fill-yellow-100" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CHARTS GRID */}
                <div className="grid grid-cols-2 gap-4">
                    {/* PRODUCTION CHART */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-base font-bold text-slate-700 tracking-tight">Production vs Consumption</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMaximizedChart('production')}
                                    className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
                                    title="Maximize"
                                >
                                    <ArrowsPointingOutIcon className="w-4 h-4" />
                                </button>
                                <div className="flex bg-slate-50 p-1 rounded-lg">
                                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all ${timeRange === range ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="generated" name="Generated" stroke="#fbbf24" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGen)" />
                                    <Area type="monotone" dataKey="consumed" name="Consumed" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCons)" />
                                    <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '10px' }} formatter={(value) => <span className="text-[9px] font-bold text-slate-500 ml-1 uppercase tracking-wider">{value}</span>} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ENERGY DISTRIBUTION CHART */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-base font-bold text-slate-700 tracking-tight">Energy Distribution</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setMaximizedChart('distribution')}
                                    className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
                                    title="Maximize"
                                >
                                    <ArrowsPointingOutIcon className="w-4 h-4" />
                                </button>
                                <div className="flex bg-slate-50 p-1 rounded-lg">
                                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-2 py-1 rounded-md text-[9px] font-bold transition-all ${timeRange === range ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={currentData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }} barGap={5}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Legend verticalAlign="top" align="center" height={40} iconType="rect" formatter={(value) => <span className="text-[9px] font-bold text-slate-500 ml-1 uppercase tracking-wider">{value}</span>} />
                                    <Bar dataKey="consumed" name="Consumed" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={10} />
                                    <Bar dataKey="exported" name="Exported" fill="#10b981" radius={[3, 3, 0, 0]} barSize={10} />
                                    <Bar dataKey="generated" name="Generated" fill="#fbbf24" radius={[3, 3, 0, 0]} barSize={10} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* MAXIMIZED CHART MODAL */}
                {maximizedChart && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 sm:p-12">
                        <div className="bg-white w-full max-w-6xl h-[80vh] rounded-[2rem] shadow-2xl flex flex-col p-8 relative animate-in fade-in zoom-in duration-300">
                            <button
                                onClick={() => setMaximizedChart(null)}
                                className="absolute right-8 top-8 p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-500 transition-all z-10"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>

                            <div className="mb-10 flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                        {maximizedChart === 'production' ? 'Production vs Consumption' : 'Energy Distribution'}
                                    </h2>
                                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Detailed Analytics View</p>
                                </div>

                                <div className="flex bg-slate-100 p-1.5 rounded-xl mb-1">
                                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${timeRange === range ? 'bg-white text-orange-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    {maximizedChart === 'production' ? (
                                        <AreaChart data={currentData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                                            <defs>
                                                <linearGradient id="colorGenMax" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorConsMax" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} />
                                            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '20px' }} />
                                            <Area type="monotone" dataKey="generated" name="Generated" stroke="#fbbf24" strokeWidth={5} fillOpacity={1} fill="url(#colorGenMax)" />
                                            <Area type="monotone" dataKey="consumed" name="Consumed" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorConsMax)" />
                                            <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={12} wrapperStyle={{ paddingTop: '40px' }} formatter={(value) => <span className="text-sm font-black text-slate-600 ml-2 uppercase tracking-widest">{value}</span>} />
                                        </AreaChart>
                                    ) : (
                                        <BarChart data={currentData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }} barGap={12}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} />
                                            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '20px' }} />
                                            <Legend verticalAlign="top" align="center" height={80} iconType="rect" iconSize={12} formatter={(value) => <span className="text-sm font-black text-slate-600 ml-2 uppercase tracking-widest">{value}</span>} />
                                            <Bar dataKey="consumed" name="Consumed" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                                            <Bar dataKey="exported" name="Exported" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                                            <Bar dataKey="generated" name="Generated" fill="#fbbf24" radius={[8, 8, 0, 0]} barSize={40} />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* RIGHT ALERTS PANEL */}
            <div className="w-64 bg-white rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden h-full shrink-0">
                <div className="p-4 border-b border-slate-50">
                    <h3 className="font-black text-slate-800 tracking-tight text-sm">Alerts/Alarms</h3>
                    <div className="mt-3 relative">
                        <MagnifyingGlassIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border-none rounded-lg text-[10px] font-bold focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-1 mt-4">
                        {['Critical', 'Warning', 'Info'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-black tracking-tight transition-all ${activeFilter === f ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="group cursor-pointer">
                            <div className="flex items-start gap-3">
                                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse ${alert.type === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                    alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-black text-slate-700 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{alert.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{alert.desc}</p>
                                    <p className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-widest">{alert.time}</p>
                                </div>
                            </div>
                            <div className="mt-4 border-b border-slate-50 last:border-0" />
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-slate-50 flex justify-between items-center shrink-0">
                    <button className="p-1 hover:bg-white rounded-lg text-slate-400 transition-all">
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(n => <span key={n} className={`text-[10px] font-black ${n === 1 ? 'text-blue-600' : 'text-slate-300'}`}>{n}</span>)}
                    </div>
                    <button className="p-1 hover:bg-white rounded-lg text-slate-400 transition-all">
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SolarUserDashboard;
