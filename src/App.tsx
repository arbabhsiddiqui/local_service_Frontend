import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "@/pages/login.page"
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap"
import { useSelector } from "react-redux"
import Layout from "./components/layout.component"
import { adminRoutes } from "./routes/admin.routes"
import NotFound from "./pages/notFound.page"
import ProtectedRoute from "./routes/ProtectedRoute"


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
      <Route element={<Layout />}>
     {/* ADMIN */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          {adminRoutes}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
       <Route path="*" element={<NotFound />} />
    </Routes>
    </Router>
  )
}

export default App
