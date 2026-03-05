import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import Login from "@/pages/Login"
import AdminDashboard from "@/pages/dashboards/AdminDashboard"
import ServiceUserDashboard from "@/pages/dashboards/ServiceUserDashboard"
import ClientDashboard from "@/pages/dashboards/ClientDashboard"
import Unauthorized from "@/pages/Unauthorized"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthRefresh } from "@/hooks/useAuthRefresh"

function AppContent() {
  // Initialize and manage token refresh
  useAuthRefresh()

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Service User Dashboard */}
      <Route
        path="/dashboard/service-provider"
        element={
          <ProtectedRoute requiredRoles={["service_user"]}>
            <ServiceUserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Client User Dashboard */}
      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute requiredRoles={["client_user"]}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />

     

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  useEffect(() => {
    // Apply dark theme
    document.documentElement.classList.add("dark")
  }, [])

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
