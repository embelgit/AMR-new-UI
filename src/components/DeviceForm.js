import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Dummy data for dropdowns
const ADMINS = [
    { id: 1, name: "Admin One" },
    { id: 2, name: "Admin Two" },
];

const USERS = [
    { id: 1, name: "User A (Under Admin 1)", adminId: 1 },
    { id: 2, name: "User B (Under Admin 1)", adminId: 1 },
    { id: 3, name: "User C (Under Admin 2)", adminId: 2 },
];

const TECH_TYPES = ["4G", "WIFI", "ETHERNET", "LORA"];
const METER_TYPES = ["SOLAR", "GAS", "WATER", "ELECTRIC"];
const BILL_TYPES = ["Prepaid", "Postpaid"];
const TIMEZONES = ["Asia/Kolkata", "UTC", "America/New_York"];
const APPLICATIONS = ["Residential", "Commercial", "Industrial"];
const DIAMETERS = ["15mm", "20mm", "25mm", "40mm", "50mm"];

const DeviceForm = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        // Allocation
        adminId: "",
        userId: "",
        // Metadata
        techType: "",
        meterType: "",
        deviceId: "",
        macAddress: "",
        deviceName: "",
        serialNumber: "",
        billType: "",
        // Enable
        amrEnable: false,
        // Configuration
        wakeUpTime: "",
        dataSampleCount: 0,
        timezone: "Asia/Kolkata",
        literPerPulse: "",
        // Information
        application: "",
        type: "",
        diameter: "",
        customerName: "",
        customerAddress: "",
        meterLocation: "",
        building: "",
        area: "",
        zone: "",
        city: "",
        state: "",
        startReading: "",
    });

    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Filter users when admin is selected
    useEffect(() => {
        if (formData.adminId) {
            setFilteredUsers(USERS.filter((u) => u.adminId === parseInt(formData.adminId)));
        } else {
            setFilteredUsers([]);
        }
    }, [formData.adminId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.adminId) {
            alert("Admin is required");
            return;
        }
        if (!formData.deviceId || !formData.macAddress || !formData.meterType) {
            alert("Device ID, MAC Address and Meter Type are required");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-bold text-slate-800">
                        {initialData ? "Edit Device" : "Add New Device"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    <form id="deviceForm" onSubmit={handleSubmit}>

                        {/* 1. DEVICE ALLOCATION */}
                        <section>
                            <h3 className="text-blue-900 font-bold uppercase mb-4 text-sm tracking-wider border-b pb-2">
                                Device Allocation
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Admin List<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="adminId"
                                        value={formData.adminId}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    >
                                        <option value="">Select Admin...</option>
                                        {ADMINS.map((admin) => (
                                            <option key={admin.id} value={admin.id}>
                                                {admin.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        User List <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                                    </label>
                                    <select
                                        name="userId"
                                        value={formData.userId}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        disabled={!formData.adminId}
                                    >
                                        <option value="">Select User...</option>
                                        {filteredUsers.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* 2. DEVICE METADATA */}
                        <section>
                            <h3 className="text-blue-900 font-bold uppercase mb-4 text-sm tracking-wider border-b pb-2 mt-2">
                                Device Metadata
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Device Technology Type<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="techType"
                                        value={formData.techType}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    >
                                        <option value="">Select Technology Type...</option>
                                        {TECH_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Meter Type<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="meterType"
                                        value={formData.meterType}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    >
                                        <option value="">Select Meter Type...</option>
                                        {METER_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Enter Device ID<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="deviceId"
                                        value={formData.deviceId}
                                        onChange={handleChange}
                                        placeholder="Device ID"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Enter Device MACID<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="macAddress"
                                        value={formData.macAddress}
                                        onChange={handleChange}
                                        placeholder="Device MACID"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Device Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="deviceName"
                                        value={formData.deviceName}
                                        onChange={handleChange}
                                        placeholder="Device Name"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Device Serial Number
                                    </label>
                                    <input
                                        type="text"
                                        name="serialNumber"
                                        value={formData.serialNumber}
                                        onChange={handleChange}
                                        placeholder="Device Serial Number"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Bill Type<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="billType"
                                        value={formData.billType}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    >
                                        <option value="">Select Bill Type...</option>
                                        {BILL_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* 3. DEVICE ENABLE */}
                        <section>
                            <h3 className="text-blue-900 font-bold uppercase mb-4 text-sm tracking-wider border-b pb-2 mt-2">
                                Device Enable
                            </h3>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="amrEnable"
                                    name="amrEnable"
                                    checked={formData.amrEnable}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                                <label htmlFor="amrEnable" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    AMR Enable
                                </label>
                            </div>
                        </section>

                        {/* 4. DEVICE CONFIGURATION */}
                        <section>
                            <h3 className="text-blue-900 font-bold uppercase mb-4 text-sm tracking-wider border-b pb-2 mt-2">
                                Device Configuration
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Wakeup Time<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="wakeUpTime"
                                        value={formData.wakeUpTime}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Data Sample Count
                                    </label>
                                    <input
                                        type="number"
                                        name="dataSampleCount"
                                        value={formData.dataSampleCount}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Timezone
                                    </label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        {TIMEZONES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Liter Per Pulse<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="literPerPulse"
                                        value={formData.literPerPulse}
                                        onChange={handleChange}
                                        placeholder="Liter Per Pulse"
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 5. DEVICE INFORMATION */}
                        <section>
                            <h3 className="text-blue-900 font-bold uppercase mb-4 text-sm tracking-wider border-b pb-2 mt-2">
                                Device Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Application of AMR
                                    </label>
                                    <select
                                        name="application"
                                        value={formData.application}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="">Select option</option>
                                        {APPLICATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="">Select option</option>
                                        <option value="Type A">Type A</option>
                                        <option value="Type B">Type B</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">
                                        Diameter Size
                                    </label>
                                    <select
                                        name="diameter"
                                        value={formData.diameter}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="">Select option</option>
                                        {DIAMETERS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Device Customer Name</label>
                                    <input
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Device Customer Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Device Customer Address</label>
                                    <input
                                        name="customerAddress"
                                        value={formData.customerAddress}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Device Customer Address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Device Meter Location</label>
                                    <input
                                        name="meterLocation"
                                        value={formData.meterLocation}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Device Meter Location"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Building Or Wing</label>
                                    <input
                                        name="building"
                                        value={formData.building}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Building or Wing"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Area</label>
                                    <input
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Area"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Zone</label>
                                    <input
                                        name="zone"
                                        value={formData.zone}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="Zone"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">State</label>
                                    <input
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Meter Start Reading<span className="text-red-500">*</span></label>
                                    <input
                                        name="startReading"
                                        value={formData.startReading}
                                        onChange={handleChange}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Meter Start Reading"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-white flex justify-end gap-3 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="deviceForm"
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all text-sm uppercase tracking-wide"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceForm;
