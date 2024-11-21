import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth-store';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(1, { message: 'Please enter a password.' }),
});

export function LoginPage() {
    const { signin, isLoading, error, clearError, isAdmin } = useAuthStore();

    const { toast } = useToast();

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        if (error) {
            form.setError('root', {
                type: 'server',
                message: error,
            });
        }
    }, [error, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Clear any existing errors before attempting to sign in
        form.clearErrors();
        clearError();

        const success = await signin(values.email, values.password);

        if (success) {
            toast({
                title: 'Success',
                description: 'You have been signed in successfully',
                duration: 3000,
            });

            setTimeout(() => {
                if (isAdmin()) {
                    navigate('/admin/dashboard', { replace: true });
                    return;
                } else {
                    navigate('/', { replace: true });
                }
            }, 2000);
        }
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
            <div className="absolute h-full w-full pointer-events-none">
                {[
                    { top: '10%', left: '50%', size: '20rem' },
                    { top: '60%', left: '20%', size: '25rem' },
                    { top: '30%', left: '80%', size: '22rem' },
                ].map((config, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full mix-blend-normal animate-slow-pulse"
                        style={{
                            background: `radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)`,
                            width: config.size,
                            height: config.size,
                            left: config.left,
                            top: config.top,
                            animationDelay: `${i * 1.5}s`,
                        }}
                    />
                ))}
            </div>

            <Container className="relative">
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                            <p className="text-muted-foreground">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-primary hover:underline transition-colors font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <div className="bg-card border rounded-lg px-6 py-10 shadow-sm">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                                    <div className="space-y-4">
                                        {form.formState.errors.root && (
                                            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
                                                {form.formState.errors.root.message}
                                            </div>
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground/90">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="anura@example.com"
                                                            {...field}
                                                            className="bg-background/50 border-border/50"
                                                            autoComplete="email"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground/90">Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            {...field}
                                                            className="bg-background/50 border-border/50"
                                                            autoComplete="current-password"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
