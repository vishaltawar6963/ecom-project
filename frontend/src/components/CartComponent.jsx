import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';

export const CartComponent = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Product 1',
      price: 799,
      mrp: 999,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      quantity: 1,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 1199,
      mrp: 1499,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 1199,
      mrp: 1499,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 1199,
      mrp: 1499,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 1199,
      mrp: 1499,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D',
      quantity: 2,
    },
  ]);

  const deliveryCharge = 50;

  const getDiscountPercent = (mrp, price) => {
    if (mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // checkout logic here
  };

  const totalMrp = cartItems.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = totalMrp - totalPrice;
  const orderTotal = totalPrice + deliveryCharge;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go Shopping</Link></p>
      ) : (
        <div className="row">
          {/* Scrollable Left Side */}
          <div
            className="col-md-8 pe-4"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {cartItems.map(item => {
              const discountPercent = getDiscountPercent(item.mrp, item.price);
              return (
                <div key={item.id} className="card mb-3 bg-light border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <img src={item.image} alt={item.title} className="me-3" width="80" height="80" />

                    <div className="flex-grow-1">
                      <h5>{item.title}</h5>

                      <p className="mb-1">
                        <span className="text-muted text-decoration-line-through me-2">₹{item.mrp}</span>
                        <span className="fw-bold">₹{item.price}</span>
                      </p>

                      {discountPercent > 0 && (
                        <p className="text-success d-flex align-items-center mb-1">
                          <FaArrowDown className="me-1" />
                          {discountPercent}% OFF
                        </p>
                      )}

                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                    </div>

                    <button className="btn btn-outline-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fixed Summary Section */}
          <div className="col-md-4">
            <div className="card p-3 bg-light border-0 shadow-sm" style={{ position: 'sticky', top: '80px' }}>
              <h4>Summary</h4>
              <hr />
              <p>Total Order Amount: <span className="float-end">₹{totalMrp}</span></p>
              <p>Total Discount: <span className="float-end text-success">-₹{totalDiscount}</span></p>
              <p>Delivery Charges: <span className="float-end">₹{deliveryCharge}</span></p>
              <hr />
              <p className="fw-bold">Order Total: <span className="float-end">₹{orderTotal}</span></p>
              <button className="btn btn-success w-100" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
