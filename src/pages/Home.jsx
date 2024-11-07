import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Health App</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/login')}>Iniciar Sesión</button>
                <button style={styles.button} onClick={() => navigate('/register')}>Registrarse</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '40px',
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '12px 30px',
        fontSize: '1.1rem',
        fontWeight: '500',
        cursor: 'pointer',
        borderRadius: '30px',
        border: '2px solid transparent',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#fff',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    },
    buttonHover: {
        borderColor: '#fff',
        background: 'rgba(255, 255, 255, 0.4)',
        transform: 'scale(1.05)',
    }
};
