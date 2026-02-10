import React, { useState } from "react";
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const Payloads = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    // Dummy data generator
    const generateData = () => {
        const data = [];
        for (let i = 1; i <= 25; i++) {
            data.push({
                id: i,
                srNo: i,
                tid: 1,
                macAddress: "EE:8A:C2:A1:F7:CD",
                deviceName: i % 2 === 0 ? "GM G-03" : "Sopan-HTTPS",
                date: "07/12/2025",
                time: "17:36:43",
                meterStartReading: (45.67 + i).toFixed(2),
                startBalance: (1989.97 + i * 10).toFixed(2),
                r0: "0.00",
                r1: "6",
                r2: "0",
                r3: "0",
                r4: "0",
                r5: "0.00",
                r6: "0",
                r7: "0",
                r8: "0",
                r9: "0",
                r10: "0",
                r11: "0",
                r12: "0",
                r13: "0",
                r14: "0",
                r15: "0",
                r16: "0",
                r17: "0",
                r18: "0",
                r19: "0",
                r20: "0",
                r21: "0",
                r22: "0",
                r23: "0",
                endBalance: (23149.99 + i).toFixed(2),
                meterEndReading: (63.73 + i).toFixed(2),
                pushButtonCount: 0,
                battery: 100,
                signalPower: 1,
                signalQuality: 27,
                signalNoiseRatio: 3,
            });
        }
        return data;
    };

    const [payloads] = useState(generateData());

    const filteredPayloads = payloads.filter((item) =>
        item.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.macAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPayloads.length / rowsPerPage);
    const paginatedPayloads = filteredPayloads.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const rColumns = Array.from({ length: 24 }, (_, i) => `R${i}`);

    return (
        <div className="relative flex flex-col h-[calc(100vh-120px)] overflow-hidden text-[#002D5E] font-sans">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col w-full h-full overflow-hidden p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-[#002D5E] uppercase tracking-tight">Payloads</h1>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Payload..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-gray-700 bg-white shadow-sm transition-all"
                            />
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>

                        <div className="relative group">
                            <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg text-sm font-bold uppercase transition-all shadow-md active:scale-95 flex items-center justify-center">
                                <ArrowDownTrayIcon className="w-5 h-5 stroke-[3]" />
                            </button>
                            <span className="absolute top-full right-0 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">Download</span>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-auto flex-1 custom-scrollbar border rounded-xl border-gray-100">
                    <table className="w-full text-[13px] border-collapse sticky-header whitespace-nowrap">
                        <thead className="bg-[#F8FAFC] text-[#002D5E] font-black uppercase border-b sticky top-0 z-10 text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left border-r min-w-[60px]">Sr. No.</th>
                                <th className="px-4 py-3 text-left border-r min-w-[60px]">TID</th>
                                <th className="px-4 py-3 text-left border-r min-w-[140px]">Mac Address</th>
                                <th className="px-4 py-3 text-left border-r min-w-[150px]">Device Name</th>
                                <th className="px-4 py-3 text-left border-r min-w-[100px]">Date</th>
                                <th className="px-4 py-3 text-left border-r min-w-[100px]">Time</th>
                                <th className="px-4 py-3 text-left border-r min-w-[120px]">Meter Start Reading</th>
                                <th className="px-4 py-3 text-left border-r min-w-[120px]">Start Balance (Rs)</th>
                                {rColumns.map((r) => (
                                    <th key={r} className="px-4 py-3 text-center border-r min-w-[50px]">{r}</th>
                                ))}
                                <th className="px-4 py-3 text-left border-r min-w-[120px]">End Balance (Rs)</th>
                                <th className="px-4 py-3 text-left border-r min-w-[120px]">Meter End Reading</th>
                                <th className="px-4 py-3 text-center border-r min-w-[100px]">Push Button Count</th>
                                <th className="px-4 py-3 text-center border-r min-w-[80px]">Battery (%)</th>
                                <th className="px-4 py-3 text-center border-r min-w-[80px]">Signal Power</th>
                                <th className="px-4 py-3 text-center border-r min-w-[80px]">Signal Quality</th>
                                <th className="px-4 py-3 text-center border-r min-w-[100px]">Signal Noise Ratio</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedPayloads.length === 0 ? (
                                <tr>
                                    <td colSpan={40} className="px-4 py-10 text-center text-gray-400">
                                        No payloads found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedPayloads.map((row, idx) => (
                                    <tr key={row.id} className="hover:bg-gray-50 transition-colors text-gray-700">
                                        <td className="px-4 py-2 border-r">{idx + 1 + page * rowsPerPage}</td>
                                        <td className="px-4 py-2 border-r">{row.tid}</td>
                                        <td className="px-4 py-2 border-r font-mono text-xs">{row.macAddress}</td>
                                        <td className="px-4 py-2 border-r font-medium">{row.deviceName}</td>
                                        <td className="px-4 py-2 border-r">{row.date}</td>
                                        <td className="px-4 py-2 border-r">{row.time}</td>
                                        <td className="px-4 py-2 border-r">{row.meterStartReading}</td>
                                        <td className="px-4 py-2 border-r">{row.startBalance}</td>
                                        {rColumns.map((r, i) => (
                                            <td key={r} className="px-4 py-2 border-r text-center">{row[`r${i}`]}</td>
                                        ))}
                                        <td className="px-4 py-2 border-r">{row.endBalance}</td>
                                        <td className="px-4 py-2 border-r">{row.meterEndReading}</td>
                                        <td className="px-4 py-2 border-r text-center">{row.pushButtonCount}</td>
                                        <td className="px-4 py-2 border-r text-center">{row.battery}</td>
                                        <td className="px-4 py-2 border-r text-center">{row.signalPower}</td>
                                        <td className="px-4 py-2 border-r text-center">{row.signalQuality}</td>
                                        <td className="px-4 py-2 border-r text-center">{row.signalNoiseRatio}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center gap-4 pt-3 mt-auto border-t border-gray-100 bg-white">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Showing <span className="text-blue-600">{filteredPayloads.length > 0 ? page * rowsPerPage + 1 : 0} - {Math.min((page + 1) * rowsPerPage, filteredPayloads.length)}</span> of <span className="text-gray-900">{filteredPayloads.length}</span> payloads
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
                        >
                            Prev
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium text-gray-700">
                            Page {filteredPayloads.length > 0 ? page + 1 : 0} of {totalPages === 0 ? 1 : totalPages}
                        </span>
                        <button
                            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                            disabled={page >= totalPages - 1}
                            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>


        </div >
    );
};

export default Payloads;
