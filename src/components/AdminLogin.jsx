import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://coquifleurs.lespi.fr/api/admin_login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Stocker le token ou marquer comme connecté
                    localStorage.setItem('admin_logged_in', 'true');
                    navigate('/admin/dashboard');
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError('Erreur de connexion'));
    };

    return (
        <div>
            <h1>Connexion Administrateur</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AdminLogin;
