import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // Wait until authentication check is complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Already logged in → send to feed
  if (user) {
    return <Navigate to="/feed" replace />;
  }

  // Not logged in → show landing page
  return children;
};

export default PublicRoute;
