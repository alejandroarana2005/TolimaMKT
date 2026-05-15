import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "tolimamkt_followed_stores";
const DEMO_DEFAULTS = ["v-001", "v-003", "v-007"];

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

interface FollowedStoresContextValue {
  followedStores: string[];
  toggleFollow: (vendedorId: string) => void;
  isFollowing: (vendedorId: string) => boolean;
}

const FollowedStoresContext = createContext<FollowedStoresContextValue | null>(null);

export function FollowedStoresProvider({ children }: { children: ReactNode }) {
  const [followedStores, setFollowedStores] = useState<string[]>(loadFromStorage);

  const toggleFollow = useCallback((vendedorId: string) => {
    setFollowedStores((prev) => {
      const next = prev.includes(vendedorId)
        ? prev.filter((id) => id !== vendedorId)
        : [...prev, vendedorId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (vendedorId: string) => followedStores.includes(vendedorId),
    [followedStores]
  );

  return (
    <FollowedStoresContext.Provider value={{ followedStores, toggleFollow, isFollowing }}>
      {children}
    </FollowedStoresContext.Provider>
  );
}

export function useFollowedStores(): FollowedStoresContextValue {
  const ctx = useContext(FollowedStoresContext);
  if (!ctx) throw new Error("useFollowedStores must be used inside <FollowedStoresProvider>");
  return ctx;
}
