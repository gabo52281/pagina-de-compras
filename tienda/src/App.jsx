import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Products } from "./components/Products.jsx";
import { Header } from "./components/header.jsx";
import { Cart } from "./components/cart.jsx";
import { CartProvider } from "./components/cartContext.jsx";
import { LandingPage } from "./components/pages/LandingPage.jsx";
import { FiltersContext } from "./components/FiltersContext.jsx";
import { AdminPanel } from "./components/pages/AdminPanel.jsx";

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const { filters } = useContext(FiltersContext);
    const navigate = useNavigate();

    const filterProducts = (products) => {
        return products.filter(product => (
            product.price >= filters.minPrice &&
            (filters.category === 'all' || product.category === filters.category)
        ));
    };

    const loadProducts = () => {
          fetch(`${apiUrl}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error al cargar productos:', error));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const goToAdmin = () => {
        setIsAdmin(true);
        navigate("/admin");
    };

    const backToLanding = () => {
        setIsAdmin(false);
        navigate("/");
    };

    const filteredProducts = filterProducts(products);

    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={
                    <LandingPage
                        onEnter={() => navigate("/store")}
                        toggleAdmin={goToAdmin}
                    />
                } />
                <Route path="/store" element={
                    <>
                        <Header />
                        <Cart />
                        <Products products={filteredProducts} />
                    </>
                } />
               <Route path="/admin" element={
  isAdmin
    ? <AdminPanel
        onBackToLanding={backToLanding}
        products={products}
        reloadProducts={loadProducts}
      />
    : <Navigate to="/" />
} />
                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
        </CartProvider>
    );
}

export default App;