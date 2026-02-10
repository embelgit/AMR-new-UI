import React, { useState } from 'react';
import {
    BoltIcon,
    CalendarIcon,
    ClockIcon,
    ArrowTrendingUpIcon,
    ArrowsPointingOutIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

const chartData = {
    Daily: [
        { time: '00:00', consumption: 80 },
        { time: '04:00', consumption: 65 },
        { time: '08:00', consumption: 210 },
        { time: '12:00', consumption: 350 },
        { time: '16:00', consumption: 290 },
        { time: '20:00', consumption: 180 },
    ],
    Weekly: [
        { time: 'Mon', consumption: 1200 },
        { time: 'Tue', consumption: 1350 },
        { time: 'Wed', consumption: 1100 },
        { time: 'Thu', consumption: 1450 },
        { time: 'Fri', consumption: 1600 },
        { time: 'Sat', consumption: 950 },
        { time: 'Sun', consumption: 800 },
    ],
    Monthly: [
        { time: 'Week 1', consumption: 5500 },
        { time: 'Week 2', consumption: 5200 },
        { time: 'Week 3', consumption: 6100 },
        { time: 'Week 4', consumption: 5800 },
    ],
    Yearly: [
        { time: 'Jan', consumption: 22000 },
        { time: 'Feb', consumption: 21500 },
        { time: 'Mar', consumption: 24000 },
        { time: 'Apr', consumption: 23500 },
        { time: 'May', consumption: 25000 },
        { time: 'Jun', consumption: 27000 },
        { time: 'Jul', consumption: 28500 },
        { time: 'Aug', consumption: 29000 },
        { time: 'Sep', consumption: 26500 },
        { time: 'Oct', consumption: 24500 },
        { time: 'Nov', consumption: 23000 },
        { time: 'Dec', consumption: 21000 },
    ]
};

const alerts = [
    { id: 1, title: 'Voltage Spike', desc: 'Phase 2 imbalance detected', time: '12 mins ago', type: 'critical' },
    { id: 2, title: 'Gateway Unreachable', desc: 'Sync failed for 5 mins', time: '35 mins ago', type: 'warning' },
    { id: 3, title: 'High Load Alert', desc: 'Approaching peak limit', time: '1 hour ago', type: 'info' },
    { id: 4, title: 'Inverter Fault', desc: 'Internal error code 44', time: '4 hours ago', type: 'critical' },
    { id: 5, title: 'Frequency Variation', desc: 'Normal range exceeded', time: '7 hours ago', type: 'warning' },
];

const EnergyUserDashboard = () => {
    const [timeRange, setTimeRange] = useState('Daily');
    const [maximizedChart, setMaximizedChart] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    const currentData = chartData[timeRange];

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#f8fafc] p-4 gap-4 font-sans">
            {/* LEFT CONTENT AREA */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">

                {/* 4 STATS GRID */}
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { title: 'TOTAL CONSUMPTION', value: '4562.8', unit: 'kWh', trend: '+8.2%', desc: 'Total energy drawn', icon: BoltIcon, color: 'text-yellow-500', bg: 'bg-yellow-50', bgAsset: '/assets/meters/energy_meter.png' },
                        { title: 'TODAYS CONSUMPTION', value: '18.4', unit: 'kWh', desc: 'Usage last 24h', icon: CalendarIcon, color: 'text-green-500', bg: 'bg-green-50' },
                        { title: 'LAST READING', value: '4.2', unit: 'kW', desc: '2026-01-21 16:14', icon: ClockIcon, color: 'text-red-500', bg: 'bg-red-50' },
                        { title: 'LAST MONTH', value: '584.2', unit: 'kWh', desc: 'Previous billing period', icon: ArrowTrendingUpIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{stat.title}</h4>
                                </div>
                                <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                                    <span className="text-xl font-black text-slate-800">{stat.value}</span>
                                    <span className="text-[10px] font-bold text-slate-400">{stat.unit}</span>
                                    {stat.trend && (
                                        <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                                            <ArrowTrendingUpIcon className="w-2.5 h-2.5" />
                                            {stat.trend}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 text-[10px] font-bold text-slate-400">{stat.desc}</p>
                            </div>
                            {!stat.bgAsset && (
                                <div className={`absolute -right-2 -bottom-2 ${stat.bg} ${stat.color} p-4 rounded-full opacity-10 group-hover:opacity-100 group-hover:rotate-0 rotate-[-15deg] transition-all duration-500`}>
                                    <stat.icon className="w-12 h-12" />
                                </div>
                            )}
                            {stat.bgAsset && (
                                <img
                                    src={stat.bgAsset}
                                    alt="meter-bg"
                                    className="absolute right-2 bottom-2 w-24 h-24 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 pointer-events-none object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* LARGE LINE CHART AREA */}
                <div className="flex-1 min-h-[400px] bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative group">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Electrical Load Profile</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time power consumption analysis</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMaximizedChart(true)}
                                className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-green-500 transition-colors"
                                title="Maximize"
                            >
                                <ArrowsPointingOutIcon className="w-4 h-4" />
                            </button>
                            <div className="flex bg-slate-50 p-1 rounded-lg">
                                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${timeRange === range ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-0 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="energyLink" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                                    formatter={(value) => [`${value} kWh`, 'Energy Usage']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="consumption"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#energyLink)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* RIGHT ALERTS PANEL */}
            <div className="w-72 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden h-full">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="font-black text-slate-800 tracking-tight text-sm uppercase">Grid Alerts</h3>
                    <div className="mt-4 relative">
                        <MagnifyingGlassIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Find alert..."
                            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-1 mt-4">
                        {['All', 'Critical', 'Warning'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black tracking-tight transition-all ${activeFilter === f ? 'bg-green-600 text-white shadow-md' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
                    {alerts.filter(a => activeFilter === 'All' || a.type === activeFilter.toLowerCase()).map((alert) => (
                        <div key={alert.id} className="group cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg shrink-0 ${alert.type === 'critical' ? 'bg-red-50 text-red-500' : alert.type === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                                    <ExclamationTriangleIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[11px] font-black text-slate-700 truncate group-hover:text-green-600 transition-colors uppercase tracking-tight">{alert.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 leading-tight">{alert.desc}</p>
                                    <p className="text-[9px] font-black text-slate-300 mt-1 uppercase tracking-widest">{alert.time}</p>
                                </div>
                            </div>
                            <div className="mt-4 border-b border-slate-50 last:border-0" />
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-slate-50 flex justify-between items-center border-t border-slate-100">
                    <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 transition-all border border-transparent hover:border-slate-200">
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(n => <span key={n} className={`text-[10px] font-black cursor-pointer transition-colors ${n === 1 ? 'text-green-600' : 'text-slate-300 hover:text-slate-500'}`}>{n}</span>)}
                    </div>
                    <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 transition-all border border-transparent hover:border-slate-200">
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* FULL SCREEN CHART MODAL */}
            {maximizedChart && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6 sm:p-12">
                    <div className="bg-white w-full max-w-6xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col p-10 relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setMaximizedChart(false)}
                            className="absolute right-10 top-10 p-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-500 transition-all z-10 shadow-sm"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="mb-12 flex justify-between items-end">
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Energy Usage Insights</h2>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mt-2">Comprehensive power consumption history</p>
                            </div>

                            <div className="flex bg-slate-100 p-2 rounded-2xl mb-1 shadow-inner">
                                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${timeRange === range ? 'bg-white text-green-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={currentData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                                    <defs>
                                        <linearGradient id="energyFlowMax" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dx={-15} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '24px' }}
                                        formatter={(value) => [`${value} kWh`, 'Total Energy Usage']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="#22c55e"
                                        strokeWidth={6}
                                        fillOpacity={1}
                                        fill="url(#energyFlowMax)"
                                        animationDuration={1500}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        iconSize={10}
                                        wrapperStyle={{ paddingTop: '50px' }}
                                        formatter={(value) => <span className="text-sm font-black text-slate-600 ml-2 uppercase tracking-[0.1em]">{value}</span>}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnergyUserDashboard;
