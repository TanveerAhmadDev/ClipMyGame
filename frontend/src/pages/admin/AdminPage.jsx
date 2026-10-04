import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminPasswordModal from "./AdminPasswordModal";

const AdminPage = () => {
  const [accessGranted, setAccessGranted] = useState(
    sessionStorage.getItem("adminAccess") === "true",
  );

  const [showModal, setShowModal] = useState(!accessGranted);

  if (accessGranted) {
    return <AdminDashboard />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950" />

      {showModal && (
        <AdminPasswordModal
          onSuccess={() => {
            setAccessGranted(true);
            setShowModal(false);
          }}
          onClose={() => {
            window.location.href = "/";
          }}
        />
      )}
    </>
  );
};

export default AdminPage;
