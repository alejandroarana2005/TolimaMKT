import { Routes, Route, Navigate } from "react-router-dom";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { AuthProvider } from "../context/AuthContext";
import HomePage from "./pages/HomePage";
import ModaPage from "./pages/ModaPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import VendorProfilePage from "./pages/VendorProfilePage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import VendorDirectoryPage from "./pages/VendorDirectoryPage";
import VendorLayout from "./layouts/VendorLayout";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import VendorCatalogPage from "./pages/VendorCatalogPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfileLayout from "./layouts/UserProfileLayout";
import UserProfilePage from "./pages/UserProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserFavoritesPage from "./pages/UserFavoritesPage";
import UserFollowedStoresPage from "./pages/UserFollowedStoresPage";
import UserReviewsPage from "./pages/UserReviewsPage";
import UserPaymentsPage from "./pages/UserPaymentsPage";

export default function App() {
  useScrollToTop();
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/moda" element={<ModaPage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/tienda/:id" element={<VendorProfilePage />} />
      <Route path="/productos" element={<CatalogPage />} />
      <Route path="/tiendas" element={<VendorDirectoryPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/pedido/:orderId" element={<OrderConfirmationPage />} />
      <Route path="/vendedor" element={<VendorLayout />}>
        <Route index element={<Navigate to="/vendedor/dashboard" replace />} />
        <Route path="dashboard" element={<VendorDashboardPage />} />
        <Route path="catalogo" element={<VendorCatalogPage />} />
        <Route path="pedidos" element={<VendorOrdersPage />} />
      </Route>
      <Route path="/perfil" element={<UserProfileLayout />}>
        <Route index element={<UserProfilePage />} />
        <Route path="pedidos" element={<UserOrdersPage />} />
        <Route path="favoritos" element={<UserFavoritesPage />} />
        <Route path="tiendas-seguidas" element={<UserFollowedStoresPage />} />
        <Route path="reseñas" element={<UserReviewsPage />} />
        <Route path="pagos" element={<UserPaymentsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </AuthProvider>
  );
}
