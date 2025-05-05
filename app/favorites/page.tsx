'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFavorites } from "../lib/storage";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <ul className="space-y-4 mb-8">
        {favorites.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              aria-hidden
              src="/favorite.svg"
              alt="Github icon"
              width={16}
              height={16}
            />
            <span className="text-gray-800 dark:text-gray-100">{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className={`rounded-full border border-solid transition-colors flex items-center justify-center gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto`}
      >
        Back
      </Link>
    </div>
  );

}
