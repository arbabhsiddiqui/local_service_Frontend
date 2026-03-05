import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLoginMutation } from "@/store/api/authApi"
import { useAppDispatch } from "@/hooks/useRedux"
import { setUser, setError } from "@/store/slices/authSlice"

interface LoginFormData {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "demoadmin@chaicode.com",
      password: "Abc@123",
    },
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const result = await login(data).unwrap()
      dispatch(setUser(result.data.user))

      // Redirect based on user role
      switch (result.data.user.roleName) {
        case "admin":
          navigate("/dashboard/admin")
          break
        case "service_user":
          navigate("/dashboard/service-provider")
          break
        case "client_user":
          navigate("/dashboard/client")
          break
        default:
          navigate("/login")
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      dispatch(setError(errorMessage))
    }
  }

  useEffect(() => {
    if (isLoading) {
      dispatch(setError(null))
    }
  }, [isLoading, dispatch])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-input text-foreground placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-input text-foreground placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
