import { Link } from 'react-router-dom';
import logoXl from '../assets/logo-xl.png';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import instagramIcon from '../assets/instagram.png';

export default function Footer() {
  return (
    <footer className="bg-[#1e4d3b] text-white">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col items-center text-center gap-5">

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-5xl font-black tracking-tight leading-none">
            Keen<span className="font-semibold ">Keeper</span>
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-green-200 text-sm max-w-sm leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-sm font-semibold text-white tracking-wide">Social Links</p>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={instagramIcon} alt="Instagram" className="w-10 h-10 object-contain" />
            </a>
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={facebookIcon} alt="Facebook" className="w-10 h-10 object-contain" />
            </a>
            {/* X / Twitter */}
            <a
              href="#"
              aria-label="X (Twitter)"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={twitterIcon} alt="Twitter" className="w-10 h-10 object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-green-300">© 2026 KeenKeeper. All rights reserved.</p>
          <nav className="flex items-center gap-5 text-xs text-green-300">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
