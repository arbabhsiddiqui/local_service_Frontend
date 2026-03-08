import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "@/pages/login.page"
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import Layout from "./components/layout.component"
import { adminRoutes } from "./routes/admin.routes"
import NotFound from "./pages/notFound.page"
import ProtectedRoute from "./routes/ProtectedRoute"
import Register from "./pages/register.page"
import { serviceRoutes } from "./routes/service.routes"
import { userRoutes } from "./routes/user.routes"


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
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          {/* ADMIN */}
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            {adminRoutes}
          </Route>

          <Route
            path="/service"
            element={<ProtectedRoute allowedRoles={["service_provider"]} />}
          >
            {serviceRoutes}
          </Route>

          <Route
            path="/user"
            element={<ProtectedRoute allowedRoles={["user"]} />}
          >
            {userRoutes}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
