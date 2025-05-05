'use client';
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const API_URL = "https://api.chucknorris.io/jokes/random";

export default function Home() {

  const [ joke, setJoke ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
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
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ${isLoading ? "cursor-not-allowed" : ""}`}
            onClick={fetchJoke}
            disabled={isLoading}
            aria-label="Get another joke"
          >
            {error ? "Try again" : "Get another joke"}
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/estefrare"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Developed by Esteban Frare
        </a>
      </footer>
    </div>
  );
}
