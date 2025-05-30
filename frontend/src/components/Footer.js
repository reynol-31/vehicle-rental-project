import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#84AE92] text-white mt-16 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between text-sm">
        <p>&copy; {new Date().getFullYear()} Urban Rides. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
