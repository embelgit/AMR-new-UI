
import React, { useState } from "react";
import {
    ArrowLeftIcon,
    CalendarDaysIcon,
    Cog6ToothIcon,
    PlayCircleIcon,
    ClockIcon,
    DocumentChartBarIcon,
    WrenchScrewdriverIcon,
    Battery50Icon,
    BoltIcon
} from "@heroicons/react/24/outline";

// Reusable Circular Gauge (Keeping for Electric meters if needed)
const CircularGauge = ({ value, max, label, unit, color }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative min-h-[160px]">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                    <circle cx="64" cy="64" r={radius} stroke={color} strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-slate-800">{value}</span>
                    {unit && <span className="text-xs text-slate-400">{unit}</span>}
                </div>
            </div>
        </div>
    );
};

// Enhanced Tank Component
const TankWidget = ({ name, percentage, capacity = 3000, color = "bg-blue-500" }) => {
    const currentVolume = Math.round((percentage / 100) * capacity);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-slate-700 mb-2 z-10">{name}</h3>

            {/* Tank Container */}
            <div className="relative w-32 h-40 border-2 border-slate-300 rounded-lg bg-slate-50 overflow-hidden mb-2 z-10">
                {/* Liquid */}
                <div
                    className={`absolute bottom-0 w-full transition-all duration-1000 ease-in-out ${color} opacity-90`}
                    style={{ height: `${percentage}%` }}
                >
                    {/* Wave Top */}
                    <div className="absolute top-0 w-[200%] h-3 bg-white/30 animate-wave"></div>
                </div>

                {/* Level Markers */}
                <div className="absolute right-0 top-0 bottom-0 w-full flex flex-col justify-between py-2 px-1 pointer-events-none">
                    {[100, 75, 50, 25].map(m => (
                        <div key={m} className="w-full border-t border-slate-400/30 text-[8px] text-right pr-0.5 text-slate-400">{m}%</div>
                    ))}
                </div>

                {/* Percentage Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 px-2 py-1 rounded text-lg font-bold text-slate-800 shadow-sm backdrop-blur-sm z-20">
                        {percentage}%
                    </span>
                </div>
            </div>

            {/* Volume Stats */}
            <div className="text-center z-10">
                <p className="text-sm font-bold text-slate-700">{currentVolume} L</p>
                <p className="text-xs text-slate-400">of {capacity} L</p>
            </div>
        </div>
    );
};

const MeterDetails = ({ meter, onBack }) => {
    const [activeTab, setActiveTab] = useState("Live");
    const [consumptionView, setConsumptionView] = useState("Week");

    // Dynamic State for Electric Data
    const [electricData, setElectricData] = useState({
        power: 0.38,
        voltage: 231,
        current: 0.775,
        pf: 0.716,
        hz: 49.89
    });

    // Dynamic State for Tank Levels
    const [tankLevels, setTankLevels] = useState([83, 79, 83]);

    const isWater = meter?.meterType === 'WATER' || meter?.type === 'Water';

    // Simulate Live Data Updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (activeTab === "Live") {
                // Update Electric Data
                if (!isWater) {
                    setElectricData(prev => ({
                        power: +(prev.power + (Math.random() * 0.02 - 0.01)).toFixed(3),
                        voltage: +(prev.voltage + (Math.random() * 2 - 1)).toFixed(2),
                        current: +(prev.current + (Math.random() * 0.05 - 0.025)).toFixed(3),
                        pf: +(prev.pf + (Math.random() * 0.005 - 0.0025)).toFixed(3),
                        hz: +(prev.hz + (Math.random() * 0.1 - 0.05)).toFixed(2)
                    }));
                }
                // Update Tank Data
                else {
                    setTankLevels(prev => prev.map(level => {
                        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                        const newLevel = level + change;
                        return Math.min(Math.max(newLevel, 0), 100); // Clamp between 0 and 100
                    }));
                }
            }
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [activeTab, isWater]);

    return (
        <div className="min-h-full space-y-6 animate-slide-in">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-blue-600">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${meter?.status === 'ACTIVE' || meter?.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {meter?.meterNumber || meter?.name}
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Type: {meter?.meterType || meter?.type}</p>
                    </div>
                </div>

                {/* Action Tabs */}
                <div className="flex gap-6 text-sm font-medium text-slate-500">
                    {["Live", "History", "Alarms & Maintenance"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent hover:text-slate-700"}`}
                        >
                            {tab === "Live" && <PlayCircleIcon className="w-4 h-4" />}
                            {tab === "History" && <ClockIcon className="w-4 h-4" />}
                            {tab === "Alarms & Maintenance" && <WrenchScrewdriverIcon className="w-4 h-4" />}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* WATER TANK VIEW */}
            {isWater && activeTab === "Live" && (
                <div className="space-y-6">
                    {/* SUMMARY CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Consumption */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <DocumentChartBarIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Today's Flow</p>
                                <p className="text-xl font-bold text-slate-800">2,450 <span className="text-xs font-normal text-slate-400">L</span></p>
                            </div>
                        </div>
                        {/* Flow Rate */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-cyan-50 rounded-lg text-cyan-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Flow Rate</p>
                                <p className="text-xl font-bold text-slate-800">45 <span className="text-xs font-normal text-slate-400">L/min</span></p>
                            </div>
                        </div>
                        {/* Pressure */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Pressure</p>
                                <p className="text-xl font-bold text-slate-800">2.4 <span className="text-xs font-normal text-slate-400">Bar</span></p>
                            </div>
                        </div>
                        {/* Status */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Status</p>
                                <p className="text-xl font-bold text-green-600">Normal</p>
                            </div>
                        </div>
                    </div>

                    {/* TANKS ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TankWidget name="Tank 1" percentage={tankLevels[0]} color="bg-blue-500" />
                        <TankWidget name="Tank 2" percentage={tankLevels[1]} color="bg-cyan-500" />
                        <TankWidget name="Tank 3" percentage={tankLevels[2]} color="bg-indigo-500" />
                    </div>

                    {/* CHARTS ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Offline Duration (Improved) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-slate-700">7-Day Analysis</h3>
                                <div className="flex gap-2 text-sm bg-slate-100 p-1 rounded-lg">
                                    <button className="px-3 py-1 bg-white rounded shadow-sm text-slate-700">Usage</button>
                                    <button className="px-3 py-1 text-slate-500">Flow</button>
                                </div>
                            </div>
                            <div className="h-48 flex items-end gap-2 px-2">
                                {/* Mock Bar Chart */}
                                {[45, 60, 75, 50, 80, 55, 65].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                        <div className="w-full bg-blue-100 rounded-t-md relative transition-all group-hover:bg-blue-500" style={{ height: `${h}%` }}>
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity">
                                                {h * 10} L
                                            </div>
                                        </div>
                                        <div className="mt-2 text-center text-xs text-slate-400">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity Events (List) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-4">Recent Events</h3>
                            <div className="space-y-4">
                                {[
                                    { time: "10:30 AM", event: "Pump Started", type: "success" },
                                    { time: "08:15 AM", event: "High Pressure Alert", type: "warning" },
                                    { time: "Yesterday", event: "Maintenance Mode", type: "info" },
                                ].map((ev, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm pb-3 border-b border-slate-50 last:border-0">
                                        <div className={`w-2 h-2 mt-1.5 rounded-full ${ev.type === 'success' ? 'bg-green-500' :
                                            ev.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                                            }`}></div>
                                        <div>
                                            <p className="font-medium text-slate-700">{ev.event}</p>
                                            <p className="text-xs text-slate-400">{ev.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-xs text-blue-600 font-medium hover:bg-blue-50 py-2 rounded transition-colors">
                                View All Logs
                            </button>
                        </div>
                    </div>

                    {/* BOTTOM ROW: Battery & Voltage */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Line Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-4">Realtime - last day</h3>
                            <div className="h-48 border-l border-b border-slate-200 relative">
                                {/* Mock Line */}
                                <svg className="absolute inset-0 w-full h-full p-2" preserveAspectRatio="none">
                                    <polyline
                                        points="0,100 50,100 100,20 150,20 200,50 300,50 400,20 500,20 600,20"
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="2"
                                    />
                                    <polyline
                                        points="0,80 100,80 200,90 300,60 400,60 500,70 600,70"
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <div className="flex gap-4 mt-4 justify-center">
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Battery voltage
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div> batStatus
                                </div>
                            </div>
                        </div>

                        {/* Battery Gauge */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
                            <h3 className="font-semibold text-slate-700 mb-2">Battery</h3>
                            <div className="relative w-40 h-40">
                                {/* Simple Gauge Recreated with SVG */}
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <path d="M 10 80 A 40 40 0 1 1 90 80" fill="none" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
                                    <path d="M 10 80 A 40 40 0 1 1 90 80" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" strokeDasharray="220" strokeDashoffset="40" />
                                    {/* Needle */}
                                    <line x1="50" y1="50" x2="20" y2="80" stroke="#EF4444" strokeWidth="2" />
                                    <circle cx="50" cy="50" r="3" fill="#334155" />
                                    <text x="50" y="75" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">3.69 V</text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ELECTRIC / SOLAR VIEW */}
            {!isWater && activeTab === "Live" && (
                <div className="space-y-6">
                    {/* HERO & GAUGES SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* HERO CARD - Wind Turbine / Total */}
                        <div className="lg:col-span-1 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl overflow-hidden relative min-h-[220px] p-6 flex flex-col justify-between border border-amber-200">
                            {/* Mock Wind Turbine Background */}
                            <div className="absolute right-0 top-0 w-32 h-32 opacity-20 pointer-events-none">
                                <BoltIcon className="w-full h-full text-amber-600 animate-spin-slow" />
                            </div>
                            <div>
                                <h3 className="text-amber-800 font-bold text-lg mb-1">Total Power</h3>
                                <p className="text-4xl font-bold text-amber-900">547.67 <span className="text-lg font-medium">kW</span></p>
                            </div>
                            <div className="flex items-center gap-2 text-amber-700 bg-amber-100/50 p-2 rounded-lg backdrop-blur-sm self-start">
                                <BoltIcon className="w-5 h-5" />
                                <span className="font-semibold">Present Load: {electricData.power} kW</span>
                            </div>
                            <style>{`
                                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                             `}</style>
                        </div>

                        {/* GAUGES */}
                        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <CircularGauge value={electricData.power} max={1} label="POWER" unit="kW" color="#3B82F6" />
                            <CircularGauge value={electricData.voltage} max={300} label="VOLTAGE" unit="V" color="#10B981" />
                            <CircularGauge value={electricData.current} max={5} label="CURRENT" unit="A" color="#6366F1" />
                            <CircularGauge value={electricData.pf} max={1} label="PF" unit="" color="#8B5CF6" />
                            <CircularGauge value={electricData.hz} max={60} label="HZ" unit="Hz" color="#EC4899" />
                            {/* Added 5th gauge for Hz */}
                        </div>
                    </div>

                    {/* PHASE DATA & CONSUMPTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Consumption Chart with Toggles */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-slate-700">
                                    {consumptionView === 'Day' ? "Daily Consumption" :
                                        consumptionView === 'Week' ? "Weekly Consumption" : "Monthly Consumption"}
                                </h3>
                                <div className="flex bg-slate-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setConsumptionView('Day')}
                                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${consumptionView === 'Day' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Day
                                    </button>
                                    <button
                                        onClick={() => setConsumptionView('Week')}
                                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${consumptionView === 'Week' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Week
                                    </button>
                                    <button
                                        onClick={() => setConsumptionView('Month')}
                                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${consumptionView === 'Month' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Month
                                    </button>
                                </div>
                            </div>

                            <div className="relative h-48 flex items-end justify-between gap-2 px-2">
                                {/* Chart Content Based on View */}
                                {consumptionView === 'Day' && (
                                    <>
                                        {[10, 15, 8, 12, 20, 25, 22, 18, 14, 10, 5, 8].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                                <div className="w-full bg-blue-100 rounded-t-sm relative transition-all group-hover:bg-blue-400" style={{ height: `${h * 3}%` }}>
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap">
                                                        {h} kWh
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {consumptionView === 'Week' && (
                                    <>
                                        {[40, 65, 45, 80, 55, 30, 70].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                                <div className="w-full bg-blue-100 rounded-t-md relative transition-all group-hover:bg-blue-600" style={{ height: `${h}%` }}>
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none transition-opacity">
                                                        {h} kWh
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {consumptionView === 'Month' && (
                                    <>
                                        {[120, 150, 180, 130].map((h, i) => (
                                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                                <div className="w-full bg-blue-100 rounded-t-md relative transition-all group-hover:bg-blue-800" style={{ height: `${h / 2.5}%` }}>
                                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none transition-opacity">
                                                        {h} kWh
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                <div className="absolute bottom-0 w-full h-[1px] bg-slate-200"></div>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                                {consumptionView === 'Day' && <span>00:00</span>}
                                {consumptionView === 'Day' && <span>12:00</span>}
                                {consumptionView === 'Day' && <span>23:59</span>}

                                {consumptionView === 'Week' && ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}

                                {consumptionView === 'Month' && ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(d => <span key={d}>{d}</span>)}
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="text-slate-500">kWh</span>
                                </div>
                                <span className="font-bold text-slate-700">Total: {consumptionView === 'Day' ? '167' : consumptionView === 'Week' ? '385' : '580'} kWh</span>
                            </div>
                        </div>

                        {/* PHASE GRID TABLE */}
                        <div className="lg:col-span-3 grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            {/* Headers */}
                            <div className="col-span-3 grid grid-cols-3 gap-4 p-3 bg-white rounded-lg mb-1 shadow-sm">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Voltage</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Power</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Current</span>
                            </div>

                            {/* Phase 1 (Red) */}
                            <div className="col-span-3 grid grid-cols-3 gap-4 items-center p-4 bg-red-50 rounded-lg border border-red-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-l-lg"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{electricData.voltage} <span className="text-sm font-medium text-slate-500">V</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-red-500">V1</span>
                                        <svg className="w-8 h-4 text-red-300" viewBox="0 0 100 50">
                                            <path d="M0 25 Q25 5 50 25 T100 25" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.power * 0.33).toFixed(2)} <span className="text-sm font-medium text-slate-500">W</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-red-500">P1</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{electricData.current} <span className="text-sm font-medium text-slate-500">A</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-red-500">C1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2 (Yellow) */}
                            <div className="col-span-3 grid grid-cols-3 gap-4 items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-400 rounded-l-lg"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.voltage + 2.5).toFixed(2)} <span className="text-sm font-medium text-slate-500">V</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-yellow-600">V2</span>
                                        <svg className="w-8 h-4 text-yellow-300" viewBox="0 0 100 50">
                                            <path d="M0 25 Q25 5 50 25 T100 25" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.power * 0.34).toFixed(2)} <span className="text-sm font-medium text-slate-500">W</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-yellow-600">P2</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.current + 0.04).toFixed(2)} <span className="text-sm font-medium text-slate-500">A</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-yellow-600">C2</span>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3 (Blue) */}
                            <div className="col-span-3 grid grid-cols-3 gap-4 items-center p-4 bg-blue-50 rounded-lg border border-blue-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-lg"></div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.voltage + 3.1).toFixed(2)} <span className="text-sm font-medium text-slate-500">V</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-blue-500">V3</span>
                                        <svg className="w-8 h-4 text-blue-300" viewBox="0 0 100 50">
                                            <path d="M0 25 Q25 5 50 25 T100 25" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.power * 0.33).toFixed(2)} <span className="text-sm font-medium text-slate-500">W</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-blue-500">P3</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-800">{(electricData.current - 0.02).toFixed(2)} <span className="text-sm font-medium text-slate-500">A</span></p>
                                    <div className="flex items-center justify-center gap-1 mt-1">
                                        <span className="text-xs font-bold text-blue-500">C3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MeterDetails;
