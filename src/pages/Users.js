// import { useEffect, useState } from "react";
// import UserModal from "../components/UserModal";
// import axios from "axios";

// const Users = () => {
//   const role = localStorage.getItem("role");

//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editUser, setEditUser] = useState(null);

//   const fetchUsers = async () => {
//     const res = await axios.get("http://localhost:8080/api/users", {
//       headers: { role }
//     });
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;

//     await axios.delete(`http://localhost:8080/api/users/${id}`, {
//       headers: { role }
//     });

//     fetchUsers();
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Users</h1>

//         {(role === "SUPER_ADMIN" || role === "ADMIN") && (
//           <button
//             onClick={() => {
//               setEditUser(null);
//               setOpen(true);
//             }}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             + Create User
//           </button>
//         )}
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-t">
//                 <td className="p-3">
//                   {u.firstName} {u.lastName}
//                 </td>
//                 <td>{u.email}</td>
//                 <td>{u.role}</td>

//                 <td className="text-center space-x-2">
//                   {(role === "SUPER_ADMIN" ||
//                     (role === "ADMIN" && u.role === "USER")) && (
//                     <>
//                       <button
//                         onClick={() => {
//                           setEditUser(u);
//                           setOpen(true);
//                         }}
//                         className="text-blue-600"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(u.id)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {open && (
//         <UserModal
//           onClose={() => setOpen(false)}
//           editUser={editUser}
//           refresh={fetchUsers}
//         />
//       )}
//     </div>
//   );
// };

// export default Users;

// import { useState } from "react";
// import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// const Users = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Admin User", email: "admin@test.com", role: "ADMIN" },
//     { id: 2, name: "Normal User", email: "user@test.com", role: "USER" },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", role: "USER" });

//   const openCreate = () => {
//     setEditingUser(null);
//     setForm({ name: "", email: "", role: "USER" });
//     setShowModal(true);
//   };

//   const openEdit = (user) => {
//     setEditingUser(user);
//     setForm(user);
//     setShowModal(true);
//   };

//   const saveUser = () => {
//     if (editingUser) {
//       setUsers(users.map(u => (u.id === editingUser.id ? form : u)));
//     } else {
//       setUsers([...users, { ...form, id: Date.now() }]);
//     }
//     setShowModal(false);
//   };

//   const deleteUser = (id) => {
//     setUsers(users.filter(u => u.id !== id));
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Users</h1>
//         <button
//           onClick={openCreate}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           <PlusIcon className="w-5 h-5" />
//           Create User
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Email</th>
//               <th className="p-3">Role</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id} className="border-t">
//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>
//                 <td className="p-3">{user.role}</td>
//                 <td className="p-3 flex gap-2">
//                   <button onClick={() => openEdit(user)}>
//                     <PencilIcon className="w-4 h-4 text-blue-600" />
//                   </button>
//                   <button onClick={() => deleteUser(user.id)}>
//                     <TrashIcon className="w-4 h-4 text-red-600" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white w-96 p-6 rounded">
//             <h2 className="text-lg font-semibold mb-4">
//               {editingUser ? "Edit User" : "Create User"}
//             </h2>

//             <input
//               className="w-full border p-2 mb-3"
//               placeholder="Name"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               className="w-full border p-2 mb-3"
//               placeholder="Email"
//               value={form.email}
//               onChange={e => setForm({ ...form, email: e.target.value })}
//             />

//             <select
//               className="w-full border p-2 mb-4"
//               value={form.role}
//               onChange={e => setForm({ ...form, role: e.target.value })}
//             >
//               <option>USER</option>
//               <option>ADMIN</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveUser}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;

// import { useState, useMemo } from "react";
// import {
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";

// const PAGE_SIZE = 5;

// const Users = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Admin User", email: "admin@test.com", role: "ADMIN" },
//     { id: 2, name: "Normal User", email: "user@test.com", role: "USER" },
//     { id: 3, name: "Test User", email: "test@test.com", role: "USER" },
//     { id: 4, name: "Demo User", email: "demo@test.com", role: "USER" },
//     { id: 5, name: "Support User", email: "support@test.com", role: "ADMIN" },
//     { id: 6, name: "QA User", email: "qa@test.com", role: "USER" },
//   ]);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", role: "USER" });

//   /* ---------------- FILTER + PAGINATION ---------------- */

//   const filteredUsers = useMemo(() => {
//     return users.filter(
//       (u) =>
//         u.name.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [users, search]);

//   const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   /* ---------------- ACTIONS ---------------- */

//   const openCreate = () => {
//     setEditingUser(null);
//     setForm({ name: "", email: "", role: "USER" });
//     setShowModal(true);
//   };

//   const openEdit = (user) => {
//     setEditingUser(user);
//     setForm(user);
//     setShowModal(true);
//   };

//   const saveUser = () => {
//     if (editingUser) {
//       setUsers(users.map((u) => (u.id === editingUser.id ? form : u)));
//     } else {
//       setUsers([...users, { ...form, id: Date.now() }]);
//     }
//     setShowModal(false);
//   };

//   const deleteUser = (id) => {
//     setUsers(users.filter((u) => u.id !== id));
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="p-6 space-y-5">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-semibold text-gray-800">Users</h1>

//         <button
//           onClick={openCreate}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
//         >
//           <PlusIcon className="w-5 h-5" />
//           Create User
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div className="relative w-72">
//         <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//         <input
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           placeholder="Search users..."
//           className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">Name</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Role</th>
//               <th className="px-4 py-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr
//                 key={user.id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-3 font-medium">{user.name}</td>
//                 <td className="px-4 py-3">{user.email}</td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       user.role === "ADMIN"
//                         ? "bg-purple-100 text-purple-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 flex justify-end gap-3">
//                   <button onClick={() => openEdit(user)}>
//                     <PencilIcon className="w-4 h-4 text-blue-600" />
//                   </button>
//                   <button onClick={() => deleteUser(user.id)}>
//                     <TrashIcon className="w-4 h-4 text-red-600" />
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {paginatedUsers.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="px-4 py-6 text-center text-gray-500"
//                 >
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-end gap-2">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//         >
//           Prev
//         </button>

//         <span className="px-3 py-1.5 text-sm">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//           className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">
//               {editingUser ? "Edit User" : "Create User"}
//             </h2>

//             <input
//               className="input mb-3"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <input
//               className="input mb-3"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//             />

//             <select
//               className="input mb-5"
//               value={form.role}
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//             >
//               <option value="USER">USER</option>
//               <option value="ADMIN">ADMIN</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveUser}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;

// import { useState, useMemo } from "react";
// import {
//   PlusIcon,
//   PencilIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";

// const PAGE_SIZE = 5;

// const Users = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Admin User", email: "admin@test.com", role: "ADMIN", active: true },
//     { id: 2, name: "Normal User", email: "user@test.com", role: "USER", active: true },
//     { id: 3, name: "Test User", email: "test@test.com", role: "USER", active: false },
//     { id: 4, name: "Demo User", email: "demo@test.com", role: "USER", active: true },
//     { id: 5, name: "Support User", email: "support@test.com", role: "ADMIN", active: true },
//     { id: 6, name: "QA User", email: "qa@test.com", role: "USER", active: false },
//   ]);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", role: "USER", active: true });

//   /* ---------------- FILTER + PAGINATION ---------------- */

//   const filteredUsers = useMemo(() => {
//     return users.filter(
//       (u) =>
//         u.name.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [users, search]);

//   const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   /* ---------------- ACTIONS ---------------- */

//   const openCreate = () => {
//     setEditingUser(null);
//     setForm({ name: "", email: "", role: "USER", active: true });
//     setShowModal(true);
//   };

//   const openEdit = (user) => {
//     setEditingUser(user);
//     setForm(user);
//     setShowModal(true);
//   };

//   const saveUser = () => {
//     if (editingUser) {
//       setUsers(users.map((u) => (u.id === editingUser.id ? form : u)));
//     } else {
//       setUsers([...users, { ...form, id: Date.now() }]);
//     }
//     setShowModal(false);
//   };

//   const deleteUser = (id) => {
//     setUsers(users.filter((u) => u.id !== id));
//   };

//   const toggleActive = (id) => {
//     setUsers(
//       users.map((u) =>
//         u.id === id ? { ...u, active: !u.active } : u
//       )
//     );
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="p-6">
//       {/* USERS CARD */}
//       <div className="bg-white rounded-lg shadow p-5 space-y-5">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold text-gray-800">Users</h1>

//           <button
//             onClick={openCreate}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
//           >
//             <PlusIcon className="w-5 h-5" />
//             Create User
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="relative w-72">
//           <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
//           <input
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             placeholder="Search users..."
//             className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="overflow-hidden rounded-md border">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-left">Email</th>
//                 <th className="px-4 py-3 text-left">Role</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedUsers.map((user) => (
//                 <tr key={user.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium">{user.name}</td>
//                   <td className="px-4 py-3">{user.email}</td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         user.role === "ADMIN"
//                           ? "bg-purple-100 text-purple-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>

//                   {/* ACTIVE / INACTIVE */}
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => toggleActive(user.id)}
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         user.active
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {user.active ? "Active" : "Inactive"}
//                     </button>
//                   </td>

//                   <td className="px-4 py-3 flex justify-end gap-3">
//                     <button onClick={() => openEdit(user)}>
//                       <PencilIcon className="w-4 h-4 text-blue-600" />
//                     </button>
//                     <button onClick={() => deleteUser(user.id)}>
//                       <TrashIcon className="w-4 h-4 text-red-600" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {paginatedUsers.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
//                     No users found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex justify-end gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Prev
//           </button>

//           <span className="px-3 py-1.5 text-sm">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1.5 border rounded text-sm disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">
//               {editingUser ? "Edit User" : "Create User"}
//             </h2>

//             <input
//               className="input mb-3"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <input
//               className="input mb-3"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />

//             <select
//               className="input mb-3"
//               value={form.role}
//               onChange={(e) => setForm({ ...form, role: e.target.value })}
//             >
//               <option value="USER">USER</option>
//               <option value="ADMIN">ADMIN</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveUser}
//                 className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;


import { useState, useMemo } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
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
    <div className="p-6 relative">
      {/* USERS CARD */}
      <div className="bg-white rounded-lg shadow p-5 space-y-5">
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
                <tr key={user.id} className="border-t hover:bg-gray-50">
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


