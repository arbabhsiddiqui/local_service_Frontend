import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import Unauthorized from "@/pages/Unauthorized"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap"
import { useSelector } from "react-redux"


function App() {

    useAuthBootstrap()

  const { isBootstrapping } = useSelector(
    (state: RootState) => state.auth
  )

  if (isBootstrapping) {
    return <div>Loading App...</div>
  }

  return (
    <Router>
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
     

      {/* Client User Dashboard */}
      

     

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Router>
  )
}

export default App
