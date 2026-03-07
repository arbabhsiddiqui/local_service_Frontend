import { Route } from "react-router-dom"

import AdminDashboard from "@/pages/admin/dashboard.page"
import CategoryPage from "@/pages/admin/category/category.page"
// import UsersPage from "@/pages/admin/UsersPage"
// import ReportsPage from "@/pages/admin/ReportsPage"

export const adminRoutes = (
  <>
    <Route index element={<AdminDashboard />} />
    <Route path="category" element={<CategoryPage />} />
    {/* <Route path="/admin/users" element={<UsersPage />} />
    <Route path="/admin/reports" element={<ReportsPage />} /> */}
  </>
)