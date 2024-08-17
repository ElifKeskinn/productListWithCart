import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ConfirmationModal from './components/ConfirmationModal';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.czaylabs.com.tr/api/products');
            const data = await response.json();
            setProducts(data.data);
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    if (products.length === 0) {
        fetchProducts();
    }


    const handleAddToCart = (id, name, price) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[id]) {
                updatedCart[id].quantity += 1;
            } else {
                updatedCart[id] = { name, price, quantity: 1 };
            }
            return updatedCart;
        });
    };

    const handleRemoveFromCart = (id) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[id].quantity > 1) {
                updatedCart[id].quantity -= 1;
            } else {
                delete updatedCart[id];
            }
            return updatedCart;
        });
    };

    const handleConfirmOrder = () => {
        setShowConfirmation(true);
    };

    const handleNewOrder = () => {
        setCart({});
        setShowConfirmation(false);
    };

    return (
        <div className="app">

            <header>
                <h1>Deserts</h1>
                </header>
                <Cart cart={cart} onConfirmOrder={handleConfirmOrder} onRemoveFromCart={handleRemoveFromCart} />
,            <main className="main-content">
                <div className="product-container">
                    <ProductList products={products} onAddToCart={handleAddToCart} cart={cart} onRemoveFromCart={handleRemoveFromCart} />
                </div>
            </main>
            {showConfirmation && (
                <ConfirmationModal
                    cart={cart}
                    onNewOrder={handleNewOrder}
                    onRequestClose={() => setShowConfirmation(false)}
                />
            )}
        </div>
    );
};

export default App;
