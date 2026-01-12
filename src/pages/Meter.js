

import { useState, useMemo } from "react";
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import MeterDetails from "../components/MeterDetails";

// Custom Dropdown Component
const CustomSelect = ({ value, onChange, options, placeholder, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="input flex items-center justify-between text-left bg-white w-full"
            >
                <span className="text-gray-900">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-900 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const PAGE_SIZE = 5;

const meterTypes = ["SOLAR", "GAS", "WATER", "ELECTRIC"];
const roles = ["USER", "ADMIN"];
const meterStatuses = ["ACTIVE", "INACTIVE", "MAINTENANCE"];

const dummyMeters = [
    { id: 1, meterNumber: "MTR-001", meterType: "SOLAR", assignedToRole: "USER", assignedToUsername: "john_doe", siteName: "Site A", city: "Mumbai", state: "Maharashtra", status: "ACTIVE", batteryLevel: 95, online: true },
    { id: 2, meterNumber: "MTR-002", meterType: "GAS", assignedToRole: "ADMIN", assignedToUsername: "admin_user", siteName: "Site B", city: "Pune", state: "Maharashtra", status: "INACTIVE", batteryLevel: 80, online: false },
    { id: 3, meterNumber: "MTR-003", meterType: "WATER", assignedToRole: "USER", assignedToUsername: "alice", siteName: "Site C", city: "Delhi", state: "Delhi", status: "FAULTY", batteryLevel: 60, online: true },
    { id: 4, meterNumber: "MTR-004", meterType: "ELECTRIC", assignedToRole: "USER", assignedToUsername: "bob", siteName: "Site D", city: "Bengaluru", state: "Karnataka", status: "MAINTENANCE", batteryLevel: 70, online: false },
    { id: 5, meterNumber: "MTR-005", meterType: "SOLAR", assignedToRole: "ADMIN", assignedToUsername: "superadmin", siteName: "Site E", city: "Chennai", state: "Tamil Nadu", status: "REPLACED", batteryLevel: 100, online: true },
];

const Meters = () => {
    const [meters, setMeters] = useState(dummyMeters);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [editingMeter, setEditingMeter] = useState(null);
    const [selectedMeter, setSelectedMeter] = useState(null); // State for detailed view
    const [form, setForm] = useState({
        meterNumber: "",
        meterType: "",
        assignedToRole: "",
        assignedToUsername: "",
        siteName: "",
        city: "",
        state: "",
        status: "",
        batteryLevel: null,
        online: true
    });

    // Toast
    const [toast, setToast] = useState({ message: "", type: "" });
    const [showToast, setShowToast] = useState(false);

    /* ---------------- FILTER + PAGINATION ---------------- */
    const filteredMeters = useMemo(() => {
        return meters.filter(
            (m) =>
                m.meterNumber.toLowerCase().includes(search.toLowerCase()) ||
                m.assignedToUsername.toLowerCase().includes(search.toLowerCase()) ||
                m.siteName.toLowerCase().includes(search.toLowerCase())
        );
    }, [meters, search]);

    const totalPages = Math.ceil(filteredMeters.length / PAGE_SIZE);

    const paginatedMeters = filteredMeters.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    /* ---------------- ACTIONS ---------------- */
    const openCreate = () => {
        setEditingMeter(null);
        setForm({
            meterNumber: "",
            meterType: "",
            assignedToRole: "",
            assignedToUsername: "",
            siteName: "",
            city: "",
            state: "",
            status: "",
            batteryLevel: null,
            online: true
        });
        setShowModal(true);
    };

    const openEdit = (meter) => {
        setEditingMeter(meter);
        setForm(meter);
        setShowModal(true);
    };

    const triggerToast = (message, type = "success") => {
        setToast({ message, type });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const saveMeter = () => {
        if (!form.meterNumber || !form.assignedToUsername) {
            triggerToast("Meter Number and Assigned Username are required", "warning");
            return;
        }

        if (editingMeter) {
            setMeters(meters.map((m) => (m.id === editingMeter.id ? form : m)));
            triggerToast("Meter updated successfully", "success");
        } else {
            setMeters([...meters, { ...form, id: Date.now() }]);
            triggerToast("Meter created successfully", "success");
        }
        setShowModal(false);
    };

    const deleteMeter = (e, id) => {
        e.stopPropagation();
        setMeters(meters.filter((m) => m.id !== id));
        triggerToast("Meter deleted successfully", "error");
    };

    const toggleOnline = (e, id) => {
        e.stopPropagation();
        setMeters(meters.map((m) => (m.id === id ? { ...m, online: !m.online } : m)));
        triggerToast("Meter online status updated", "success");
    };

    /* ---------------- UI ---------------- */
    return (
        <div className="relative">
            {/* METERS CARD */}
            {selectedMeter ? (
                <MeterDetails meter={selectedMeter} onBack={() => setSelectedMeter(null)} />
            ) : (
                <div className="bg-white rounded-lg shadow p-5 space-y-5">
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold text-gray-800">Meters</h1>

                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Create Meter
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div className="relative w-72">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search meters..."
                            className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-md border">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 text-left">Meter Number</th>
                                    <th className="px-4 py-3 text-left">Type</th>
                                    <th className="px-4 py-3 text-left">Assigned To</th>
                                    <th className="px-4 py-3 text-left">Site</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Battery</th>
                                    <th className="px-4 py-3 text-left">Online</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedMeters.map((m) => (
                                    <tr
                                        key={m.id}
                                        className="border-t hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setSelectedMeter(m)}
                                    >
                                        <td className="px-4 py-3 font-medium">{m.meterNumber}</td>
                                        <td className="px-4 py-3">{m.meterType}</td>
                                        <td className="px-4 py-3">{m.assignedToUsername} ({m.assignedToRole})</td>
                                        <td className="px-4 py-3">{m.siteName}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${m.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : m.status === "INACTIVE"
                                                    ? "bg-gray-100 text-gray-700"
                                                    : m.status === "FAULTY"
                                                        ? "bg-red-100 text-red-700"
                                                        : m.status === "REPLACED"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {m.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{m.batteryLevel}%</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={(e) => toggleOnline(e, m.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${m.online ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                                                    }`}
                                            >
                                                {m.online ? "Online" : "Offline"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 flex justify-end gap-3">
                                            <button onClick={(e) => { e.stopPropagation(); openEdit(m); }}>
                                                <PencilIcon className="w-4 h-4 text-blue-600" />
                                            </button>
                                            <button onClick={(e) => deleteMeter(e, m.id)}>
                                                <TrashIcon className="w-4 h-4 text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {paginatedMeters.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                                            No meters found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-end gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="px-3 py-1.5 text-sm">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-96 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingMeter ? "Edit Meter" : "Create Meter"}
                        </h2>

                        <input
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            placeholder="Meter Number"
                            value={form.meterNumber}
                            onChange={(e) => setForm({ ...form, meterNumber: e.target.value })}
                        />

                        <select
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            value={form.meterType}
                            onChange={(e) => setForm({ ...form, meterType: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Meter Type
                            </option>
                            {meterTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>


                        <input
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            placeholder="Assigned Username"
                            value={form.assignedToUsername}
                            onChange={(e) => setForm({ ...form, assignedToUsername: e.target.value })}
                        />

                        <select
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            value={form.assignedToRole}
                            onChange={(e) => setForm({ ...form, assignedToRole: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            {roles.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>


                        <input
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            placeholder="Site Name"
                            value={form.siteName}
                            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                        />

                        <input
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />

                        <select
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Status
                            </option>
                            {meterStatuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>


                        {/* <input
                            type="number"
                            className="input mb-3 w-full border px-3 py-2 rounded"
                            placeholder="Battery Level"
                            value={form.batteryLevel}
                            onChange={(e) => setForm({ ...form, batteryLevel: Number(e.target.value) })}
                        /> */}
                        <CustomSelect
                            className="mb-3"
                            value={form.batteryLevel}
                            onChange={(value) => setForm({ ...form, batteryLevel: value })}
                            options={[
                                { value: 25, label: "25%" },
                                { value: 50, label: "50%" },
                                { value: 75, label: "75%" },
                                { value: 100, label: "100%" }
                            ]}
                            placeholder="Select Battery Level"
                        />


                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                checked={form.online}
                                onChange={(e) => setForm({ ...form, online: e.target.checked })}
                            />
                            <label>Online</label>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveMeter}
                                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                {showToast && (
                    <div
                        className={`px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium pointer-events-auto
              ${toast.type === "success"
                                ? "bg-green-600"
                                : toast.type === "error"
                                    ? "bg-red-600"
                                    : "bg-yellow-500"
                            }
              animate-toast
            `}
                    >
                        {toast.message}
                    </div>
                )}
            </div>

            <style>
                {`
          @keyframes toastAnimation {
            0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
            50% { opacity: 1; transform: translateY(0) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-toast {
            animation: toastAnimation 0.4s ease-out forwards;
          }
        `}
            </style>
        </div>
    );
};

export default Meters;