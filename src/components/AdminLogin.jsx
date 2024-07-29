import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://coquifleurs.lespi.fr/api/admin_login.php', {
                username,
                password
            });
            if (response.data.success) {
                // Stocker le token ou marquer comme connecté
                localStorage.setItem('admin_logged_in', 'true');
                navigate('/admin/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Erreur de connexion');
        }
    };

    return (
        <div>
            <h1>Connexion Administrateur</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AdminLogin;
