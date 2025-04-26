"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine text color based on scroll position and current page
  const textColor = isScrolled || !isHomePage ? "text-gray-700" : "text-white";
  const logoColor = isScrolled || !isHomePage ? "text-amber-600" : "text-white";
  const bgColor =
    isScrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${bgColor} ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                F
              </div>
            </div>
            <span className={`text-2xl font-bold ${logoColor}`}>
              Flavor Haven
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium hover:text-amber-600 transition duration-300 ${textColor}`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`font-medium hover:text-amber-600 transition duration-300 ${textColor}`}
          >
            Menu
          </Link>
          <Link
            href="/reservations"
            className={`font-medium hover:text-amber-600 transition duration-300 ${textColor}`}
          >
            Reservations
          </Link>
          <Link
            href="/contact"
            className={`font-medium hover:text-amber-600 transition duration-300 ${textColor}`}
          >
            Contact
          </Link>
          <Link
            href="/reservations"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center justify-center"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className={`p-2 rounded-md focus:outline-none ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-amber-600 transition duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-amber-600 transition duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/reservations"
                className="text-gray-700 hover:text-amber-600 transition duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reservations
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-amber-600 transition duration-300 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/reservations"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition duration-300 inline-block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
