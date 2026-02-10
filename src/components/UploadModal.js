import React, { useRef, useState } from 'react';
import { CloudArrowUpIcon, DocumentArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const UploadModal = ({ isOpen, onClose, onUpload, title, onDownloadTemplate }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (file) {
            onUpload(file);
            setFile(null); // Reset after upload
        }
    };

    const handleClose = () => {
        setFile(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-[#002D5E] uppercase tracking-wide">
                        {title || "Upload Excel"}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Important Info Box */}
                    <div className="bg-sky-50 border border-sky-100 rounded-lg p-4">
                        <h4 className="text-sky-800 font-bold text-sm mb-2">Important:</h4>
                        <ul className="text-sky-700 text-xs space-y-1 list-disc list-inside">
                            <li>Ensure the file is in Excel format (.xlsx or .xls)</li>
                            <li>Follow the required column structure</li>
                            <li>Maximum file size: 10MB</li>
                        </ul>
                    </div>

                    {/* File Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 block">Select Excel File</label>
                        <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer">
                                <span className="sr-only">Choose File</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-l-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-gray-100 file:text-gray-700
                                    hover:file:bg-gray-200
                                    border border-gray-300 rounded-lg cursor-pointer bg-white"
                                />
                            </label>
                        </div>
                        {/* Template Download Section */}
                        <div className="flex justify-end mt-1">
                            <button
                                onClick={onDownloadTemplate}
                                className="text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] flex items-center gap-1 hover:underline underline-offset-2 transition-all"
                            >
                                <DocumentArrowDownIcon className="w-3.5 h-3.5" />
                                Download Template
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={handleUploadClick}
                            disabled={!file}
                            className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            <CloudArrowUpIcon className="w-5 h-5" />
                            UPLOAD FILE
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
