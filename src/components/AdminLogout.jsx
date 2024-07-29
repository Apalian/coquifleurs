import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('admin_logged_in');
        navigate('/admin');
    }, [navigate]);

    return <div>Déconnexion en cours...</div>;
}

export default AdminLogout;
