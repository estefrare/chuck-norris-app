const STORAGE_KEY = 'chuckNorrisFavorites';

export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') || [];
};
