import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Link, useNavigate } from "react-router-dom"

import { useRegisterMutation } from "@/features/auth/authApi"

import { useGetAllUserTypeQuery } from "@/features/userType/userTypeApi"

/* ---------------- VALIDATION ---------------- */

const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full Name is required")
        .regex(/^[A-Za-z][A-Za-z\s]*$/, "Full Name must start with a letter"),

    email: z.string().email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    userTypeId: z.string().min(1, "Please select a role"),
})

type RegisterFormData = z.infer<typeof registerSchema>



export default function Register() {

    const navigate = useNavigate()

    const [registerUser, { isLoading }] = useRegisterMutation()

    const { data: roles = { data: [] }, isLoading: roleLoading } =
        useGetAllUserTypeQuery(undefined)

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    })



    async function onSubmit(data: RegisterFormData) {

        try {


            await registerUser(data).unwrap()

            navigate("/")

        } catch (error) {

            form.setError("root", {
                message: "Registration failed",
            })

        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-background">

            <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">

                <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
                    Register
                </h1>

                <Form {...form}>




                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <FormField
                            control={form.control}
                            name="userTypeId"
                            render={({ field }) => (
                                <FormItem>

                                    <FormLabel>User Type</FormLabel>

                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >

                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>

                                            {roles.data.map((role: any) => (
                                                <SelectItem
                                                    key={role._id}
                                                    value={role._id}
                                                >
                                                    {role.name}
                                                </SelectItem>
                                            ))}

                                        </SelectContent>

                                    </Select>

                                    <FormMessage />

                                </FormItem>
                            )}
                        />

                        {/* NAME */}

                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>

                                    <FormLabel>Name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>

                                    <FormMessage />

                                </FormItem>
                            )}
                        />


                        {/* EMAIL */}

                        <FormField
                            control={form.control}
                            name="email"
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


                        {/* PASSWORD */}

                        <FormField
                            control={form.control}
                            name="password"
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
                            {isLoading ? "Creating account..." : "Register"}
                        </Button>


                        {/* LOGIN LINK */}

                        <div className="text-sm text-center text-muted-foreground">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="text-primary font-medium hover:underline"
                            >
                                Login
                            </Link>

                        </div>

                    </form>

                </Form>

            </div>

        </div>
    )
}