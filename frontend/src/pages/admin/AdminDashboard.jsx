import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  FileText,
  Flag,
  Settings,
  Menu,
  X,
  LogOut,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import api from "../../utils/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const result = await api.get("/advertisement/inquiries");

      setInquiries(result.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load advertisement inquiries.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const newInquiries = inquiries.filter((item) => item.status === "New").length;

  const contactedInquiries = inquiries.filter(
    (item) => item.status === "Contacted",
  ).length;

  const closedInquiries = inquiries.filter(
    (item) => item.status === "Closed",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white">
      {/* Mobile Header */}
      <div className="lg:hidden h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-bold text-lg">ClipMyGame</h1>

        <div className="w-8" />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          z-50
          top-0
          left-0
          h-screen
          w-64
          bg-white
          dark:bg-zinc-900
          border-r
          border-gray-200
          dark:border-zinc-800
          flex
          flex-col
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
          <div>
            <h1 className="text-xl font-bold">
              Clip<span className="text-green-600">MyGame</span>
            </h1>

            <p className="text-xs text-gray-500 dark:text-zinc-500">
              Admin Panel
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Overview"
            active
          />

          <SidebarItem
            icon={<Megaphone size={19} />}
            label="Advertisements"
            badge={newInquiries}
          />

          <SidebarItem icon={<Users size={19} />} label="Users" />

          <SidebarItem icon={<FileText size={19} />} label="Posts" />

          <SidebarItem icon={<Flag size={19} />} label="Reports" />

          <SidebarItem icon={<Settings size={19} />} label="Settings" />
        </nav>

        {/* Admin bottom */}
        <div className="p-3 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              A
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Administrator</p>

              <p className="text-xs text-gray-500 dark:text-zinc-500">Admin</p>
            </div>

            <button className="text-gray-500 hover:text-red-500">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 items-center justify-between px-7">
          <div>
            <h2 className="font-semibold text-lg">Admin Dashboard</h2>

            <p className="text-xs text-gray-500 dark:text-zinc-500">
              Manage ClipMyGame
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              A
            </div>

            <div>
              <p className="text-sm font-medium">Administrator</p>

              <p className="text-xs text-gray-500 dark:text-zinc-500">Admin</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-7">
          {/* Page title */}
          <div className="mb-7">
            <h1 className="text-2xl md:text-3xl font-bold">Overview</h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              Here's what's happening on ClipMyGame.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <StatCard
              title="Total Inquiries"
              value={inquiries.length}
              icon={<Megaphone size={20} />}
            />

            <StatCard
              title="New Inquiries"
              value={newInquiries}
              icon={<Clock size={20} />}
            />

            <StatCard
              title="Contacted"
              value={contactedInquiries}
              icon={<ArrowRight size={20} />}
            />

            <StatCard
              title="Closed"
              value={closedInquiries}
              icon={<CheckCircle size={20} />}
            />
          </div>

          {/* Advertisement inquiries */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-5 md:px-6 py-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  Advertisement Inquiries
                </h2>

                <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
                  Recent advertising requests
                </p>
              </div>

              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                View all
              </button>
            </div>

            {loading ? (
              <div className="p-10 text-center text-gray-500">
                Loading inquiries...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Megaphone size={24} className="text-gray-400" />
                </div>

                <h3 className="mt-4 font-medium">No inquiries yet</h3>

                <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
                  Advertisement requests will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                {inquiries.slice(0, 8).map((inquiry) => (
                  <InquiryRow key={inquiry._id} inquiry={inquiry} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

/* ================= SIDEBAR ITEM ================= */

const SidebarItem = ({ icon, label, active = false, badge = 0 }) => {
  return (
    <button
      className={`
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2.5
        rounded-xl
        text-sm
        font-medium
        transition
        ${
          active
            ? "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400"
            : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        }
      `}
    >
      {icon}

      <span className="flex-1 text-left">{label}</span>

      {badge > 0 && (
        <span className="min-w-5 h-5 px-1.5 rounded-full bg-green-600 text-white text-[11px] flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-500">{title}</p>

          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ================= INQUIRY ROW ================= */

const InquiryRow = ({ inquiry }) => {
  return (
    <div className="px-5 md:px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 flex items-center justify-center font-semibold shrink-0">
        {inquiry.name?.charAt(0)?.toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{inquiry.name}</h3>

          <StatusBadge status={inquiry.status} />
        </div>

        <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
          {inquiry.company || "No company"} • {inquiry.campaignType}
        </p>

        <p className="text-xs text-gray-400 mt-1">{inquiry.email}</p>
      </div>

      <div className="text-left md:text-right">
        <p className="text-xs text-gray-400">
          {new Date(inquiry.createdAt).toLocaleDateString()}
        </p>

        <p className="text-sm font-medium mt-1">
          {inquiry.budget || "Budget not specified"}
        </p>
      </div>
    </div>
  );
};

/* ================= STATUS ================= */

const StatusBadge = ({ status }) => {
  const styles = {
    New: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    Contacted:
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400",
    "In Progress":
      "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    Closed:
      "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
        styles[status] || styles.New
      }`}
    >
      {status}
    </span>
  );
};

export default AdminDashboard;
