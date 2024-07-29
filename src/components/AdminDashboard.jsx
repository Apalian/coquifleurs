
// src/components/AdminDashboard.js
import React, { useState } from 'react';

function AdminDashboard() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        collection: '',
        productId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://coquifleurs.lespi.fr/admin_dashboard.php', { method: 'POST', body: formData })
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {/* Formulaire pour ajouter un produit */}
            <form onSubmit={handleSubmit}>
                <h2>Add Product</h2>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" step="0.01" required />
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
                <input type="text" name="collection" value={formData.collection} onChange={handleChange} placeholder="Collection" />
                <button type="submit">Add Product</button>
            </form>

            {/* Formulaire pour supprimer un produit */}
            <form onSubmit={handleSubmit}>
                <h2>Delete Product</h2>
                <input type="number" name="productId" value={formData.productId} onChange={handleChange} placeholder="Product ID" required />
                <button type="submit">Delete Product</button>
            </form>

            {/* Formulaire pour modifier un produit */}
            <form onSubmit={handleSubmit}>
                <h2>Update Product</h2>
                <input type="number" name="productId" value={formData.productId} onChange={handleChange} placeholder="Product ID" required />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" step="0.01" />
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
                <input type="text" name="collection" value={formData.collection} onChange={handleChange} placeholder="Collection" />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default AdminDashboard;
