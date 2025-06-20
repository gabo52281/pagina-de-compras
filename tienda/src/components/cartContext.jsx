import { createContext,useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}) {
    const [cart, setCart] = useState([])

    const addToCart = product => {
         const productInCart = cart.findIndex(item => item.id === product.id)

         if (productInCart >= 0) {
            const newCart = structuredClone(cart) 
            newCart[productInCart].quantity += 1
            return setCart(newCart)
        
         }

         setCart(prevState => {
            return [...prevState, 
                {...product, 
                    quantity: 1}] 
         })
    }



    const removeFromCart = product => {
        setCart(prevState => {
            const productInCart = prevState.findIndex(item => item.id === product.id);
    
            if (productInCart >= 0) {
                const newCart = structuredClone(prevState);
    
                if (newCart[productInCart].quantity > 1) {
                    newCart[productInCart].quantity -= 1; // Reduce la cantidad
                    return newCart;
                }
    
                // Si la cantidad es 1, elimina el producto del carrito
                return newCart.filter(item => item.id !== product.id);
            }
    
            return prevState; // Si el producto no está en el carrito, no hace nada
        });
    };
        const ClearCart = () => {
            setCart([])
        }

    

return (
    <CartContext.Provider value={{
        cart,
        addToCart,
        ClearCart,
        removeFromCart
    }}>
        {children}
    </CartContext.Provider>

)

}