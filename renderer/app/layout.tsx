import { AppLayout } from '../components/AppLayout';
import { AuthProvider } from '../providers/auth-provider';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className='h-screen w-screen'>
                <AuthProvider>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </AuthProvider>
            </body>
        </html>
    )
}