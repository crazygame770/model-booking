import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ModelBooking. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="https://instagram.com/modelbooking" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
