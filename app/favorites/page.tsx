'use client';
import { useState } from "react";
import Link from "next/link";
import { getFavorites, removeFavorite } from "../lib/storage";
import type { Joke } from "../lib/storage";
import JokeCard from "../components/JokeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Joke[]>(getFavorites());

  const handleRemoveFavorite = (id: Joke['id']) => {
    setFavorites(removeFavorite(id));
  }

  return (
    <div>
      <ul className="space-y-4 mb-8">
        {favorites.map((item, index) => (
          <JokeCard key={index} joke={item} removeFavorite={handleRemoveFavorite} isFavorite/>
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
