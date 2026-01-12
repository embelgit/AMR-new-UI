import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

const PAGE_SIZE = 5;

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@test.com", role: "ADMIN", active: true, address: "123 Admin St, Mumbai" },
    { id: 2, name: "Normal User", email: "user@test.com", role: "USER", active: true, address: "456 User Ln, Delhi" },
    { id: 3, name: "Test User", email: "test@test.com", role: "USER", active: false, address: "789 Test Ave, Bangalore" },
    { id: 4, name: "Demo User", email: "demo@test.com", role: "USER", active: true, address: "101 Demo Rd, Chennai" },
    { id: 5, name: "Support User", email: "support@test.com", role: "ADMIN", active: true, address: "202 Support Blvd, Pune" },
    { id: 6, name: "QA User", email: "qa@test.com", role: "USER", active: false, address: "303 QA Dr, Hyderabad" },
    { id: 7, name: "QA User", email: "qa@test.com", role: "USER", active: false, address: "404 QA Way, Kolkata" },

  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "", active: true, address: "", password: "" });

  // Side Panel State
  const [detailsUser, setDetailsUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  // Toast
  const [toast, setToast] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  /* ---------------- FILTER + PAGINATION ---------------- */
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- ACTIONS ---------------- */
  const openCreate = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", role: "", active: true, address: "", password: "" });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm(user);
    setShowModal(true);
  };

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const saveUser = () => {
    if (!form.name || !form.email) {
      triggerToast("Name and Email are required", "warning");
      return;
    }

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? form : u)));
      triggerToast("User updated successfully", "success");
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
      triggerToast("User created successfully", "success");
    }
    setShowModal(false);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    triggerToast("User deleted successfully", "error");
  };

  const toggleActive = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, active: !u.active } : u
      )
    );
    triggerToast("User status updated", "success");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 relative flex gap-4 h-[calc(100vh-80px)]">
      {/* USERS CARD */}
      <div className={`bg-white rounded-lg shadow p-5 space-y-5 flex-1 flex flex-col transition-all duration-300 ${detailsUser ? "w-2/3" : "w-full"}`}>
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Users</h1>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            <PlusIcon className="w-5 h-5" />
            Create User
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
            placeholder="Search users..."
            className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setDetailsUser(user)}
                  className={`border-t cursor-pointer transition-colors ${detailsUser?.id === user.id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-50"}`}
                >
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">{user.address || "-"}</td>

                  {/* ACTIVE / INACTIVE */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${user.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="px-4 py-3 flex justify-end gap-3">
                    <button onClick={() => openEdit(user)}>
                      <PencilIcon className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => deleteUser(user.id)}>
                      <TrashIcon className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No users found
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

      {/* RIGHT CONTENT - DETAILS PANEL */}
      {detailsUser && (
        <div className="w-[450px] bg-white text-sm shadow-2xl border-l border-gray-200 flex flex-col transition-all duration-300 animate-slide-in z-20 h-full">
          {/* BLUE HEADER */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-lg font-medium">{detailsUser.email}</h2>
              <p className="text-blue-200 text-xs mt-1">User details</p>
            </div>
            <button
              onClick={() => setDetailsUser(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* TABS */}
          <div className="flex border-b border-gray-200 bg-white shrink-0 overflow-x-auto">
            {["Details", "Attributes", "Latest telemetry", "Alarms", "Events", "Relations", "Audit logs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-xs font-medium uppercase tracking-wide whitespace-nowrap border-b-2 transition-colors
                  ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
            {/* DETAILS TAB */}
            {activeTab === "Details" && (
              <>
                <div className="space-y-3 mb-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm transition-colors uppercase block w-full text-center">
                    Open details page
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 uppercase w-full">
                    <ClipboardIcon className="w-4 h-4 bg-black text-white rounded p-0.5" />
                    Copy user Id
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Email*</label>
                    <div className="text-sm text-gray-700 font-medium">{detailsUser.email}</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">First Name</label>
                    <div className="text-sm text-gray-700 font-medium">{detailsUser.name.split(" ")[0]}</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Last Name</label>
                    <div className="text-sm text-gray-700 font-medium">{detailsUser.name.split(" ")[1] || ""}</div>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Description</label>
                    <textarea className="w-full h-16 p-0 bg-transparent outline-none resize-none text-sm text-gray-700" placeholder="Add description"></textarea>
                  </div>
                  <div className="bg-white p-2 border-b border-gray-200">
                    <label className="text-[10px] text-gray-400 font-semibold block uppercase">Default Dashboard</label>
                    <div className="text-blue-600 text-sm cursor-pointer hover:underline">Main Dashboard</div>
                  </div>
                </div>
              </>
            )}

            {/* ATTRIBUTES TAB */}
            {activeTab === "Attributes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase">Server Attributes</h3>
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><PlusIcon className="w-4 h-4" /></button>
                </div>
                <div className="text-center py-8 text-gray-400 italic text-xs">No attributes found</div>
              </div>
            )}
            {/* ALARMS TAB */}
            {activeTab === "Alarms" && (
              <div className="space-y-3">
                <div className="text-center py-8 text-gray-400 italic text-xs">No alarms found</div>
              </div>
            )}
            {/* EVENTS TAB */}
            {activeTab === "Events" && (
              <div className="space-y-2">
                <div className="text-center py-8 text-gray-400 italic text-xs">No events found</div>
              </div>
            )}
            {/* RELATIONS TAB */}
            {activeTab === "Relations" && (
              <div className="space-y-4">
                <div className="p-4 bg-white border rounded text-center">
                  <div className="text-blue-600 font-bold text-lg mb-1">{detailsUser.name}</div>
                  <div className="text-xs text-gray-400">Current User</div>
                </div>
              </div>
            )}
            {/* AUDIT LOGS TAB */}
            {activeTab === "Audit logs" && (
              <div className="space-y-2">
                {[
                  { user: "System Administrator", action: "User Created", time: "2 days ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs p-3 bg-white border-b last:border-0 hover:bg-gray-50">
                    <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 font-bold shrink-0">
                      {log.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{log.action}</div>
                      <div className="text-gray-500">{log.user} • {log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* LATEST TELEMETRY TAB */}
            {activeTab === "Latest telemetry" && (
              <div className="space-y-2">
                <div className="text-center py-8 text-gray-400 italic text-xs">No telemetry data found</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            <input
              className="input mb-3 w-full border px-3 py-2 rounded"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="input mb-3 w-full border px-3 py-2 rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="input mb-3 w-full border px-3 py-2 rounded"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              className="input mb-3 w-full border px-3 py-2 rounded"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <select
              className="input mb-3 w-full border px-3 py-2 rounded"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="" disabled>Select the Role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSTAGRAM-STYLE CENTERED TOAST */}
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

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes toastAnimation {
            0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
            50% { opacity: 1; transform: translateY(0) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes toastFadeOut {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.95); }
          }

          .animate-toast {
            animation: toastAnimation 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Users;


