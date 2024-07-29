import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        collection: '',
        productId: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('admin_logged_in')) {
            navigate('/admin');
        } else {
            fetchProducts();
        }
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://coquifleurs.lespi.fr/api/get_products.php');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = formData.productId
                ? 'http://coquifleurs.lespi.fr/api/update_product.php'
                : 'http://coquifleurs.lespi.fr/api/add_product.php';

            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData)
            });
            fetchProducts();
            // Réinitialiser le formulaire après soumission
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                collection: '',
                productId: '',
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la mise à jour du produit:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await fetch('http://coquifleurs.lespi.fr/api/delete_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ product_id: productId })
            });
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
        }
    };

    return (
        <div>
            <h1>Tableau de Bord Administrateur</h1>

            {/* Formulaire pour ajouter ou modifier un produit */}
            <form onSubmit={handleSubmit}>
                <h2>{formData.productId ? 'Modifier un produit' : 'Ajouter un produit'}</h2>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Prix" step="0.01" />
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" />
                <input type="text" name="collection" value={formData.collection} onChange={handleChange} placeholder="Collection" />
                <button type="submit">{formData.productId ? 'Mettre à jour Produit' : 'Ajouter Produit'}</button>
            </form>

            {/* Liste des produits */}
            <h2>Liste des produits</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}€</p>
                        <p>Stock: {product.stock}</p>
                        <p>Collection: {product.collection}</p>
                        <button onClick={() => setFormData({ ...product })}>Modifier</button>
                        <button onClick={() => handleDelete(product.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            {/* Déconnexion */}
            <a href="/admin/logout">Déconnexion</a>
        </div>
    );
}

export default AdminDashboard;
