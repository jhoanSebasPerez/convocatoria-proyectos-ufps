"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

import { AlertCircle, Eye, EyeOff } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import { useLogin } from "../api/use-login"
import { signInFormSchema } from "../schemas/sign-in-schema"
import { useAuth } from "../context/auth-context"
import { roles } from "../constansts"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { ClipLoader } from "react-spinners"

const allowedDomain = "ufps.edu.co"


export const SignInCard = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [error] = useState<string | null>(null)
    const router = useRouter();
    const { mutate, isPending } = useLogin();
    const { login, isAuthenticated, role } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push(`/${role}`);
        }
    }, [isAuthenticated, role, isPending]);

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSubmit = (values: z.infer<typeof signInFormSchema>) => {
        mutate(values, {
            onSuccess: (data) => {
                login(data);
                const routeRole = roles[data.data.Rol.id_rol];
                if (!routeRole) {

                }
                router.push(`/${roles[data.data.Rol.id_rol]}`);
            },

        });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Inicio de sesión</CardTitle>
                <CardDescription>Ingresa tu correo institucional y contraseña para iniciar sesión.</CardDescription>
            </CardHeader>
            <CardContent>
                {!!error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Your session has expired. Please log in again.
                        </AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo institucional</Label>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder={`user@${allowedDomain}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Ingresa tu contraseña"
                                                    {...field}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={togglePasswordVisibility}
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isPending} type="submit" className="w-full h-10">
                            {isPending && (<ClipLoader color="#333" size={22} />)} Iniciar Sesión
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    No tienes una cuenta{" "}
                    <Link href="/sign-up" className="text-primary hover:underline underline">
                        Regístrate
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}