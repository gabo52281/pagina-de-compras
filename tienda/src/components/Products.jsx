import { useContext } from 'react'
import { FiltersContext } from './FiltersContext'
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from './useCart.js'


export function Products({ products }) {

  
  const {addToCart,removeFromCart, cart} = useCart()

  const checkProductInCart = product => {
  
    return cart.some(item => item.id === product.id)
  }
 

  const { filters } = useContext(FiltersContext)

  const filteredProducts = products.filter(product => {
    return (
      product.price >= filters.minPrice &&
      (filters.category === 'all' || product.category === filters.category)
    )
  })

  return (
    <main className='products'>
      <ul>
        {filteredProducts.map(product => {
          const isproductInCart = checkProductInCart(product)

          return (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
  <strong>{product.title}</strong> - 
  <span>
    ${Number(product.price).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
  </span>
</div>
            <div>
              <button style={{backgroundColor: isproductInCart? 'red' : '#09f'} } onClick={() => {
              
              isproductInCart 
            ? removeFromCart(product)
            : addToCart(product)
          }}
           >
              {

                isproductInCart 
                ? <RemoveFromCartIcon/> 
                : <AddToCartIcon />
              }
              
              </button>
              </div>
          </li>
        )
        })}
      </ul>
    </main>
  )
}
