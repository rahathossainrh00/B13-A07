import { NavLink, Link } from 'react-router-dom';
import { HomeIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isActive
      ? 'bg-primary text-white'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-black text-[#1F2937] flex items-center">
          Keen<span className="font-semibold text-[#1E4D3B]">Keeper</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            <HomeIcon className="w-4 h-4" />
            Home
          </NavLink>
          <NavLink to="/timeline" className={navLinkClass}>
            <ClockIcon className="w-4 h-4" />
            Timeline
          </NavLink>
          <NavLink to="/stats" className={navLinkClass}>
            <ChartBarIcon className="w-4 h-4" />
            Stats
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
