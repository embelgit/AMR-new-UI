import { useState, useMemo, useEffect, useCallback } from "react";
import UploadModal from "../components/UploadModal";
import authService from "../services/authService";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ClipboardIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const PAGE_SIZE = 10;

const Users = () => {
  // const navigate = useNavigate();
  const loginUserRole = localStorage.getItem("role"); // ADMIN, SUPER_ADMIN, USER
  const loginUsername = localStorage.getItem("username") || "tejal2909"; // Fallback as per user example

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0); // 0-indexed for backend

  /* ---------------- STATE ---------------- */
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isInactiveView, setIsInactiveView] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    name: "",
    email: "",
    password: "",
    mobileno: "",
    address: "",
    role: loginUserRole === "ADMIN" ? "USER" : "",
    assignedMeters: [] // New field for meter assignments
  });

  // Side Panel State
  const [detailsUser, setDetailsUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  // Toast
  const [toast, setToast] = useState({ message: "", type: "" });
  const [showToast, setShowToast] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Role-based filtering:
      // - SUPER_ADMIN: see all users (createdBy = null)
      // - ADMIN: see only users they created (createdBy = their username)
      const createdByParam = loginUserRole === "SUPER_ADMIN" ? null : loginUsername;

      const response = await authService.getUserList(createdByParam, page, PAGE_SIZE);

      // The API returns a list or a page object. Based on the user request, it's likely a Page or similar.
      // If it's a direct array, we wrap it. If it's a Page object, we use its properties.
      const data = response.content || response;
      setUsers(Array.isArray(data) ? data : []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      triggerToast("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  }, [page, loginUsername, loginUserRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.username || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = filteredUsers; // Backend handles pagination

  /* ---------------- ACTIONS ---------------- */
  const openCreate = () => {
    setEditingUser(null);
    setForm({
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      password: "",
      mobileno: "",
      address: "",
      role: loginUserRole === "ADMIN" ? "USER" : "",
      assignedMeters: []
    });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      ...user,
      assignedMeters: user.assignedMeters || []
    });
    setShowModal(true);
  };

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const saveUser = async () => {
    if (!form.firstName || !form.email || !form.password || !form.role) {
      triggerToast("Missing required fields", "warning");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...form,
        name: form.firstName, // As requested, name should be present
        mobileno: parseInt(form.mobileno) || 0
      };

      if (editingUser) {
        // Handle update if API exists, otherwise skip for now as only create was requested
        triggerToast("Update functionality not implemented yet", "info");
      } else {
        await authService.createUser(payload);
        alert("user create successfully");
        triggerToast("User created successfully. Credentials sent to mail.", "success");
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to save user";
      triggerToast(errorMsg, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteUser = async (id) => {
    // API for delete not specified, skipping for now to avoid errors
    triggerToast("Delete functionality not integrated", "info");
  };

  const handleDownloadList = () => {
    if (users.length === 0) return;

    const headers = ["SR. NO.", "FIRST NAME", "LAST NAME", "EMAIL", "PHONE", "ROLE ID", "ADDRESS", "STATUS"];
    const rows = users.map((u, idx) => [
      idx + 1, u.firstName, u.lastName, u.email, u.mobileno || "", u.role, u.address || "", u.active ? "Active" : "Inactive"
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) alert("File selected");
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const onUploadFile = (file) => {
    alert(`File "${file.name}" selected for upload.`);
    setShowUploadModal(false);
  };

  const handleDownloadTemplate = () => {
    const headers = [
      "FIRST NAME", "LAST NAME", "USERNAME", "EMAIL", "PASSWORD", "MOBILE NO", "ROLE"
    ];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*
  const toggleActive = async (id) => {
    // API for status toggle not specified, skipping for now
    triggerToast("Status toggle not integrated", "info");
  };
  */

  /* ---------------- UI ---------------- */
  return (
    <div className="relative flex flex-col h-[calc(100vh-120px)] overflow-hidden">
      {/* USERS CARD */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-5 space-y-4 flex-1 flex flex-col w-full h-full overflow-hidden">
        {/* HEADER */}
        {/* HEADER */}
        <div className="flex flex-row justify-between items-center gap-4 mb-2 bg-gray-50/50 -mx-4 -mt-4 p-4 border-b rounded-t-lg">
          <div className="flex items-center gap-4 shrink-0">
            <h1 className="text-xl font-black text-[#002D5E] uppercase tracking-tight">
              {isInactiveView ? "Inactive " : ""}Users
            </h1>
            {loginUserRole === "SUPER_ADMIN" && (
              <button
                onClick={() => { setIsInactiveView(!isInactiveView); setPage(0); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 border ${isInactiveView ? 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100' : 'bg-white text-slate-500 border-gray-200 hover:bg-gray-50'}`}
              >
                {isInactiveView ? "Show Active" : "Show Inactive"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="relative w-full max-w-[400px]">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search User..."
                className="pl-9 pr-3 py-2 w-full border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white shadow-sm transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="user-upload-input"
                type="file"
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={onFileChange}
              />

              {/* ADD USER BUTTON */}
              <div className="relative group">
                <button
                  onClick={openCreate}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                  <PlusIcon className="w-5 h-5 stroke-[3]" />
                </button>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  Add User
                </span>
              </div>

              {/* DOWNLOAD BUTTON */}
              <div className="relative group">
                <button
                  onClick={handleDownloadList}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 stroke-[3]" />
                </button>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  Download List
                </span>
              </div>

              {/* UPLOAD BUTTON */}
              <div className="relative group">
                <button
                  onClick={handleUploadClick}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white p-2 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center"
                >
                  <ArrowUpTrayIcon className="w-5 h-5 stroke-[3]" />
                </button>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  Upload Excel
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded border flex-1 custom-scrollbar">
          <table className="w-full text-[13px] min-w-[1000px] border-collapse sticky-header">
            <thead className="bg-[#F8FAFC] text-[#002D5E] font-black uppercase border-b sticky top-0 z-10 text-sm">
              <tr className="text-[#002D5E] font-black uppercase text-sm">

                <th className="px-3 py-1.5 text-left border-r w-16 text-center">NO.</th>
                <th className="px-3 py-1.5 text-left border-r">FIRST NAME</th>
                <th className="px-3 py-1.5 text-left border-r">LAST NAME</th>
                <th className="px-3 py-1.5 text-left border-r">EMAIL</th>
                <th className="px-3 py-1.5 text-left border-r">PHONE</th>
                <th className="px-3 py-1.5 text-left border-r">ROLE ID</th>
                <th className="px-3 py-1.5 text-left border-r">ADDRESS</th>
                <th className="px-3 py-1.5 text-left border-r">STATUS</th>
                <th className="px-3 py-1.5 text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-10 text-center text-gray-400">Loading users...</td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-10 text-center text-gray-400">No users found.</td>
                </tr>
              ) : paginatedUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  onClick={() => setDetailsUser(user)}
                  className={`cursor-pointer transition-colors text-gray-700 ${detailsUser?.id === user.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <td className="px-3 py-1.5 border-r text-gray-700">{idx + 1 + page * 10}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.firstName}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.lastName}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.email}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.mobileno || "-"}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.role}</td>
                  <td className="px-3 py-1.5 border-r truncate max-w-[200px] text-gray-700">{user.address || "-"}</td>
                  <td className="px-3 py-1.5 border-r text-gray-700">{user.active ? "Active" : "Inactive"}</td>
                  <td className="px-3 py-1.5 flex justify-end gap-2">
                    <button onClick={(e) => { e.stopPropagation(); openEdit(user); }} className="hover:bg-blue-50 p-1 rounded transition-colors active:scale-90" title="Edit">
                      <PencilIcon className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }} className="hover:bg-red-50 p-1 rounded transition-colors active:scale-90" title="Delete">
                      <TrashIcon className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="flex justify-between items-center gap-4 pt-2 border-t">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Showing <span className="text-blue-600">{filteredUsers.length > 0 ? page * PAGE_SIZE + 1 : 0} - {Math.min((page + 1) * PAGE_SIZE, filteredUsers.length)}</span> of <span className="text-gray-900">{filteredUsers.length}</span> users
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
            >
              Prev
            </button>

            <span className="px-3 py-1.5 text-sm font-medium text-gray-700">
              Page {filteredUsers.length > 0 ? page + 1 : 0} of {totalPages === 0 ? 1 : totalPages}
            </span>

            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 border rounded text-sm disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={onUploadFile}
        title="UPLOAD USERS EXCEL"
        onDownloadTemplate={handleDownloadTemplate}
      />

      {/* RIGHT CONTENT - DETAILS DRAWER */}
      {detailsUser && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300"
            onClick={() => setDetailsUser(null)}
          />

          <div
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.15)] z-[70] flex flex-col transition-transform duration-300 ease-in-out"
          >
            {/* BLUE HEADER */}
            <div className="bg-blue-600 text-white p-6 pr-16 flex justify-between items-start shrink-0 relative">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight leading-tight truncate max-w-[350px]">
                  {detailsUser.email}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-blue-500/50 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-blue-400/30">
                    User Details
                  </span>
                  <span className="text-blue-100 text-[10px] font-bold opacity-80 uppercase">
                    Role: {detailsUser.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setDetailsUser(null)}
                className="absolute top-6 right-6 bg-white text-blue-600 p-2.5 rounded-2xl shadow-2xl hover:bg-blue-50 transition-all z-[80] active:scale-90 border border-blue-100 flex items-center justify-center group"
                title="Close Details"
              >
                <XMarkIcon className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* TABS */}
            <div className="flex border-b border-gray-200 bg-white shrink-0 overflow-x-auto custom-scrollbar">
              {["Details", "Attributes", "Telemetry", "Alarms", "Events", "Relations", "Audit"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-[10px] font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-all active:bg-gray-50
                  ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"}
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
                      <div className="text-sm text-gray-700 font-medium">{detailsUser.firstName || detailsUser.name}</div>
                    </div>
                    <div className="bg-white p-2 border-b border-gray-200">
                      <label className="text-[10px] text-gray-400 font-semibold block uppercase">Last Name</label>
                      <div className="text-sm text-gray-700 font-medium">{detailsUser.lastName || ""}</div>
                    </div>
                    <div className="bg-white p-2 border-b border-gray-200">
                      <label className="text-[10px] text-gray-400 font-semibold block uppercase">Username</label>
                      <div className="text-sm text-gray-700 font-medium">{detailsUser.username || ""}</div>
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
        </>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white w-[450px] rounded-2xl shadow-2xl p-6 border border-slate-100 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                {editingUser ? "Edit Account" : "Create New Account"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">First Name</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="e.g. Tejaswini"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Last Name</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="e.g. Bhangare"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Email Address</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="e.g. tejaswini@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Password</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Mobile No</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="e.g. 9871753211"
                  value={form.mobileno}
                  onChange={(e) => setForm({ ...form, mobileno: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Address</label>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="e.g. Pune, Maharashtra"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Account Role</label>
                <div className="relative">
                  <select
                    disabled={loginUserRole === "ADMIN"}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none disabled:opacity-70"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="USER">USER (General access)</option>
                    {loginUserRole === "SUPER_ADMIN" && <option value="ADMIN">ADMIN (Manager access)</option>}
                  </select>
                  <ChevronDownIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* METER ASSIGNMENTS (Only for Admin) */}
              {form.role === "ADMIN" && (
                <div className="col-span-2 space-y-2 mt-2">
                  <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Meter Assignments</label>
                  <div className="flex flex-wrap gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    {['SOLAR', 'WATER', 'GAS', 'ELECTRIC'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.assignedMeters.includes(type)}
                          onChange={(e) => {
                            const newAssigned = e.target.checked
                              ? [...form.assignedMeters, type]
                              : form.assignedMeters.filter(t => t !== type);
                            setForm({ ...form, assignedMeters: newAssigned });
                          }}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs font-bold text-slate-700">{type === 'ELECTRIC' ? 'ENERGY' : type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                disabled={isSaving}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  editingUser ? "Update" : "Create Account"
                )}
              </button>
            </div>
          </div>
        </div >
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
    </div >
  );
};

export default Users;


