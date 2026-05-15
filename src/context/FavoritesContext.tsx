import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "tolimamkt_favorites";
const DEMO_DEFAULTS = ["p-001", "p-005", "p-008"];

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_DEFAULTS));
      return DEMO_DEFAULTS;
    }
    return JSON.parse(raw) as string[];
  } catch {
    return DEMO_DEFAULTS;
  }
}

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (productoId: string) => void;
  isFavorite: (productoId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(loadFromStorage);

  const toggleFavorite = useCallback((productoId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(productoId)
        ? prev.filter((id) => id !== productoId)
        : [...prev, productoId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (productoId: string) => favorites.includes(productoId),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
