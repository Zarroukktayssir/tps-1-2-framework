const express = require('express');
const app = express();


app.use(express.json());


function validateAge(req, res, next) {
    const { age } = req.body;

    
    if (age !== undefined && age < 0) {
        
        const error = new Error("L'âge ne peut pas être négatif.");
        error.status = 400; 
        return next(error); 
    }

    
    next();
}


app.post('/test-age', validateAge, (req, res) => {
    res.status(200).json({
        message: "La requête est valide",
        data: req.body
    });
});

app.use((err, req, res, next) => {
    // Si l'erreur a un statut, l'utiliser ; sinon, utiliser 500
    const status = err.status || 500;

    
    res.status(status).json({
        error: err.message || 'Une erreur est survenue'
    });
});


app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
