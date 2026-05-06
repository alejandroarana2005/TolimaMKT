import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import VendorProfilePage from "./pages/VendorProfilePage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import VendorDirectoryPage from "./pages/VendorDirectoryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/tienda/:id" element={<VendorProfilePage />} />
      <Route path="/productos" element={<CatalogPage />} />
      <Route path="/tiendas" element={<VendorDirectoryPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/pedido/:orderId" element={<OrderConfirmationPage />} />
    </Routes>
  );
}
