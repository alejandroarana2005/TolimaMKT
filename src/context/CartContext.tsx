import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Producto } from "../data/types";

/* ── Types ─────────────────────────────────────────────────────────── */

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  removeItem: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

/* ── Context ────────────────────────────────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tolimamkt_cart";

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

/* ── Provider ───────────────────────────────────────────────────────── */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage);

  /* Persist on every change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((producto: Producto, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? {
                ...i,
                cantidad: Math.min(
                  i.cantidad + cantidad,
                  producto.stock
                ),
              }
            : i
        );
      }
      return [...prev, { producto, cantidad: Math.min(cantidad, producto.stock) }];
    });
  }, []);

  const removeItem = useCallback((productoId: string) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  }, []);

  const updateQuantity = useCallback(
    (productoId: string, cantidad: number) => {
      if (cantidad <= 0) {
        setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.producto.id === productoId
            ? { ...i, cantidad: Math.min(cantidad, i.producto.stock) }
            : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const getTotal = useCallback(
    () => items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0),
    [items]
  );

  const getTotalItems = useCallback(
    () => items.reduce((sum, i) => sum + i.cantidad, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ── Hook ───────────────────────────────────────────────────────────── */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
