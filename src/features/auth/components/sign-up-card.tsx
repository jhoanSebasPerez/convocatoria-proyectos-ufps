"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/sign-up-schema";
import { z } from "zod";
import { useRegister } from "../api/use-register";
import { useAuth } from "../context/auth-context";
import { useRouter } from 'next/navigation';

const allowedDomain = "ufps.edu.co"


export const SignUpCard = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { role, isAuthenticated } = useAuth();
    const { mutate } = useRegister();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    useEffect(() => {
        if (isAuthenticated) {
            router.push(`/${role}`);
            setLoading(false);
        }
    }, [isAuthenticated, role]);

    const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
        mutate(values);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    if (loading) {
        return null;
    }

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Registro de estudiante</CardTitle>
                <CardDescription>Ingresa los siguientes datos para registrarte</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Ingresa tu nombre"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Apellido</Label>
                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Ingresa tu apellido"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo institucional</Label>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="email"
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
                        <Button type="submit" className="w-full h-10">
                            Registrarse
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Tienes una cuenta? {" "}
                    <Link href="/sign-in" className="text-primary hover:underline underline">
                        Inicia sesión
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}