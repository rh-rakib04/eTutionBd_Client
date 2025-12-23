import { Link } from "react-router";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300 ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto  px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 ">
                <img src="/logo.png" alt="" />
              </div>
              <span className="text-2xl font-bold text-primary">
                eTuitionBd
              </span>
            </Link>
            <p className="text-base-content/80 text-sm">
              Connecting students with verified tutors across Bangladesh. Your
              trusted platform for quality education.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-base-content">Quick Links</h3>
            <ul className="space-y-2 ">
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tuitions"
                  className="text-base-content/70 hover:text-primary"
                >
                  Find Tuitions
                </Link>
              </li>
              <li>
                <Link
                  to="/tutors"
                  className="text-base-content/70 hover:text-primary"
                >
                  Browse Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base-content/70 hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-base-content">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-base-content/70 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base-content/70 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-base-content">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-base-content/70 text-sm">
                  support@etuitionbd.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-base-content/70 text-sm">
                  +880 1234-567890
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-base-content/70 text-sm">
                  Chittagong, Bangladesh
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 pt-4">
              <a
                href="https://www.facebook.com/rakibul.hossain.925602"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-primary-content border-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-primary-content border-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rakibulhossain04/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-primary-content border-none"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="animate-gradient-x py-4 bg-gradient-to-r from-secondary via-primary to-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-base-100 text-center">
              © {currentYear} <span className="font-semibold">eTuitionBd</span>.
              All rights reserved.
            </p>
            <p className="text-sm text-base-100">Made with ❤️ in Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
