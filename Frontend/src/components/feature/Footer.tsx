
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About FUSO', href: '#' },
      { label: 'Leadership', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Room', href: '#' },
    ],
    resources: [
      { label: 'Help Center', href: '#' },
      { label: 'Guidelines', href: '#' },
      { label: 'Training', href: '#' },
      { label: 'Support', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Compliance', href: '#' },
    ],
    connect: [
      { label: 'Contact Us', href: '#' },
      { label: 'Feedback', href: '#' },
      { label: 'IT Support', href: '#' },
      { label: 'HR Portal', href: '#' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-white">Fusion Intranet</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your central hub for collaboration, communication, and innovation at FUSO.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded-lg transition-all duration-300 cursor-pointer group">
                <i className="ri-linkedin-fill text-gray-400 group-hover:text-white transition-colors duration-300"></i>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded-lg transition-all duration-300 cursor-pointer group">
                <i className="ri-twitter-x-fill text-gray-400 group-hover:text-white transition-colors duration-300"></i>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded-lg transition-all duration-300 cursor-pointer group">
                <i className="ri-facebook-fill text-gray-400 group-hover:text-white transition-colors duration-300"></i>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-red-600 rounded-lg transition-all duration-300 cursor-pointer group">
                <i className="ri-instagram-fill text-gray-400 group-hover:text-white transition-colors duration-300"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {footerLinks.connect.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} FUSO. All rights reserved. | 
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 ml-1 transition-colors duration-300 cursor-pointer">
                Powered by Readdy
              </a>
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                Accessibility
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                Sitemap
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-300 cursor-pointer">
                Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
