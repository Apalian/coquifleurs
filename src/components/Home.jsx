import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les produits depuis l'API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://coquifleurs.lespi.fr/api/get_products.php');
                setProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <header>
                <h1>Bienvenue sur Coquifleurs</h1>
                <p>Découvrez nos produits de haute qualité et trouvez ce que vous cherchez !</p>
            </header>

            <section>
                <h2>Produits en Vedette</h2>
                <div className="product-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p><strong>Prix:</strong> {product.price}€</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Collection:</strong> {product.collection}</p>
                                <button>Ajouter au Panier</button>
                            </div>
                        ))
                    ) : (
                        <p>Pas de produits disponibles pour le moment.</p>
                    )}
                </div>
            </section>

            <footer>
                <p>&copy; 2024 Coquifleurs. Tous droits réservés.</p>
            </footer>

            <style jsx>{`
        header {
          text-align: center;
          padding: 2rem;
          background-color: #f4f4f4;
        }

        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .product-card {
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
          width: 200px;
          text-align: center;
        }

        .product-card h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        footer {
          text-align: center;
          padding: 1rem;
          background-color: #f4f4f4;
        }
      `}</style>
        </div>
    );
}

export default Home;
