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
import { useLoginMutation } from "@/features/auth/authApi"

import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"

import { useEffect } from "react"

interface LoginFormData {
  email: string
  password: string
}

export default function Login() {

  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.auth)


  const [login, { isLoading }] = useLoginMutation()

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "demoadmin@chaicode.com",
      password: "Abc@123",
    },
  })

  async function onSubmit(data: LoginFormData) {

    try {

      await login(data).unwrap()

      // login triggers /auth/me internally
      // no manual dispatch needed

    } catch (error) {

      form.setError("root", {
        message: "Invalid email or password",
      })
    }
  }

  useEffect(() => {

    if (!user) return

    console.log(user)

    switch (user.roleName) {

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
        navigate("/")
    }

  }, [user])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">

      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">

        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          Login
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

          </form>
        </Form>

      </div>
    </div>
  )
}