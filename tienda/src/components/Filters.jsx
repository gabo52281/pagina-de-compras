// components/Filters.jsx
import { useState, useContext } from 'react'
import { FiltersContext } from './FiltersContext'
import { useCategories } from './hooks/useCategories'

export function Filters() {
  const { filters, setFilters } = useContext(FiltersContext)
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const categories = useCategories()

  const handleChangeCategory = (e) => {
    setFilters(prev => ({
      ...prev,
      category: e.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio a partir de:</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          onChange={e => {
            setMinPrice(e.target.value)
            setFilters(prev => ({
              ...prev,
              minPrice: e.target.value
            }))
          }}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categoría</label>
        <select id='category' value={filters.category} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
 