// src/components/ProductList.js
import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://yourdomain.com/get_products.php')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h1>Produits</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}€</p>
                        <p>Collection: {product.collection}</p> {/* Affichage de la collection */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
