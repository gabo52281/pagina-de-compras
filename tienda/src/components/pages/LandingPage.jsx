import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminButton } from '../AdminButton';

export function LandingPage({ toggleAdmin, onEnter }) {
  const navigate = useNavigate();

  const handleAdmin = () => {
    toggleAdmin();
    navigate('/admin');
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Logo tienda"
          style={styles.logo}
        />
        <h1 style={styles.title}>¡Bienvenido a nuestra tienda!</h1>
        <p style={styles.subtitle}>
          Encuentra los mejores productos al mejor precio.<br />
          Todo lo que necesitas, en un solo lugar.
        </p>
        <div style={styles.features}>
          <div style={styles.feature}>
            <span role="img" aria-label="envío" style={styles.emoji}>🚚</span>
            <span>Envíos a todo el país</span>
          </div>
          <div style={styles.feature}>
            <span role="img" aria-label="descuento" style={styles.emoji}>💸</span>
            <span>Ofertas semanales</span>
          </div>
          <div style={styles.feature}>
            <span role="img" aria-label="soporte" style={styles.emoji}>📞</span>
            <a
    href="https://wa.me/573134228376"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.whatsappBtn}
  >
    Soporte 24/7
  </a>
          </div>
        </div>
        <button
          onClick={onEnter}
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#ff3b2e'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff6f61'}
        >
          Explorar la tienda
        </button>
      </div>
      <AdminButton isAdminPanel={false} onClick={toggleAdmin} />
      <footer style={styles.footer}>
        <span>© {new Date().getFullYear()} MiTienda.com | Síguenos en 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.link}> Instagram</a>
        </span>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url("https://newsroom.psyma.com/mx/wp-content/uploads/2018/10/ecommerce-890x600.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(255,111,97,0.5) 0%, rgba(0,0,0,0.7) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: '#fff',
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  logo: {
    width: '90px',
    marginBottom: '1.5rem',
    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    lineHeight: '1.6',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '2.5rem',
    flexWrap: 'wrap'
  },
  feature: {
    background: 'rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '0.8rem 1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  emoji: {
    fontSize: '1.5rem'
  },
  button: {
    padding: '1rem 2.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#ff6f61',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    marginTop: '1.5rem'
  },
  footer: {
  
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    padding: '1rem 0',
    background: 'rgba(0,0,0,0.25)',
    fontSize: '1rem',
    zIndex: 2
  },
  link: {
    color: '#ffb3a7',
    marginLeft: '0.5rem',
    textDecoration: 'underline'
  
  },
  whatsappBtn: {
  background: '#25D366',
  color: '#fff',
  border: 'none',
  borderRadius: '20px',
  padding: '0.4rem 1.2rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  marginLeft: '0.5rem',
  transition: 'background 0.2s'
}
};