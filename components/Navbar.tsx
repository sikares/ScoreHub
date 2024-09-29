"use client";
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <Link href="/">ScoreHub</Link>
        </div>

        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-md px-3 py-2 text-sm text-gray-900 mx-2.5 outline-none"
          />
          <Link href="/" className="text-gray-300 mx-2.5 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
          <Link href="/rank" className="text-gray-300 mx-2.5 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Rank</Link>
          <button type="button" className="text-white mx-2.5 bg-green-500 rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">Export Excel</button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-full' : 'max-h-0'}`}>
        <div className="flex flex-col py-3 space-y-3 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-md px-3 py-2 text-sm text-gray-900 outline-none"
          />
          <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
          <Link href="/rank" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Rank</Link>
          <button type="button" className="text-white bg-green-500 rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">Export Excel</button>
        </div>
      </div>
    </nav>
  );
}
