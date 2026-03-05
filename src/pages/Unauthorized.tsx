import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this resource.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  )
}
