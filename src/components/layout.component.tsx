import Sidebar from "./sidebar/sidebar.component"
import Header from "./header.component"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-foreground">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  )
}