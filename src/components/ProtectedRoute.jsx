import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('admin_logged_in') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default ProtectedRoute;
