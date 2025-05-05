'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { Joke } from "./lib/storage";
import { getFavorites, saveToFavorites, removeFavorite } from "./lib/storage";
import JokeCard from "./components/JokeCard";

const API_URL = "https://api.chucknorris.io/jokes/random";

export default function Home() {

  const [joke, setJoke] = useState<Joke>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Joke[]>(getFavorites());

  const fetchJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        next: { revalidate: 60 },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched joke:", data);
      setJoke(data);
    }
    catch (error) {
      console.error("Error fetching joke:", error);
      setError("Failed to fetch a joke. Please try again later.");
      return;
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  const isFavorite = useMemo(() => {
    return favorites.some((item) => item.id === joke?.id);
  }, [favorites, joke])

  const addFavorites = (joke: Joke) => {
    setFavorites(saveToFavorites(joke))
  }

  const handleRemoveFavorite = (id: Joke['id']) => {
    setFavorites(removeFavorite(id));
  }

  const renderJoke = () => {
    if (error) {
      return error;
    }
    if (isLoading) {
      return "Loading...";
    }
    if (!joke) {
      return "No joke found";
    }
    return <JokeCard joke={joke} isFavorite={isFavorite} addFavorite={addFavorites} removeFavorite={handleRemoveFavorite} />;
  };

  return (
    <>
      <Image
        src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
        alt="Chuck logo"
        width={180}
        height={38}
        priority
      />
      <p className={`text-2xl font-bold text-center min-h-80 ${error ? "text-red-500" : ""}`}>
        {renderJoke()}
      </p>
      <div className="flex gap-4 items-center">
        <button
          className={`rounded-full border border-solid bg-white text-black transition-colors flex items-center justify-center gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ${isLoading ? "cursor-not-allowed" : ""}`}
          onClick={fetchJoke}
          disabled={isLoading}
          aria-label="Get another joke"
        >
          {error ? "Try again" : "Get another joke"}
        </button>
        <Link
          href="/favorites"
          className={`rounded-full border border-solid transition-colors flex items-center justify-center gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          Favorites
        </Link>
      </div>
    </>
  );
}
