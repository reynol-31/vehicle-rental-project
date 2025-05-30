// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#5A827E] text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Urban Rides
        </Link>
        <div className="space-x-6">
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
