"use client"; // Mark the file as a client component

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  // Function to close the menu
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-red-500 text-white p-4 px-8 lg:px-16 shadow-xl fixed top-0 left-0 w-full z-10">
      <nav className="flex justify-between lg:text-xl">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-lg lg:text-2xl font-bold cursor-pointer">
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
        <ul className="hidden lg:flex space-x-6">
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
        className={`fixed top-0 left-0 bg-red-500 text-white w-64 h-full transition-transform duration-300 ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <h1 className="text-lg lg:text-2xl font-bold">Exulted Eagles</h1>
          {/* Close button */}
          <button onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer"
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
