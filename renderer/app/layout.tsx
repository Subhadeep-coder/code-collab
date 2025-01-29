import { FileProvider } from "providers/file-provider";
import { AppLayout } from "../components/AppLayout";
import { AuthProvider } from "../providers/auth-provider";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='h-screen w-screen'>
        <AuthProvider>
          <FileProvider>
            <AppLayout>{children}</AppLayout>
          </FileProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
