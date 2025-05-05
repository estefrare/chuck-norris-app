'use client';

import React, { useState } from "react";
import type { Joke } from "../lib/storage";

type Props = {
  id: Joke['id'];
  value: number;
  onChange: (id: Joke['id'], rate: number) => void;
};

export default function RatingStars({ value, id, onChange }: Props) {
  const [stars, setStars] = useState(
    Array.from({ length: 5 }).map((_, index) => {
      return {
        index,
        filled: index < value,
        hover: false,
      }
    })
  );

  const onHover = (hoverIndex: number | null) => {
    const newState = stars.map((star) => ({
      ...star,
      hover: hoverIndex !== null && star.index <= hoverIndex,
    }));
    setStars(newState);
  };

  const onClick = (clickedIndex: number) => {
    onChange?.(id, clickedIndex + 1);
    const newState = stars.map((star) => ({
      ...star,
      filled: star.index <= clickedIndex,
    }));
    setStars(newState);
  };

  return (
    <div className="flex items-center gap-2">
      {stars.map((star) => {
        const shouldFill = star.filled || star.hover;
        return (
          <div
            key={star.index}
            onMouseOver={() => onHover(star.index)}
            onMouseOut={() => onHover(null)}
            onClick={() => onClick(star.index)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 ${shouldFill ? "text-yellow-400" : "text-gray-300"
                }`}
              fill={shouldFill ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={shouldFill ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
