'use client';
import Image from "next/image";
import type { Joke } from "../lib/storage";
import RatingStars from "./RatingStars";

export type Props = {
  joke: Joke
  isFavorite: boolean;
  addFavorite?: (joke: Joke) => void;
  removeFavorite?: (id: Joke['id']) => void;
  setRate?: (id: Joke['id'], rate: number) => void;
}

export default function JokeCard({ joke, isFavorite, addFavorite, removeFavorite, setRate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">
        {joke.value}
      </h2>
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer rounded-full border flex items-center gap-2 text-sm px-3 py-2"
          onClick={() => {
            if (isFavorite) {
              removeFavorite?.(joke.id);
            } else {
              addFavorite?.(joke)
            }
          }}
        >
          {isFavorite ? "Added to Favorites" : "Add to Favorites"}
          <Image
            aria-hidden
            src={isFavorite ? "/favorite.svg" : "/non-favorite.svg"}
            alt="Favorite icon"
            width={20}
            height={20}
          />
        </button>
        {isFavorite && setRate && <RatingStars value={joke.rate} id={joke.id} onChange={setRate} />}
      </div>
    </div>
  );

}
