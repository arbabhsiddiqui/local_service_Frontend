import { Button } from "@/components/ui/button"



export default function AdminDashboard() {


  return (
    <>
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
        </>
  )
}
