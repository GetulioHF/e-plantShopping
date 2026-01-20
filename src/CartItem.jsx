import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  // Inserted by GetulioHF
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
        const quantity = item.quantity;
        const cost = parseFloat(item.cost.substring(1));
        total += quantity * cost;
    });
    return total; 
  };

  // GetulioHF
  const handleContinueShopping = (e) => {
    onContinueShopping(e); 
  };

  // GetulioHF
  const handleIncrement = (item) => {
//    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // GetulioHF
  const handleDecrement = (item) => {
    if (item.quantity > 1) {  
        const newQuantity = item.quantity - 1;
        dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  // GetulioHF
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  // GetulioHF
  const calculateTotalCost = (item) => {
    const quantity = item.quantity;
    const cost = parseFloat(item.cost.substring(1)); // Removes "$" - convert to number
    return quantity * cost;
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
