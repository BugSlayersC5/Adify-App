// Navbar
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Adify
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}