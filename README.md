# TolimaMKT

Marketplace digital para emprendedores del departamento del Tolima, Colombia. Conecta compradores con vendedores locales de moda, artesanía, alimentación y más.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Routing | React Router v6 |
| Estilos | Inline CSS + Tailwind CSS (utilidades) |
| Iconos | Lucide React |
| Fuente | DM Sans (Google Fonts) |
| Deploy | Vercel (frontend) · Railway (backend, futuro) |

---

## Instalación y desarrollo

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd tolima-mkt

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

El servidor queda disponible en `http://localhost:5173`.

### Otros comandos

```bash
npm run build      # Build de producción (salida en /dist)
npm run preview    # Vista previa del build local
npm run lint       # Linter
```

---

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base del backend | `http://localhost:3000` |
| `VITE_APP_NAME` | Nombre de la aplicación | `TolimaMKT` |

En producción, configura estas variables en el dashboard de Vercel (Settings → Environment Variables).

---

## Estructura de carpetas

```
src/
├── app/
│   ├── App.tsx                  # Definición de rutas
│   ├── components/
│   │   ├── atoms/               # ButtonPrimary, TagCategoria, LoadingSpinner…
│   │   ├── molecules/           # ProductCard, MiniVendor, Rating…
│   │   └── organisms/           # Header, Hero, Footer, ProductGrid…
│   ├── layouts/
│   │   ├── UserProfileLayout.tsx
│   │   └── VendorLayout.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── ModaPage.tsx
│       ├── CatalogPage.tsx
│       ├── ProductDetailPage.tsx
│       ├── VendorProfilePage.tsx
│       ├── CartPage.tsx
│       ├── CheckoutPage.tsx
│       ├── OrderConfirmationPage.tsx
│       └── ...                  # Perfil de usuario, panel de vendedor
├── config/
│   └── env.ts                   # Variables de entorno tipadas
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── FavoritesContext.tsx
│   ├── FollowedStoresContext.tsx
│   └── UserContext.tsx
├── data/
│   ├── productos.ts
│   ├── vendedores.ts
│   ├── municipios.ts
│   └── types.ts
├── hooks/
│   └── useScrollToTop.ts
└── assets/
    └── images/
```

---

## Despliegue en Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Vercel detecta Vite automáticamente. Confirma:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Agrega las variables de entorno en Settings → Environment Variables
4. El archivo `vercel.json` en la raíz maneja el rewrite de SPA para que rutas directas como `/producto/123` o `/perfil` no devuelvan 404

---

## Licencia

Proyecto académico — Universidad de Ibagué · 2026
