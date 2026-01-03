import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Onboarding from "./pages/onboarding/Onboarding";
import Dashboard from "./pages/dashboard/Dashboard";
import NewRequest from "./pages/maintenance/NewRequest";
import MaintenanceDetail from "./pages/maintenance/MaintenanceDetail";
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Root */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THIS */}
        <Route
          path="/maintenance/new"
          element={
            <ProtectedRoute>
              <NewRequest />
            </ProtectedRoute>
          }
        />
        <Route
  path="/maintenance/:id"
  element={
    <ProtectedRoute>
      <MaintenanceDetail />
    </ProtectedRoute>
  }
/>

      </Routes>
    </AuthProvider>
  );
}
