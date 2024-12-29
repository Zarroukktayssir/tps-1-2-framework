const express = require('express');
const app = express();

// Middleware pour analyser le JSON dans le corps des requêtes
app.use(express.json());

// Tableau pour stocker les produits
let products = [];

// Middleware de validation des données du produit
function validateProductData(req, res, next) {
    const { name, price } = req.body;

    // Vérification que 'name' est une chaîne de caractères non vide
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: "Le champ 'name' est requis et doit être une chaîne de caractères non vide." });
    }

    // Vérification que 'price' est un nombre positif
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: "Le champ 'price' est requis et doit être un nombre positif." });
    }

    // Si les validations passent, continuer vers la route
    next();
}

// Route POST pour ajouter un produit
app.post('/add-product', validateProductData, (req, res) => {
    const { name, price } = req.body;

    // Création d'un nouvel objet produit
    const newProduct = {
        id: products.length + 1, // ID simple basé sur la longueur du tableau
        name,
        price
    };

    // Ajout du produit à la liste
    products.push(newProduct);

    // Réponse de succès
    res.status(201).json({ message: 'Produit ajouté avec succès', product: newProduct });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
});

// Démarrer le serveur sur le port 5001
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
