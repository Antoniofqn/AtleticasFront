import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-orange-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        <Link to="/">Atléticas App</Link>
      </h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-green-100">Universidades</Link>
        </li>
        <li>
          <Link to="/clubs" className="hover:text-green-100">Atléticas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
