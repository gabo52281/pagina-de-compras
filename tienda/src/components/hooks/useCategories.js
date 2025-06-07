// hooks/useCategories.js
import { useEffect, useState } from 'react'

export function useCategories() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error al cargar categorías:', err))
  }, [])

  return categories
}
  