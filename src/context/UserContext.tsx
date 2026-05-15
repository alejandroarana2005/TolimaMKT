import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "tolimamkt_user";

export interface UserData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  municipio: string;
  fechaNacimiento: string; // YYYY-MM-DD
  genero: string;
  bio: string;
  esCompradorLocal: boolean;
}

const INITIAL_USER: UserData = {
  nombre: "Alejandro",
  apellidos: "Arana",
  email: "alejandroarana@gmail.com",
  telefono: "315 456 7890",
  municipio: "Ibagué",
  fechaNacimiento: "2005-06-04",
  genero: "Masculino",
  bio: "",
  esCompradorLocal: true,
};

function loadFromStorage(): UserData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_USER;
    return { ...INITIAL_USER, ...JSON.parse(raw) } as UserData;
  } catch {
    return INITIAL_USER;
  }
}

interface UserContextValue {
  user: UserData;
  updateUser: (campos: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(loadFromStorage);

  const updateUser = useCallback((campos: Partial<UserData>) => {
    setUser((prev) => {
      const next = { ...prev, ...campos };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
}
