import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/#services' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleHashLink = (e, to) => {
    // Support smooth scrolling to sections on the Home page
    if (to.startsWith('/#')) {
      e.preventDefault();
      const id = to.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: 'smooth',
        });
      } else {
        // If section not on current page, navigate to home then scroll
        window.location.href = `/#${id}`;
      }
      closeMenu();
    }
  };

  const linkClasses =
    'text-sm font-medium text-slate-700 hover:text-[#4932e4] transition-colors duration-200';

  const activeClasses = 'text-[#4932e4]';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={closeMenu}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4932e4] text-white shadow-md">
            <span className="text-lg font-semibold">AI</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              MedVision AI
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Diagnostics
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to.startsWith('/#') ? '/' : link.to}
                onClick={(e) =>
                  link.to.startsWith('/#') ? handleHashLink(e, link.to) : closeMenu()
                }
                className={({ isActive }) =>
                  `${linkClasses} ${isActive && !link.to.startsWith('/#') ? activeClasses : ''}`
                }
                end={link.to === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-[#4932e4] hover:text-[#4932e4] transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              className="rounded-full bg-[#4932e4] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#3723c2] hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-700 shadow-sm transition-colors duration-200 hover:border-[#4932e4] hover:text-[#4932e4] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white/95 px-4 pb-4 pt-2 shadow-sm md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to.startsWith('/#') ? '/' : link.to}
                onClick={(e) =>
                  link.to.startsWith('/#') ? handleHashLink(e, link.to) : closeMenu()
                }
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive && !link.to.startsWith('/#')
                      ? 'bg-[#4932e4]/5 text-[#4932e4]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
                end={link.to === '/'}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/auth/login"
              onClick={closeMenu}
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:border-[#4932e4] hover:text-[#4932e4] transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              onClick={closeMenu}
              className="w-full rounded-full bg-[#4932e4] px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#3723c2] hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
