import type { Metadata } from "next";

import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exulted survey",
  description: "Get valuable feedback from your customers.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-lg font-bold">Solar Company</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-yellow-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/questionnaire" className="hover:text-yellow-300">
                  Questionnaire
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
