import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

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
        <header className="bg-red-500 text-white p-4 px-16 shadow-xl fixed top-0 left-0 w-full z-10">
          <nav className="flex justify-between lg:text-xl">
            <Link href="/">
              <h1 className="text-lg lg:text-2xl font-bold cursor-pointer">
                Exulted Eagles
              </h1>
            </Link>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-yellow-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="hover:text-yellow-300">
                  Questionnaire
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* Remove container and mx-auto */}
        <main className="w-full p-0 m-0">{children}</main>
      </body>
    </html>
  );
}
