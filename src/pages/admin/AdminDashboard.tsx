import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/features/auth/authApi"
import { logout } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { useNavigate } from "react-router-dom"


export default function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [logoutApi] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
    } catch (err) {
      console.error("Logout API failed:", err)
    } finally {
      dispatch(logout())
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Active Services</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Total Requests</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full" variant="outline">
              Manage Users
            </Button>
            <Button className="w-full" variant="outline">
              View Reports
            </Button>
            <Button className="w-full" variant="outline">
              System Settings
            </Button>
            <Button className="w-full" variant="outline">
              View Logs
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
