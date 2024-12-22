"use client"; // Mark the file as a client component

import Image from "next/image"; // Then import next/image
import Link from "next/link"; // First import next/link
import { useState } from "react"; // Then import react

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  // Function to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-red-500 p-4 px-8 text-white shadow-xl lg:px-16">
      <nav className="flex justify-between lg:text-xl">
        {/* Logo */}
        <Link href="/">
          <h1 className="cursor-pointer text-lg font-bold lg:text-2xl">
            Exulted Eagles
          </h1>
        </Link>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden" onClick={toggleMenu}>
          <Image
            src="/icons/hamburger.svg"
            alt="Hamburger Icon"
            width={24} // Specify the width in pixels
            height={24} // Specify the height in pixels
            className="cursor-pointer"
          />
        </div>

        {/* Desktop Navigation: Hidden on small screens */}
        <ul className="hidden space-x-6 lg:flex">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-300"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/questionnaire"
              className="hover:text-yellow-300"
              onClick={closeMenu}
            >
              Questionnaire
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile slider menu */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-red-500 text-white transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <h1 className="text-lg font-bold lg:text-2xl">Exulted Eagles</h1>
          {/* Close button */}
          <button onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-6 p-4">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-300"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/questionnaire"
              className="hover:text-yellow-300"
              onClick={closeMenu}
            >
              Questionnaire
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
