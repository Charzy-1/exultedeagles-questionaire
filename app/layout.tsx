import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "../components/Navbar"; // Import the Navbar component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exulted Eagles survey",
  description: "Get valuable feedback from your customers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* Render the Navbar here */}
        {/* Main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
