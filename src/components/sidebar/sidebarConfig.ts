import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Briefcase
} from "lucide-react"

export const sidebarConfig = {
  admin: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Category", icon: FileText, path: "/admin/category" },
    { title: "Settings", icon: Settings, path: "/admin/settings" }
  ],

  manager: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/manager" },
    { title: "Services", icon: Briefcase, path: "/manager/services" },
    { title: "Reports", icon: FileText, path: "/manager/reports" }
  ],

  user: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "My Requests", icon: FileText, path: "/dashboard/requests" },
    { title: "Settings", icon: Settings, path: "/dashboard/settings" }
  ]
}