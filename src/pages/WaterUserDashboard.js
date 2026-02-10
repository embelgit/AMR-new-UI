import React, { useState } from 'react';
import {
    BeakerIcon,
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
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

const chartData = {
    Daily: [
        { time: '00:00', consumption: 45 },
        { time: '04:00', consumption: 30 },
        { time: '08:00', consumption: 150 },
        { time: '12:00', consumption: 220 },
        { time: '16:00', consumption: 180 },
        { time: '20:00', consumption: 140 },
    ],
    Weekly: [
        { time: 'Mon', consumption: 850 },
        { time: 'Tue', consumption: 920 },
        { time: 'Wed', consumption: 780 },
        { time: 'Thu', consumption: 950 },
        { time: 'Fri', consumption: 1100 },
        { time: 'Sat', consumption: 1250 },
        { time: 'Sun', consumption: 900 },
    ],
    Monthly: [
        { time: 'Week 1', consumption: 6200 },
        { time: 'Week 2', consumption: 5800 },
        { time: 'Week 3', consumption: 7100 },
        { time: 'Week 4', consumption: 6500 },
    ],
    Yearly: [
        { time: 'Jan', consumption: 25000 },
        { time: 'Feb', consumption: 28000 },
        { time: 'Mar', consumption: 32000 },
        { time: 'Apr', consumption: 30000 },
        { time: 'May', consumption: 35000 },
        { time: 'Jun', consumption: 38000 },
        { time: 'Jul', consumption: 41000 },
        { time: 'Aug', consumption: 39000 },
        { time: 'Sep', consumption: 36000 },
        { time: 'Oct', consumption: 33000 },
        { time: 'Nov', consumption: 31000 },
        { time: 'Dec', consumption: 29000 },
    ]
};

const alerts = [
    { id: 1, title: 'Leak Detected - Zone 3', desc: 'Unusual flow during night', time: '15 mins ago', type: 'critical' },
    { id: 2, title: 'Low Pressure Alert', desc: 'Main supply fluctuating', time: '45 mins ago', type: 'warning' },
    { id: 3, title: 'Meter 04-X Offline', desc: 'Commns Issue', time: '1 hour ago', type: 'critical' },
    { id: 4, title: 'High Usage Warning', desc: 'Exceeded daily threshold', time: '3 hours ago', type: 'info' },
    { id: 5, title: 'Backflow Detected', desc: 'Unit 12 Valve Issue', time: '5 hours ago', type: 'warning' },
    { id: 6, title: 'Sensor Calibration', desc: 'Scheduled maintenance', time: '8 hours ago', type: 'info' },
];

const WaterUserDashboard = () => {
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
                        { title: 'TOTAL CONSUMPTION', value: '42.8', unit: 'm³', trend: '+12.5%', desc: 'Total volume used', icon: BeakerIcon, color: 'text-blue-500', bg: 'bg-blue-50', bgAsset: '/assets/meters/water_meter.png' },
                        { title: 'TODAYS CONSUMPTION', value: '450', unit: 'Liters', desc: 'Daily water intake', icon: CalendarIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { title: 'LAST READING', value: '1.24', unit: 'm³/h', desc: '2026-01-21 16:10', icon: ClockIcon, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { title: 'LAST MONTH', value: '15.2', unit: 'm³', desc: 'Previous cycle total', icon: ArrowTrendingUpIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
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
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">Total Consumption Trend</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time water flow analysis</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMaximizedChart(true)}
                                className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                                title="Maximize"
                            >
                                <ArrowsPointingOutIcon className="w-4 h-4" />
                            </button>
                            <div className="flex bg-slate-50 p-1 rounded-lg">
                                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${timeRange === range ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
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
                                    <linearGradient id="waterFlow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                                    formatter={(value) => [`${value} ${timeRange === 'Daily' ? 'L' : 'm³'}`, 'Consumption']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="consumption"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#waterFlow)"
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
                    <h3 className="font-black text-slate-800 tracking-tight text-sm uppercase">Alerts & Alarms</h3>
                    <div className="mt-4 relative">
                        <MagnifyingGlassIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Find alert..."
                            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-1 mt-4">
                        {['All', 'Critical', 'Warning'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black tracking-tight transition-all ${activeFilter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
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
                                    <h4 className="text-[11px] font-black text-slate-700 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{alert.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 leading-tight">{alert.desc}</p>
                                    <p className="text-[9px] font-black text-slate-300 mt-1 uppercase tracking-widest">{alert.time}</p>
                                </div>
                            </div>
                            <div className="mt-4 border-b border-slate-50 last:border-0" />
                        </div>
                    ))}
                    {alerts.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center opacity-40 py-20">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                <ClockIcon className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-[10px] font-bold text-slate-500">No active alerts</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-50 flex justify-between items-center border-t border-slate-100">
                    <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 transition-all border border-transparent hover:border-slate-200">
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2">
                        {[1, 2, 3].map(n => <span key={n} className={`text-[10px] font-black cursor-pointer transition-colors ${n === 1 ? 'text-blue-600' : 'text-slate-300 hover:text-slate-500'}`}>{n}</span>)}
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
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Detailed Consumption Analysis</h2>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mt-2">Historical water flow usage pattern</p>
                            </div>

                            <div className="flex bg-slate-100 p-2 rounded-2xl mb-1 shadow-inner">
                                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all ${timeRange === range ? 'bg-white text-blue-600 shadow-md transform scale-105' : 'text-slate-400 hover:text-slate-600'}`}
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
                                        <linearGradient id="waterFlowMax" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dy={15} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#94a3b8', fontWeight: 600 }} dx={-15} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '24px' }}
                                        formatter={(value) => [`${value} ${timeRange === 'Daily' ? 'L' : 'm³'}`, 'Total Consumption']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="#3b82f6"
                                        strokeWidth={6}
                                        fillOpacity={1}
                                        fill="url(#waterFlowMax)"
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

export default WaterUserDashboard;
