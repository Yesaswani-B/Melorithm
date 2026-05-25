import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">🎵</span>
          <span className="logo-text gradient-text">SoundMatch</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink to="/best-match" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Best Match
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
