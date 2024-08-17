import React from 'react';

const ProductList = ({ products, onAddToCart, cart, onRemoveFromCart }) => {
    return (
        
        <div id="product-list" className="product-list">
            
            {products.map(product => (
                <div className={`product ${cart[product.id] ? 'in-cart' : ''}`} key={product.id}>
                    <img 
                        src={product.image.thumbnail} 
                        alt={product.name} 
                        className={cart[product.id] ? 'border-red' : ''}
                    />
                    <h2>{product.name}</h2>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">${product.price}</p>
                    <div className="product-footer">
                        {cart[product.id] ? (
                            <div className="quantity-controls">
                                <button onClick={() => onRemoveFromCart(product.id)}>-</button>
                                <span>{cart[product.id].quantity}</span>
                                <button onClick={() => onAddToCart(product.id, product.name, product.price)}>+</button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onAddToCart(product.id, product.name, product.price)} >
                                <span className="cart-icon">🛒</span> Add to Cart
                            </button>
                        
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
