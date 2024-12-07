import { AppLayout } from '../components/AppLayout';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AppLayout>
                    {children}
                </AppLayout>
            </body>
        </html>
    )
}