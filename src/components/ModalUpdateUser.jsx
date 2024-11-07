import React from 'react';

export const ModalUpdateUser = ({ formData, onClose, onSave, onChange }) => {
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2>Editar Perfil</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={onChange}
          style={styles.input}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={onChange}
          style={styles.input}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password || ''}
          onChange={onChange}
          style={styles.input}
        />
        <label>Birthday:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday || ''}
          onChange={onChange}
          style={styles.input}
        />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formData.gender || ''}
          onChange={onChange}
          style={styles.input}
        />
        <div style={styles.modalActions}>
          <button style={styles.saveButton} onClick={onSave}>Guardar</button>
          <button style={styles.cancelButton} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxSizing: 'border-box', // Ajusta el tamaño de los inputs
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
