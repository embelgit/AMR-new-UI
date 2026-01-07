import { useState } from "react";
import axios from "axios";

const UserModal = ({ onClose, editUser, refresh }) => {
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    firstName: editUser?.firstName || "",
    lastName: editUser?.lastName || "",
    email: editUser?.email || "",
    username: editUser?.username || "",
    mobileno: editUser?.mobileno || "",
    role: editUser?.role || "USER"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (editUser) {
      await axios.put(
        `http://localhost:8080/api/users/${editUser.id}`,
        form,
        { headers: { role } }
      );
    } else {
      await axios.post("http://localhost:8080/api/users", form, {
        headers: { role }
      });
    }

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded w-[400px] p-5">
        <h2 className="text-lg font-semibold mb-4">
          {editUser ? "Edit User" : "Create User"}
        </h2>

        <div className="space-y-3">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="input"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="input"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
          />

          <input
            name="mobileno"
            placeholder="Mobile No"
            value={form.mobileno}
            onChange={handleChange}
            className="input"
          />

          {role === "SUPER_ADMIN" && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
