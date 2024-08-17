import React from 'react';

const Cart = ({ cart, onConfirmOrder, onRemoveFromCart }) => {
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="cart">
            <span>Your Cart ({totalItems})</span>
            <div className="cart-items">
                {totalItems === 0 ? (
                    <div className="empty-cart">
                        <img src="/cartimg.png" alt="Empty Cart Img" />
                        <p>Your added items will appear here</p>
                    </div>
                ) : (
                    <ul id="cart-list">

                        {Object.entries(cart).map(([id, item]) => (
                            <li key={id}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p style={{ color: 'red' }}>Quantity: {item.quantity}</p>
                                    <p>Price per unit: ${item.price.toFixed(2)}</p>
                                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button
                                    className="remove"
                                    onClick={() => onRemoveFromCart(id)}
                                >
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {totalItems > 0 && <p id="total-price">Order Total: ${totalPrice}</p>}
                {totalItems > 0 && (
                    <button id="confirm-order" onClick={onConfirmOrder}>Confirm Order</button>

                )
                }
            </div>
        </div>
    );
};

export default Cart;
