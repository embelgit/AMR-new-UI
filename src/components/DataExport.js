import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
    DocumentArrowDownIcon,
    DocumentTextIcon,
    TableCellsIcon
} from "@heroicons/react/24/outline";

const DataExport = ({ data, filename = "export", sheetName = "Sheet1" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const exportToCSV = () => {
        if (!data || data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvRows = [];

        // Add headers
        csvRows.push(headers.join(','));

        // Add data rows
        for (const row of data) {
            const values = headers.map(header => {
                const val = row[header];
                const escaped = ('' + val).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsOpen(false);
    };

    const exportToExcel = (fileExtension) => {
        if (!data || data.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        XLSX.writeFile(workbook, `${filename}.${fileExtension}`);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all border border-slate-300 bg-white shadow-sm flex items-center gap-2 hover:border-slate-400"
                title="Export Data"
            >
                <DocumentArrowDownIcon className="w-5 h-5 text-blue-600" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-slate-100 transform origin-top-right transition-all">
                    <div className="py-1">
                        <button
                            onClick={exportToCSV}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 group"
                        >
                            <DocumentTextIcon className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
                            <span className="font-medium">Export data to CSV...</span>
                        </button>
                        <button
                            onClick={() => exportToExcel('xls')}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 group"
                        >
                            <TableCellsIcon className="w-5 h-5 text-slate-400 group-hover:text-green-600" />
                            <span className="font-medium">Export data to XLS...</span>
                        </button>
                        <button
                            onClick={() => exportToExcel('xlsx')}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors group"
                        >
                            <TableCellsIcon className="w-5 h-5 text-slate-400 group-hover:text-green-700 font-bold" />
                            <span className="font-medium">Export data to XLSX...</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataExport;
