import { useState } from "react";
import api from "../services/api";
import authService from "../services/authService";

const UserModal = ({ onClose, editUser, refresh }) => {
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    firstName: editUser?.firstName || "",
    lastName: editUser?.lastName || "",
    email: editUser?.email || "",
    password: "",
    mobileno: editUser?.mobileno || "",
    address: editUser?.address || "",
    role: editUser?.role || "USER"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (editUser) {
        await api.put(
          `/users/${editUser.id}`,
          form,
          { headers: { role } }
        );
      } else {
        const payload = {
          ...form,
          name: form.firstName, // As per sample data: "name": "Tejaswini" (same as firstName)
        };
        await authService.createAdminUser(payload);
      }

      refresh();
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded w-[450px] p-6">
        <h2 className="text-xl font-bold mb-6 text-black border-b pb-2">
          {editUser ? "Edit User" : "Create User"}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-sm">First Name</label>
            <input
              name="firstName"
              placeholder="Enter First Name"
              value={form.firstName}
              onChange={handleChange}
              className="input border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-sm">Last Name</label>
            <input
              name="lastName"
              placeholder="Enter Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="input border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-sm">Email</label>
            <input
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="input border border-gray-300 p-2 rounded"
            />
          </div>

          {!editUser && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-bold text-sm">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="input border border-gray-300 p-2 rounded"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-sm">Mobile No</label>
            <input
              name="mobileno"
              placeholder="Enter Mobile No"
              value={form.mobileno}
              onChange={handleChange}
              className="input border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-sm">Address</label>
            <input
              name="address"
              placeholder="Enter Address"
              value={form.address}
              onChange={handleChange}
              className="input border border-gray-300 p-2 rounded"
            />
          </div>

          {(role === "SUPER_ADMIN" || role === "ADMIN") && (
            <div className="flex flex-col gap-1">
              <label className="text-black font-bold text-sm">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input border border-gray-300 p-2 rounded"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            {editUser ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
