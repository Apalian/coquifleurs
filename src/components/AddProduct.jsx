// src/components/AddProduct.js
import React, { useState } from 'react';

function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [collection, setCollection] = useState(''); // Nouveau champ

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://yourdomain.com/add_product.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name, description, price, stock, collection })
        })
            .then(response => response.text())
            .then(data => alert(data));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
            <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} placeholder="Collection" />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default AddProduct;
