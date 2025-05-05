'use client';
import Image from "next/image";
import type { Joke } from "../lib/storage";

type Props = {
  joke: Joke
  isFavorite: boolean;
  addFavorite?: (joke: Joke) => void;
  removeFavorite?: (id: Joke['id']) => void;
}

export default function JokeCard({ joke, isFavorite, addFavorite, removeFavorite }: Props) {
  return (
    <div className="flex flex-col items-center justify-cente">
      <h2 className="text-2xl font-bold mb-4">{joke.value}</h2>
      <button
        className="cursor-pointer rounded-full border border-solid flex items-center gap-2 text-sm px-3 py-2"
        onClick={() => {
          if (isFavorite) {
            removeFavorite?.(joke.id);
          } else {
            addFavorite?.(joke)
          }
        }}
      >
        {isFavorite ? "Added to Favorite" : "Add to Favorite"}
        <Image
          aria-hidden
          src={isFavorite ? "/favorite.svg" : "/non-favorite.svg"}
          alt="Favorite icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );

}
