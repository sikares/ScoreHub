"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (evnnt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evnnt.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="flex items-center justify-between">
      <div className="text-white font-bold text-xl">
        <Link href="/" className="flex items-center">
          <svg className="w-6 h-6 text-white mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
          </svg>
          ScoreHub
        </Link>
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

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
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
