export function AdminButton({ isAdminPanel, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: isAdminPanel ? '#ff6f61' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        zIndex: 1000,
      }}
    >
      {isAdminPanel ? 'Volver a la tienda' : 'Admin'}
    </button>
  );
}