import { FileProvider } from "providers/file-provider";
import { AppLayout } from "../components/AppLayout";
import { AuthProvider } from "../providers/auth-provider";
import "./globals.css";
import { Toaster } from "sonner";
import { TerminalProvider } from "providers/terminal-provider";
import { Providers } from "providers/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='h-screen w-screen'>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
