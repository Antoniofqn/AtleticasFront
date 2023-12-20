import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showUniversidadesDropdown, setShowUniversidadesDropdown] = useState(false);
  const [showClubsDropdown, setShowClubsDropdown] = useState(false);

  return (
    <nav className="bg-orange-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        <Link to="/">Atléticas App</Link>
      </h1>
      <ul className="flex space-x-4">
        <li className="relative" onMouseEnter={() => setShowUniversidadesDropdown(true)} onMouseLeave={() => setShowUniversidadesDropdown(false)}>
          <span className="hover:text-green-100 font-bold cursor-pointer">Universidades</span>
          {showUniversidadesDropdown && (
            <div className="absolute bg-white text-black w-40 rounded shadow-lg">
              <Link to="/universities/create" className="block border border-orange-500 px-4 py-2 hover:bg-gray-200 font-bold text-orange-500">Criar Universidade</Link>
              <Link to="/" className="block border border-orange-500 px-4 py-2 hover:bg-gray-200 font-bold text-orange-500">Listar Universidades</Link>
            </div>
          )}
        </li>
        <li className="relative" onMouseEnter={() => setShowClubsDropdown(true)} onMouseLeave={() => setShowClubsDropdown(false)}>
          <span className="hover:text-green-100 font-bold cursor-pointer">Atléticas</span>
          {showClubsDropdown && (
            <div className="absolute bg-white text-black w-40 rounded shadow-lg right-0">
              <Link to="/clubs/create" className="block border border-orange-500 px-4 py-2 hover:bg-gray-200 font-bold text-orange-500">Criar Atlética</Link>
              <Link to="/clubs" className="block border border-orange-500 px-4 py-2 hover:bg-gray-200 font-bold text-orange-500">Listar Atléticas</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
