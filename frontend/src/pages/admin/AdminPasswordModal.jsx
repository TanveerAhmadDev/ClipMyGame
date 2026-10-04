import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import api from "../../utils/axios";
import { toast } from "react-toastify";

const AdminPasswordModal = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter admin password.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/admin/verify-password", {
        password,
      });

      sessionStorage.setItem("adminAccess", "true");

      toast.success("Admin access granted.");

      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid admin password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-950/40 text-green-600 flex items-center justify-center">
              <Lock size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Admin Access</h2>

              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Enter admin password to continue
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <label className="block text-sm font-medium mb-2">
            Admin Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
