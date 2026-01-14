
import React, { useState } from "react";
import {
    PlayCircleIcon,
    ClockIcon,
    WrenchScrewdriverIcon,
    DocumentChartBarIcon,
    ArrowsPointingOutIcon,
    XMarkIcon,
    MapIcon,
    BoltIcon
} from "@heroicons/react/24/outline";

// Reusable Circular Gauge
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

// Reusable Dashboard Widget with Expand Capability
const DashboardWidget = ({ title, children, onExpand, className = "" }) => {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
                {onExpand && (
                    <button onClick={onExpand} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition">
                        <ArrowsPointingOutIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="flex-1 min-h-0 relative">
                {children}
            </div>
        </div>
    );
};

const StaticMapBackground = () => (
    <div className="absolute inset-0 bg-[#e5e7eb] w-full h-full overflow-hidden">
        <svg className="w-full h-full absolute inset-0 text-white opacity-60" width="100%" height="100%">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Random "Roads" */}
            <path d="M0 50 Q 50 40 100 60 T 200 80 T 300 50 T 400 90 V 100 H 0 Z" fill="#d1d5db" opacity="0.4" />
            <path d="M0,30 L400,120" stroke="currentColor" strokeWidth="6" />
            <path d="M100,0 L80,400" stroke="currentColor" strokeWidth="5" />
            <path d="M250,0 L280,400" stroke="currentColor" strokeWidth="5" />
            <path d="M0,200 L400,150" stroke="currentColor" strokeWidth="6" />
        </svg>
        {/* Park Areas */}
        <div className="absolute top-10 left-10 w-24 h-16 bg-green-100/50 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-10 right-20 w-32 h-24 bg-green-100/50 rounded-full"></div>
    </div>
);

const MeterDetails = ({ meter, onBack }) => {
    const [activeTab, setActiveTab] = useState("Live");
    const [consumptionView, setConsumptionView] = useState("Week");
    const [expandedWidget, setExpandedWidget] = useState(null); // ID of the expanded widget

    const isWater = meter?.meterType === 'WATER' || meter?.type === 'Water';
    const isGas = meter?.meterType === 'GAS' || meter?.type === 'Gas';

    // Dynamic State for Electric Data
    const [electricData, setElectricData] = useState({
        power: 0.38,
        voltage: 231,
        current: 0.775,
        pf: 0.716,
        hz: 49.89
    });

    // Dynamic State for Gas Data
    const [gasData, setGasData] = useState({
        weeklyConsumption: 222.06,
        todayConsumption: 1423.85,
        monthlyBill: "14,207,771.60",
        temperature: 25
    });

    // Dynamic State for New Water Data (Matching Reference Image)
    const [waterData, setWaterData] = useState({
        velocity: 0.4,
        flow: 3.1,
        todayConsumption: 118.8,
        positiveComm: 11466.7,
        negativeComm: 0.0,
        totalComm: 11466.7
    });

    // Simulate Live Data Updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (activeTab === "Live") {
                // Update Electric Data
                if (!isWater && !isGas) {
                    setElectricData(prev => ({
                        power: +(prev.power + (Math.random() * 0.02 - 0.01)).toFixed(3),
                        voltage: +(prev.voltage + (Math.random() * 2 - 1)).toFixed(2),
                        current: +(prev.current + (Math.random() * 0.05 - 0.025)).toFixed(3),
                        pf: +(prev.pf + (Math.random() * 0.005 - 0.0025)).toFixed(3),
                        hz: +(prev.hz + (Math.random() * 0.1 - 0.05)).toFixed(2)
                    }));
                }
                // Update Gas Data
                else if (isGas) {
                    setGasData(prev => ({
                        ...prev,
                        todayConsumption: +(prev.todayConsumption + (Math.random() * 0.05)).toFixed(2),
                        temperature: +(prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1)
                    }));
                }
                // Update Water Data
                else if (isWater) {
                    setWaterData(prev => ({
                        velocity: Math.max(0, +(prev.velocity + (Math.random() * 0.1 - 0.05)).toFixed(1)),
                        flow: Math.max(0, +(prev.flow + (Math.random() * 0.2 - 0.1)).toFixed(1)),
                        todayConsumption: +(prev.todayConsumption + 0.01).toFixed(1),
                        positiveComm: +(prev.positiveComm + 0.01).toFixed(1),
                        totalComm: +(prev.totalComm + 0.01).toFixed(1),
                        negativeComm: prev.negativeComm
                    }));
                }
            }
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [activeTab, isWater, isGas]);

    // Helper to render content based on widget ID (reused for full screen)
    const renderWidgetContent = (widgetId, isExpanded = false) => {
        const chartHeight = isExpanded ? "h-[500px]" : "h-40";
        const tableHeight = isExpanded ? "h-full" : "h-64";

        switch (widgetId) {
            case "velocity_chart":
                return (
                    <div className={`${chartHeight} w-full relative`}>
                        <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,150 L0,100 Q50,40 100,100 T200,80 T300,120 T400,100 L400,150 Z" fill="url(#velocityGradient)" />
                            <path d="M0,100 Q50,40 100,100 T200,80 T300,120 T400,100" fill="none" stroke="#3B82F6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="absolute bottom-0 right-0 text-xs font-bold text-slate-500">Avg: 0.44 | Total: 21.02</div>
                    </div>
                );
            case "flow_chart":
                return (
                    <div className={`${chartHeight} w-full relative`}>
                        <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,150 L0,120 Q30,20 60,110 T150,60 T250,130 T350,90 T400,120 L400,150 Z" fill="url(#flowGradient)" />
                            <path d="M0,120 Q30,20 60,110 T150,60 T250,130 T350,90 T400,120" fill="none" stroke="#10B981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </svg>
                        <div className="absolute bottom-0 right-0 text-xs font-bold text-slate-500">Avg: 2.03 | Total: 97.41</div>
                    </div>
                );
            case "consumption_bar":
                return (
                    <div className={`${chartHeight} flex items-end gap-1.5`}>
                        {[40, 60, 45, 80, 55, 35, 70, 50, 65, 85, 45, 60, 55, 75, 50].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{h}</div>
                            </div>
                        ))}
                    </div>
                );
            case "realtime_table":
                return (
                    <div className={`${tableHeight} overflow-auto`}>
                        <table className="w-full text-xs text-left">
                            <thead className="text-slate-500 font-medium border-b border-slate-100 bg-slate-50">
                                <tr>
                                    <th className="py-2 px-2">Timestamp</th>
                                    <th className="py-2 px-2">Flow</th>
                                    <th className="py-2 px-2">Flow Unit</th>
                                    <th className="py-2 px-2">Velocity</th>
                                    <th className="py-2 px-2">Pos. Cum.</th>
                                    <th className="py-2 px-2">Neg. Cum.</th>
                                    <th className="py-2 px-2">Cum. Total</th>
                                    <th className="py-2 px-2">Unit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[...Array(isExpanded ? 20 : 5)].map((_, i) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                        <td className="py-2 px-2 text-slate-700 font-medium">
                                            2024-06-17<br /><span className="text-slate-400 font-normal">17:{37 - i}:01</span>
                                        </td>
                                        <td className="py-2 px-2">{(waterData.flow - (i * 0.1)).toFixed(1)}</td>
                                        <td className="py-2 px-2 text-slate-500">m3/h</td>
                                        <td className="py-2 px-2">{(waterData.velocity - (i * 0.01)).toFixed(2)} m/s</td>
                                        <td className="py-2 px-2">{waterData.positiveComm.toFixed(1)}</td>
                                        <td className="py-2 px-2">0.0</td>
                                        <td className="py-2 px-2 font-bold">{waterData.totalComm.toFixed(1)}</td>
                                        <td className="py-2 px-2 text-slate-500">m3</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "map_view":
                return (
                    <div className={`w-full ${isExpanded ? "h-full" : "h-full min-h-[200px]"} bg-slate-100 relative rounded-lg overflow-hidden flex items-center justify-center`}>
                        <StaticMapBackground />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shadow-md border-2 border-white animate-bounce">
                                <MapIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <span className="bg-white px-2 py-1 rounded shadow-sm text-xs font-bold mt-1">IoT-0003</span>
                        </div>
                    </div>
                );

            case "gas_temp_chart":
                return (
                    <div className={`${chartHeight} flex items-end gap-1 relative z-10`}>
                        {/* Simulated Fill Area */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-100/50 to-transparent pointer-events-none"></div>
                        <svg className="absolute inset-0 w-full h-full p-2 overflow-visible">
                            <path
                                d="M0,100 L50,100 L100,100 L150,20 L170,100 L200,80 L220,100 L250,20 L270,100 L300,80 L320,100 L350,20 L370,100 L600,100"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                        <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-[10px] text-slate-400 px-2">
                            <span>07:00</span><span>13:00</span><span>19:00</span>
                        </div>
                        <div className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-500">
                            Total: <span className="text-slate-800">1201 °C</span>
                        </div>
                    </div>
                );
            case "gas_consumption_chart":
                return (
                    <div className={`${chartHeight} flex items-end gap-2 relative`}>
                        {[5, 4, 8, 4, 8, 5, 6, 4, 7, 7, 4, 7, 5, 8, 5, 6, 7, 4, 7, 5, 5, 7, 4, 7, 6, 8, 6, 4].map((v, i) => (
                            <div key={i} className="flex-1 bg-blue-100 rounded-t-sm hover:bg-blue-500 transition-colors relative group" style={{ height: `${v * 10}%` }}>
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 py-0.5 rounded pointer-events-none">
                                    {v}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "electric_consumption":
                return (
                    <div className="w-full h-full flex flex-col pt-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-600">
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0"></span>
                                    <span>Solar Production</span>
                                </div>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
                                    <span>Consumption</span>
                                </div>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-full">
                                {['Today', 'Weekly', 'Monthly'].map((view) => (
                                    <button
                                        key={view}
                                        onClick={() => setConsumptionView(view === 'Today' ? 'Day' : view === 'Weekly' ? 'Week' : 'Month')}
                                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${(activeTab === "Live" && (
                                            (view === 'Today' && consumptionView === 'Day') ||
                                            (view === 'Weekly' && consumptionView === 'Week') ||
                                            (view === 'Monthly' && consumptionView === 'Month')
                                        ))
                                            ? 'bg-[#0ea5e9] text-white shadow-md'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative flex-1 w-full min-h-[300px]">
                            {/* Y-Axis Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-300 pointer-events-none pb-6 pl-8 pr-2">
                                {[3.2, 2.4, 1.6, 0.8, 0].map((val, i) => (
                                    <div key={i} className="flex items-center w-full h-[1px] bg-slate-100 border-t border-dashed border-slate-200">
                                        <span className="absolute left-0 w-6 text-right mr-2 -translate-y-1/2">{val}</span>
                                    </div>
                                ))}
                            </div>
                            <svg className="absolute inset-0 w-full h-full pt-2 pb-6 pl-8 pr-2 pointer-events-none overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="solarGradientExp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#fb923c" stopOpacity="0.0" />
                                    </linearGradient>
                                    <linearGradient id="consGradientExp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                    </linearGradient>
                                </defs>
                                {consumptionView === 'Day' && (
                                    <>
                                        <path d="M0,200 L20,190 Q60,180 80,150 T150,80 T200,30 T250,70 T300,140 T350,195 L400,200 L400,200 L0,200 Z" fill="url(#solarGradientExp)" />
                                        <path d="M0,200 L20,190 Q60,180 80,150 T150,80 T200,30 T250,70 T300,140 T350,195 L400,200" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M0,200 L30,185 Q80,170 100,140 T160,110 T220,130 T280,170 T340,180 T380,80 L400,70 L400,200 L0,200 Z" fill="url(#consGradientExp)" />
                                        <path d="M0,200 L30,185 Q80,170 100,140 T160,110 T220,130 T280,170 T340,180 T380,80 L400,70" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                                    </>
                                )}
                                {consumptionView === 'Week' && (
                                    <>
                                        <path d="M0,200 C60,150 100,50 160,60 S260,160 320,100 S380,20 400,30 L400,200 Z" fill="url(#solarGradientExp)" />
                                        <path d="M0,200 C60,150 100,50 160,60 S260,160 320,100 S380,20 400,30" fill="none" stroke="#fb923c" strokeWidth="3" />
                                        <path d="M0,200 C40,180 80,180 120,150 S220,100 280,130 S360,160 400,140 L400,200 Z" fill="url(#consGradientExp)" />
                                        <path d="M0,200 C40,180 80,180 120,150 S220,100 280,130 S360,160 400,140" fill="none" stroke="#10b981" strokeWidth="3" />
                                    </>
                                )}
                                {consumptionView === 'Month' && (
                                    <>
                                        <path d="M0,200 C100,100 200,20 300,100 400,80 V200 H0 Z" fill="url(#solarGradientExp)" />
                                        <path d="M0,200 C100,100 200,20 300,100 400,80" fill="none" stroke="#fb923c" strokeWidth="3" />
                                        <path d="M0,180 L50,170 L100,180 L150,160 L200,175 L250,165 L300,170 L350,160 L400,170 V200 H0 Z" fill="url(#consGradientExp)" />
                                        <path d="M0,180 L50,170 L100,180 L150,160 L200,175 L250,165 L300,170 L350,160 L400,170" fill="none" stroke="#10b981" strokeWidth="3" />
                                    </>
                                )}
                            </svg>
                            {/* X-Axis Labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between pl-8 pr-2 text-[10px] text-slate-400 font-medium">
                                {consumptionView === 'Day' && ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'].map(t => <span key={t}>{t}</span>)}
                                {consumptionView === 'Week' && ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(t => <span key={t}>{t}</span>)}
                                {consumptionView === 'Month' && ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(t => <span key={t}>{t}</span>)}
                            </div>
                        </div>
                    </div>
                );

            case "electric_phase_table":
                return (
                    <div className={`${isExpanded ? "p-4" : ""} grid grid-cols-1 md:grid-cols-3 gap-4`}>
                        {/* Phase 1 Overlay in Expanded Mode */}
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-center">
                            <p className="font-bold text-red-600">Phase 1</p>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div><p className="text-xs text-slate-400">Volt</p><p className="font-bold">{electricData.voltage}V</p></div>
                                <div><p className="text-xs text-slate-400">Power</p><p className="font-bold">{(electricData.power * 0.33).toFixed(2)}W</p></div>
                                <div><p className="text-xs text-slate-400">Amp</p><p className="font-bold">{electricData.current}A</p></div>
                            </div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-center">
                            <p className="font-bold text-yellow-600">Phase 2</p>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div><p className="text-xs text-slate-400">Volt</p><p className="font-bold">{(electricData.voltage + 2).toFixed(2)}V</p></div>
                                <div><p className="text-xs text-slate-400">Power</p><p className="font-bold">{(electricData.power * 0.34).toFixed(2)}W</p></div>
                                <div><p className="text-xs text-slate-400">Amp</p><p className="font-bold">{(electricData.current + 0.1).toFixed(2)}A</p></div>
                            </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                            <p className="font-bold text-blue-600">Phase 3</p>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <div><p className="text-xs text-slate-400">Volt</p><p className="font-bold">{(electricData.voltage - 1).toFixed(2)}V</p></div>
                                <div><p className="text-xs text-slate-400">Power</p><p className="font-bold">{(electricData.power * 0.33).toFixed(2)}W</p></div>
                                <div><p className="text-xs text-slate-400">Amp</p><p className="font-bold">{(electricData.current - 0.05).toFixed(2)}A</p></div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-full space-y-6 animate-slide-in relative">
            {/* FULL SCREEN MODAL */}
            {expandedWidget && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
                    <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                        <h2 className="text-lg font-bold text-slate-800">
                            {expandedWidget === "velocity_chart" ? "Velocity Analysis" :
                                expandedWidget === "flow_chart" ? "Flow Analysis" :
                                    expandedWidget === "consumption_bar" ? "Consumption Details" :
                                        expandedWidget === "realtime_table" ? "Realtime Data Logs" : "Map View"}
                        </h2>
                        <button onClick={() => setExpandedWidget(null)} className="p-2 hover:bg-slate-200 rounded-full transition">
                            <XMarkIcon className="w-6 h-6 text-slate-600" />
                        </button>
                    </div>
                    <div className="flex-1 p-6 overflow-auto">
                        {renderWidgetContent(expandedWidget, true)}
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-red-50 rounded-full transition-colors text-slate-500 hover:text-red-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${meter?.status === 'ACTIVE' || meter?.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {meter?.meterNumber || meter?.name}
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Type: {meter?.meterType || meter?.type} | ID: IoT-0003</p>
                    </div>
                </div>

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

            {/* WATER METER OVERHAULED VIEW */}
            {isWater && activeTab === "Live" && (
                <div className="grid grid-cols-12 gap-4">
                    {/* ROW 1: Device Image + Stats + Chart */}
                    <div className="col-span-12 xl:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                            {/* Analog Meter Background */}
                            <img
                                src="/assets/analog_meter.png"
                                alt="Analog Water Meter"
                                className="w-full h-full object-contain drop-shadow-md"
                            />

                            {/* Live Digits Overlay */}
                            <div className="absolute top-[28%] left-[50%] -translate-x-[50%] flex bg-[#e0e0e0] p-[1px] shadow-inner rounded-sm border border-slate-400">
                                {waterData.totalComm.toFixed(0).padStart(7, '0').split('').map((digit, i) => (
                                    <div
                                        key={i}
                                        className={`
                                            w-6 h-8 flex items-center justify-center text-xl font-bold font-mono 
                                            border-r border-slate-400 last:border-0 shadow-sm
                                            ${i >= 5 ? 'bg-black text-white' : 'bg-white text-black'}
                                        `}
                                    >
                                        <span>{digit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Rotating Needle Simulation */}
                            <div className="absolute top-[55%] left-[50%] w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-90">
                                <div className="w-full h-full relative animate-spin-slow" style={{ animationDuration: '6s', animationTimingFunction: 'linear' }}>
                                    <div className="absolute top-[10%] left-1/2 w-1.5 h-[40%] origin-bottom bg-red-600 rounded-full -translate-x-1/2 shadow-sm"></div>
                                    <div className="absolute top-[50%] left-1/2 w-4 h-4 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-slate-300"></div>
                                </div>
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-700">Ultrasonic Water Meter</h3>
                        <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                        </p>
                    </div>

                    {/* Stats Column 1 */}
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 grid grid-rows-3 gap-4">
                        <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Velocity</p>
                                <p className="text-[10px] text-slate-400">Last update 3m ago</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-800">{waterData.velocity} <span className="text-sm font-normal text-slate-500">m/s</span></p>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Flow</p>
                                <p className="text-[10px] text-slate-400">Last update 3m ago</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-800">{waterData.flow} <span className="text-sm font-normal text-slate-500">m³/hr</span></p>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Today Consumption</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-slate-800">{waterData.todayConsumption} <span className="text-sm font-normal text-slate-500">m³</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Column 2 */}
                    <div className="col-span-12 md:col-span-6 xl:col-span-3 grid grid-rows-3 gap-4">
                        <div className="bg-slate-50 px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center text-center">
                            <p className="text-xl font-bold text-slate-800">{waterData.positiveComm.toFixed(1)} m³</p>
                            <p className="text-xs text-slate-500">Positive Commulative</p>
                        </div>
                        <div className="bg-slate-50 px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center text-center">
                            <p className="text-xl font-bold text-slate-800">{waterData.negativeComm.toFixed(1)} m³</p>
                            <p className="text-xs text-slate-500">Negative Commulative</p>
                        </div>
                        <div className="bg-slate-50 px-4 py-3 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center text-center">
                            <p className="text-xl font-bold text-slate-800">{waterData.totalComm.toFixed(1)} m³</p>
                            <p className="text-xs text-slate-500">Commulative Total</p>
                        </div>
                    </div>

                    {/* Consumption Chart Widget */}
                    <div className="col-span-12 xl:col-span-3">
                        <DashboardWidget title="Consumption" onExpand={() => setExpandedWidget("consumption_bar")} className="h-full">
                            {renderWidgetContent("consumption_bar")}
                            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                                <span>06:00</span><span>12:00</span><span>17:00</span>
                            </div>
                            <div className="mt-2 text-right text-[10px]">
                                <span className="text-blue-500">●</span> Daily Consumption <span className="font-bold text-slate-700">45661.09 m³</span>
                            </div>
                        </DashboardWidget>
                    </div>

                    {/* ROW 2: Velocity & Flow Charts */}
                    <div className="col-span-12 md:col-span-6">
                        <DashboardWidget title="Velocity" onExpand={() => setExpandedWidget("velocity_chart")}>
                            {renderWidgetContent("velocity_chart")}
                        </DashboardWidget>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <DashboardWidget title="Flow" onExpand={() => setExpandedWidget("flow_chart")}>
                            {renderWidgetContent("flow_chart")}
                        </DashboardWidget>
                    </div>

                    {/* ROW 3: Table & Map */}
                    <div className="col-span-12 lg:col-span-8">
                        <DashboardWidget title="Realtime - last day" onExpand={() => setExpandedWidget("realtime_table")}>
                            {renderWidgetContent("realtime_table")}
                        </DashboardWidget>
                    </div>
                    <div className="col-span-12 lg:col-span-4">
                        <DashboardWidget title="Location" onExpand={() => setExpandedWidget("map_view")} className="h-full">
                            {renderWidgetContent("map_view")}
                        </DashboardWidget>
                    </div>
                </div>
            )}

            {/* GAS METER VIEW */}
            {isGas && activeTab === "Live" && (
                <div className="space-y-6">
                    {/* TOP ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* 1. Gas Meter Icon */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                            <div className="text-slate-800">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 10H20V13C20 14.1046 19.1046 15 18 15H6C4.89543 15 4 14.1046 4 13V10Z" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M8 10V6H12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M16 6V10" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M15 2L17.5 4.5" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.5 2L21 4.5" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 4.5L17.5 2" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* 2. Gas Temperature Line Chart */}
                        <div className="lg:col-span-2">
                            <DashboardWidget title="Gas Temperature" onExpand={() => setExpandedWidget("gas_temp_chart")} className="h-full">
                                <div className="h-40 flex items-end gap-1 relative z-10">
                                    {/* Simulated Fill Area */}
                                    {/* Line Path Simulation */}
                                    <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="gasTempGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#fee2e2" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Filled Area */}
                                        <path
                                            d="M0,110 L60,110 L90,30 L110,80 L130,50 L150,80 L180,30 L210,110 L210,150 L0,150 Z"
                                            fill="url(#gasTempGradient)"
                                            stroke="none"
                                        />
                                        {/* Stroke Line */}
                                        <path
                                            d="M0,110 L60,110 L90,30 L110,80 L130,50 L150,80 L180,30 L210,110"
                                            fill="none"
                                            stroke="#EF4444"
                                            strokeWidth="3"
                                            vectorEffect="non-scaling-stroke"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {/* X-Axis */}
                                    <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-[10px] text-slate-400 px-2">
                                        <span>07:00</span>
                                        <span>10:00</span>
                                        <span>13:00</span>
                                        <span>16:00</span>
                                        <span>19:00</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 text-[10px] font-bold text-slate-500">
                                    Total: <span className="text-slate-800">1201 °C</span>
                                </div>
                            </DashboardWidget>
                        </div>

                        {/* 3. Stats & Gauge */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                            <div className="flex-1 p-4 border-b border-slate-100 flex flex-col justify-center items-center text-center">
                                <p className="text-2xl font-bold text-slate-800">{gasData.weeklyConsumption}<span className="text-sm font-normal text-slate-400"> m³</span></p>
                                <p className="text-[10px] text-slate-500">Weekly Consumption</p>
                            </div>
                            <div className="flex-1 p-4 border-b border-slate-100 flex flex-col justify-center items-center text-center">
                                <p className="text-2xl font-bold text-slate-800">{gasData.todayConsumption}</p>
                                <p className="text-[10px] text-slate-500">Today's Consumption (m³)</p>
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-center items-center text-center bg-slate-50">
                                <p className="text-lg font-bold text-slate-800">Rs. {gasData.monthlyBill}</p>
                                <p className="text-[10px] text-slate-500">Monthly Billing</p>
                            </div>
                        </div>
                    </div>
                    {/* BOTTOM ROW */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Consumption Bar Chart */}
                        <div className="lg:col-span-2">
                            <DashboardWidget title="Consumption (m³)" onExpand={() => setExpandedWidget("gas_consumption_chart")} className="h-full">
                                <div className="h-48 flex items-end gap-1.5 relative mt-4">
                                    {[5, 4, 8, 4, 8, 5, 6, 4, 7, 7, 4, 7, 5, 8, 5, 6, 7, 4, 7, 5, 5, 7, 4, 7, 6, 8, 6, 4, 6, 5, 8].map((v, i) => (
                                        <div key={i} className="flex-1 bg-blue-100/80 rounded-t-sm hover:bg-blue-500 transition-colors relative group cursor-pointer" style={{ height: `${v * 10}%` }}>
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20">
                                                {v} m³
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-50">
                                    <span>20:00</span>
                                    <span>Jun 17</span>
                                    <span>04:00</span>
                                    <span>08:00</span>
                                    <span>12:00</span>
                                    <span>16:00</span>
                                </div>
                            </DashboardWidget>
                        </div>

                        {/* Meter Details Table */}
                        {/* Meter Details Table Refined */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
                            <h3 className="text-base font-bold text-slate-700 mb-6">Meter details</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 mb-1">Meter Id</p>
                                    <p className="text-base font-bold text-slate-900">IoT-0001</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <p className="text-xs font-semibold text-slate-400 mb-2">Meter Location</p>
                                    <div className="rounded-lg overflow-hidden relative h-32 w-full bg-slate-100 border border-slate-200 shadow-inner group cursor-pointer" onClick={() => setExpandedWidget('map_view')}>
                                        {/* Static SVG Map Background */}
                                        <div className="absolute inset-0 bg-[#e5e7eb] w-full h-full overflow-hidden">
                                            <svg className="w-full h-full absolute inset-0 text-white opacity-60" width="100%" height="100%">
                                                <pattern id="grid-gas" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="2" />
                                                </pattern>
                                                <rect width="100%" height="100%" fill="url(#grid-gas)" />
                                                <path d="M0,30 L600,120" stroke="currentColor" strokeWidth="6" />
                                                <path d="M100,0 L80,200" stroke="currentColor" strokeWidth="5" />
                                                <path d="M250,0 L280,200" stroke="currentColor" strokeWidth="5" />
                                                <path d="M0,100 L600,150" stroke="currentColor" strokeWidth="6" />
                                            </svg>
                                            <div className="absolute top-5 left-10 w-16 h-12 bg-green-100/50 rounded-lg rotate-6"></div>
                                        </div>

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -mt-4 transition-all duration-300 group-hover:-mt-6">
                                            <MapIcon className="w-8 h-8 text-red-600 drop-shadow-xl filter" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1">
                                        <MapIcon className="w-3 h-3 text-slate-400" />
                                        Sector-45, Warehouse 2
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-4">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 mb-1">Latitude</p>
                                        <p className="text-base font-bold text-slate-900">23.244274</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 mb-1">Longitude</p>
                                        <p className="text-base font-bold text-slate-900">72.626885</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-4">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 mb-1">Installation Date</p>
                                        <p className="text-base font-bold text-slate-900">8 Sep 2023</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 mb-1">Last Update</p>
                                        <p className="text-base font-bold text-slate-900">Just now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ELECTRIC / SOLAR VIEW */}
            {!isWater && !isGas && activeTab === "Live" && (
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

                    {/* ENERGY STATISTICS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center group hover:border-blue-300 transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                                <ClockIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800">167 <span className="text-sm font-normal text-slate-500">kWh</span></p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Daily Consumption</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center group hover:border-blue-300 transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                                <DocumentChartBarIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800">385 <span className="text-sm font-normal text-slate-500">kWh</span></p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Weekly Consumption</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center group hover:border-blue-300 transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                                <ArrowsPointingOutIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800">1,580 <span className="text-sm font-normal text-slate-500">kWh</span></p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">Monthly Consumption</p>
                        </div>
                    </div>

                    {/* PHASE DATA & CONSUMPTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Consumption Chart with Toggles */}
                        <div className="lg:col-span-2">
                            <DashboardWidget title="Energy Production" onExpand={() => setExpandedWidget("electric_consumption")}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    {/* Legend */}
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-600">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <span className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0"></span>
                                            <span>Solar Production</span>
                                        </div>
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
                                            <span>Consumption</span>
                                        </div>
                                    </div>

                                    {/* Toggles */}
                                    <div className="flex bg-slate-100 p-1 rounded-full">
                                        {['Today', 'Weekly', 'Monthly'].map((view) => (
                                            <button
                                                key={view}
                                                onClick={() => setConsumptionView(view === 'Today' ? 'Day' : view === 'Weekly' ? 'Week' : 'Month')}
                                                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${(activeTab === "Live" && (
                                                    (view === 'Today' && consumptionView === 'Day') ||
                                                    (view === 'Weekly' && consumptionView === 'Week') ||
                                                    (view === 'Monthly' && consumptionView === 'Month')
                                                ))
                                                    ? 'bg-[#0ea5e9] text-white shadow-md'
                                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {view}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative h-64 w-full">
                                    {/* Y-Axis Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-300 pointer-events-none">
                                        {[3.2, 2.4, 1.6, 0.8, 0].map((val, i) => (
                                            <div key={i} className="flex items-center w-full">
                                                <span className="w-6 text-right mr-2">{val}</span>
                                                <div className="h-[1px] flex-1 bg-slate-100 border-t border-dashed border-slate-200"></div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart SVG */}
                                    <svg className="absolute inset-0 w-full h-full pt-2 pb-6 pl-8 pr-2 pointer-events-none overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.0" />
                                            </linearGradient>
                                            <linearGradient id="consGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Mock Data Paths based on View */}
                                        {consumptionView === 'Day' && (
                                            <>
                                                {/* Solar - Orange */}
                                                <path d="M0,200 L20,190 Q60,180 80,150 T150,80 T200,30 T250,70 T300,140 T350,195 L400,200 L400,200 L0,200 Z" fill="url(#solarGradient)" />
                                                <path d="M0,200 L20,190 Q60,180 80,150 T150,80 T200,30 T250,70 T300,140 T350,195 L400,200" fill="none" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />

                                                {/* Consumption - Green */}
                                                <path d="M0,200 L30,185 Q80,170 100,140 T160,110 T220,130 T280,170 T340,180 T380,80 L400,70 L400,200 L0,200 Z" fill="url(#consGradient)" />
                                                <path d="M0,200 L30,185 Q80,170 100,140 T160,110 T220,130 T280,170 T340,180 T380,80 L400,70" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                                            </>
                                        )}

                                        {consumptionView === 'Week' && (
                                            <>
                                                {/* Solar Week - Safe Cubic Curve within 0-200 */}
                                                <path d="M0,200 C60,150 100,50 160,60 S260,160 320,100 S380,20 400,30 L400,200 Z" fill="url(#solarGradient)" />
                                                <path d="M0,200 C60,150 100,50 160,60 S260,160 320,100 S380,20 400,30" fill="none" stroke="#fb923c" strokeWidth="3" />

                                                {/* Cons Week - Safe Cubic Curve within 0-200 */}
                                                <path d="M0,200 C40,180 80,180 120,150 S220,100 280,130 S360,160 400,140 L400,200 Z" fill="url(#consGradient)" />
                                                <path d="M0,200 C40,180 80,180 120,150 S220,100 280,130 S360,160 400,140" fill="none" stroke="#10b981" strokeWidth="3" />
                                            </>
                                        )}

                                        {consumptionView === 'Month' && (
                                            <>
                                                {/* Solar Month - Safe Bounds */}
                                                <path d="M0,200 C100,100 200,20 300,100 400,80 V200 H0 Z" fill="url(#solarGradient)" />
                                                <path d="M0,200 C100,100 200,20 300,100 400,80" fill="none" stroke="#fb923c" strokeWidth="3" />
                                                {/* Cons Month */}
                                                <path d="M0,180 L50,170 L100,180 L150,160 L200,175 L250,165 L300,170 L350,160 L400,170 V200 H0 Z" fill="url(#consGradient)" />
                                                <path d="M0,180 L50,170 L100,180 L150,160 L200,175 L250,165 L300,170 L350,160 L400,170" fill="none" stroke="#10b981" strokeWidth="3" />
                                            </>
                                        )}
                                    </svg>
                                </div>

                                {/* X-Axis Labels */}
                                <div className="flex justify-between pl-8 pr-2 text-[10px] text-slate-400 font-medium">
                                    {consumptionView === 'Day' && ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'].map(t => <span key={t}>{t}</span>)}
                                    {consumptionView === 'Week' && ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(t => <span key={t}>{t}</span>)}
                                    {consumptionView === 'Month' && ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(t => <span key={t}>{t}</span>)}
                                </div>
                                <div className="h-4"></div> {/* Spacer */}
                            </DashboardWidget>
                        </div>

                        {/* PHASE GRID TABLE */}
                        <div className="lg:col-span-3">
                            <DashboardWidget title="Three Phase Status" onExpand={() => setExpandedWidget("electric_phase_table")}>
                                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
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
                            </DashboardWidget>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MeterDetails;
