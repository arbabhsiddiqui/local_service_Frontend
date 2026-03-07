import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/features/auth/authApi"
import { logout } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { user } = useAppSelector((state) => state.auth)

    const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logoutApi] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
    } catch (err) {
      console.error("Logout API failed:", err)
    } finally {
      dispatch(logout())
      navigate("/")
    }
  }

  return (
    <header className="border-b bg-card px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold">
        Welcome {user?.email}
      </h2>

      <Button size="sm" onClick={handleLogout} className="bg-red-400" variant="outline">
        Logout
      </Button>
    </header>
  )
}