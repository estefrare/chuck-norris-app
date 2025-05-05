'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const API_URL = "https://api.chucknorris.io/jokes/random";

export default function Home() {

  const [joke, setJoke] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setJoke(data.value);
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

  const renderJoke = () => {
    if (error) {
      return error;
    }
    if (isLoading) {
      return "Loading...";
    }
    return joke;
  };

  return (
    <>
      <Image
        src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"
        alt="Next.js logo"
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
