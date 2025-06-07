import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

const pool = new Pool({
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


  // Conexión a la base de datos
  pool.connect()
  .then(() => console.log('Conectado a la base de datos 🚀'))
  .catch(err => {
    console.error('Error al conectar a la base de datos 😵‍💫', err);
    process.exit(1);
  });



// Crear tabla al iniciar si no existe
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        category VARCHAR(100),
        thumbnail TEXT
      );
    `);
    console.log('Tabla "products" creada o ya existía');
  } catch (error) {
    console.error('Error al crear la tabla:', error);
  }
})();

// Crear tabla de categorías si no existe
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log('Tabla "categories" creada o ya existía');
  } catch (error) {
    console.error('Error al crear la tabla de categorías:', error);
  }
})();

// Crear nuevo producto
app.post('/products', async (req, res) => {
  const { title, price, category, thumbnail } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (title, price, category, thumbnail) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, price, category, thumbnail]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});


  // Endpoint para obtener productos
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Eliminar producto por id
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Crear nueva categoría
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar categoría:', error);
    res.status(500).json({ error: 'Error al agregar categoría' });
  }
});
   
// Obtener todas las categorías
app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${process.env.PORT}`);
  });

