'use client';
import { useState } from "react";
import Link from "next/link";
import { getFavorites, removeFavorite, updateFavorite } from "../lib/storage";
import type { Joke } from "../lib/storage";
import JokeCard from "../components/JokeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Joke[]>(getFavorites());

  const handleRemoveFavorite = (id: Joke['id']) => {
    setFavorites(removeFavorite(id));
  }

  const handleUpdateFavorite = (id: Joke['id'], rate: number) => {
    setFavorites(updateFavorite(id, rate));
  };

  return (
    <div>
      <ul className="space-y-8 mb-8 max-h-200 overflow-y-auto">
        {favorites.map((item) => (
          <JokeCard key={item.id} joke={item} removeFavorite={handleRemoveFavorite} setRate={handleUpdateFavorite} isFavorite />
        ))}
      </ul>
      <Link
        href="/"
        className="rounded-full border flex items-center justify-center dark:hover:bg-[#ccc] sm:h-12 max-w-40"
      >
        Back
      </Link>
    </div>
  );
}
