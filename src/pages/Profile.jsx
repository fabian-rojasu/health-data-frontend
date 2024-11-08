import { useEffect, useState } from 'react';
import { ModalUpdateUser } from '../components/ModalUpdateUser';

export const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Función para hacer el fetch del perfil de usuario
  const fetchUserProfile = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`http://127.0.0.1:8000/profile/${token}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setFormData(data); // Inicializar el formulario con los datos actuales
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Llama a fetchUserProfile solo al montar el componente

  // Abre el modal
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Maneja cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Guarda los cambios y vuelve a cargar el perfil
  const handleSaveChanges = () => {
    const token = localStorage.getItem('token');
    
    fetch(`http://127.0.0.1:8000/profile/${token}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        birthday: new Date(formData.birthday).toISOString().split('T')[0], // Asegura el formato correcto de fecha
        gender: formData.gender,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      fetchUserProfile(); // Vuelve a cargar el perfil después de la actualización
      setIsModalOpen(false); // Cierra el modal
    })
    .catch(error => console.error('Error:', error));
  };

  //Metodo para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      <div style={styles.container}>
        {isLoading ? (
          <p style={styles.loadingText}>Cargando...</p>
        ) : (
          data ? (
            <div style={styles.profileCard}>
              <h2 style={styles.title}>Perfil de Usuario</h2>
              <div style={styles.profileInfo}>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Username:</strong> {data.username}</p>
                <p><strong>Birthday:</strong> {data.birthday}</p>
                <p><strong>Gender:</strong> {data.gender}</p>
              </div>
              <button style={styles.editButton} onClick={handleEditClick}>Modificar</button>
              <div>
                <button style={styles.editButton} onClick={handleLogout}>Cerrar Sesion</button>
              </div>
            </div>
          ) : (
            <p style={styles.noData}>No se encontraron datos del perfil</p>
          )
        )}

        {/* Renderiza el modal si está abierto */}
        {isModalOpen && (
          <ModalUpdateUser
            formData={formData}
            onClose={handleCloseModal}
            onSave={handleSaveChanges}
            onChange={handleInputChange}
          />
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f7f9fc',
    padding: '20px',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  profileInfo: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  },
  editButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
