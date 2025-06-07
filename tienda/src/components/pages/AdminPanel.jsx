import { useState, useEffect } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

export function AdminPanel() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    thumbnail: ''
  });
const apiUrl = import.meta.env.VITE_API_URL;

  const [newCategory, setNewCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState('');
  const categories = useCategories();
  const navigate = useNavigate();

  // Cargar productos al iniciar y tras cambios
  const loadProducts = async () => {
    const res = await fetch(`${apiUrl}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSuccess('¡Producto agregado correctamente!');
        setTimeout(() => setSuccess(''), 2000);
        setForm({
          title: '',
          price: '',
          category: '',
          thumbnail: ''
        });
        loadProducts();
      } else {
        setSuccess('Error al agregar producto');
        setTimeout(() => setSuccess(''), 2000);
      }
    } catch (error) {
      setSuccess('Error al agregar producto');
      setTimeout(() => setSuccess(''), 2000);
      console.error('Error al crear producto:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory })
      });
      setNewCategory('');
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBackToLanding} style={styles.backButton}>
        Volver a la tienda
      </button>
      <h2 style={styles.title}>Panel de Administración</h2>
      {success && <div style={styles.success}>{success}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Nombre del producto"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Precio"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="thumbnail"
          value={form.thumbnail}
          placeholder="URL de la imagen"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Crear producto</button>
      </form>

      <div style={styles.listBox}>
        <h3 style={styles.categoryTitle}>Productos agregados</h3>
        <ul style={styles.productList}>
          {products.map(product => (
            <li key={product.id} style={styles.productItem}>
              <img src={product.thumbnail} alt={product.title} style={styles.thumb} />
              <div style={{ flex: 1 }}>
                <strong>{product.title}</strong><br />
                <span>
  ${Number(product.price).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
</span><br />
                <span style={{ color: "#888", fontSize: "0.9rem" }}>{product.category}</span>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(product.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.categoryBox}>
        <h3 style={styles.categoryTitle}>Agregar nueva categoría</h3>
        <div style={styles.categoryForm}>
          <input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="Nombre de categoría"
            style={styles.input}
          />
          <button onClick={handleAddCategory} style={styles.button}>Agregar Categoría</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    position: 'relative',
    minHeight: '500px'
  },
  backButton: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1.2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '2rem'
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    marginBottom: '1.2rem',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    padding: '0.9rem 1.5rem',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background 0.2s'
  },
  listBox: {
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '1.5rem 1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid #e3e3e3',
    color: 'black'
  },
  productList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  productItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.7rem 0',
    borderBottom: '1px solid #eee'
  },
  thumb: {
    width: '48px',
    height: '48px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  deleteBtn: {
    marginLeft: 'auto',
    background: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  categoryBox: {
    marginTop: '2.5rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '1.5rem 1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #e3e3e3'
  },
  categoryTitle: {
    marginBottom: '1rem',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  categoryForm: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center'
  }
};