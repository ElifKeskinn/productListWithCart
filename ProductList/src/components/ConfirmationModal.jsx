import React from 'react';
import Modal from 'react-modal';
//react modal kullanmak daha kolayıma geliyo hocam

const ConfirmationModal = ({ cart, onNewOrder, onRequestClose }) => {
    const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
            contentLabel="Order Confirmation"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="confirmation-content">
                <div className="icon">✔</div>
                <h2>Order Confirmed</h2>
                <p>We hope you enjoy your food!</p>
                <ul id="confirmation-items" className="order-items">
                    {Object.entries(cart).map(([id, item]) => (
                        <li key={id}>
                            <div className="order-item">
                                <img src={`https://dummyjson.czaylabs.com.tr/api/products/${id}/thumbnail`} alt={item.name} />
                                {/*burada fotoyu çekemiyorum*/}
                                <div className="order-item-details">
                                    <strong>{item.name}</strong>
                                    <p style={{ color: 'red' }}>{item.quantity}x @ ${item.price.toFixed(2)}</p>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                    <p className="order-total">Order Total: ${totalPrice}</p>
                    <button className="new-order" onClick={onNewOrder}>Start New Order</button>
                </ul>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
