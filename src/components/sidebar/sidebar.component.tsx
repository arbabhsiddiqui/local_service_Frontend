import { NavLink } from "react-router-dom"
import { sidebarConfig } from "./sidebarConfig"
import { useAppSelector } from "@/hooks/useRedux"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { useState } from "react"

export type SidebarItem = {
  title: string
  icon: React.FC<any> // lucide components
  path: string
}

export default function Sidebar() {
  const { user } = useAppSelector((state) => state.auth)
  const [collapsed, setCollapsed] = useState(false)

  // narrow role to keys of the config to satisfy TypeScript
  const role = (user?.roleName || "user") as keyof typeof sidebarConfig
  const items: SidebarItem[] = sidebarConfig[role] as SidebarItem[]

  return (
    <aside
      className={`border-r bg-card h-screen transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-semibold">Dashboard</span>}

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft size={18} />
        </Button>
      </div>

      <nav className="p-2 space-y-2">
        {items.map((item: SidebarItem) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md text-sm transition
                ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`
              }
            >
              <Icon size={18} />
              {!collapsed && item.title}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}