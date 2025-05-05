const STORAGE_KEY = 'chuckNorrisFavorites';

export type Joke = {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
  rate: number;
}

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') || [];
};

// TODO: Add a limit to avoid filling the LocalStorage
export const saveToFavorites = (joke: Omit<Joke, 'rate'>) => {
  let favorites = getFavorites();
  if (!favorites.some((fav: Joke) => fav.id === joke.id)) {
    favorites = [...favorites, { ...joke, rate: 0 }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
  return favorites;
};

export const updateFavorite = (joke: Joke['id'], rate: number) => {
  let favorites = getFavorites();
  favorites = favorites.map((fav: Joke) => {
    if (fav.id === joke) {
      return { ...fav, rate };
    }
    return fav;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
};

export const removeFavorite = (id: Joke['id']) => {
  const favorites = getFavorites().filter((fav: Joke) => fav.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
};

