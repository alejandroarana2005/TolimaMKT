import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import { FollowedStoresProvider } from "./context/FollowedStoresContext.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <FavoritesProvider>
          <FollowedStoresProvider>
            <App />
          </FollowedStoresProvider>
        </FavoritesProvider>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
