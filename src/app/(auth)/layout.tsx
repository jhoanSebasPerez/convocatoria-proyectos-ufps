
interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {

    return (
        <div
            className="flex min-h-screen items-center justify-center"
            style={{
                backgroundImage: 'url(/images/background-login.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add a background color with opacity
                backgroundBlendMode: 'overlay', // Blend the background image with the color
            }}
        >
            {children}
        </div>
    );
}