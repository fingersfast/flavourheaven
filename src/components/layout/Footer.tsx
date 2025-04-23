import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4">
              Flavor Haven
            </h3>
            <p className="mb-2">42 Koramangala Main Road</p>
            <p className="mb-2">Bangalore, Karnataka 560034</p>
            <p className="mb-2">Phone: (+91) 80-4567-8901</p>
            <p>Email: info@flavorhaven.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4">Hours</h3>
            <p className="mb-2">
              <span className="font-medium">Mon-Thu:</span> 11:00 AM - 9:00 PM
            </p>
            <p className="mb-2">
              <span className="font-medium">Fri-Sat:</span> 11:00 AM - 11:00 PM
            </p>
            <p>
              <span className="font-medium">Sunday:</span> 12:00 PM - 8:00 PM
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-500 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="hover:text-amber-400 transition duration-300"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="hover:text-amber-400 transition duration-300"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-400 transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-400 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Flavor Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
