const STORAGE_KEY = 'chuckNorrisFavorites';

export type Joke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') || [];
};

export const saveToFavorites = (joke: Joke) => {
  let favorites = getFavorites();
  if (!favorites.some((fav: Joke) => fav.id === joke.id)) {
    favorites = [...favorites, { ...joke, addedAt: new Date().toISOString() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFavorite = (id: Joke['id']) => {
  const favorites = getFavorites().filter((fav: Joke) => fav.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
};

