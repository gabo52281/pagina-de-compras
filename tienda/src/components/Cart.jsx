import './cart.css';

import { useId } from "react";

import { CartIcon,ClearCartIcon} from "./Icons";
import { useCart } from "./useCart.js";


function CartItem ({ thumbnail, price, title, quantity, addToCart, removeFromCart }) {
    return (
      <li>
        <img
          src={thumbnail}
          alt={title}
        />
        <div>
          <strong>{title}</strong> - ${price}
        </div>
  
        <footer>
          
        <button onClick={removeFromCart}>-</button>

          <small>
            Qty: {quantity}
          </small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    )
  }
  
  export function Cart () {
    const cartCheckboxId = useId()
    const { cart, ClearCart, addToCart, removeFromCart } = useCart()
  

    // Calcula el total de productos en el carrito
  const totalProducts = cart.reduce((total, product) => total + product.quantity, 0);
    
  // Calcula el total de dinero en el carrito
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  
  return (
      <>
        <label className='cart-button' htmlFor={cartCheckboxId}>
          <CartIcon />
          {totalProducts > 0 && <span className="cart-counter">{totalProducts}</span>}
        </label>
        <input id={cartCheckboxId} type='checkbox' hidden />
      
        <div className='cart'>
          
          <ul>
            {cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}

                {...product}
              />
            ))}
          </ul>
            
            
        <footer className='cart-footer'>
          <div className="cart-total">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button onClick={ClearCart}>
            <ClearCartIcon />
            vaciar
          </button>
        </footer>
        </div>
      </>
    )
  }