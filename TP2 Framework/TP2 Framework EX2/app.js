const express = require('express');
const app = express();

app.use(express.json());

// Middleware pour valider les champs username et password
function validateCredentials(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  next();
}

// Route POST /login
app.post('/login', validateCredentials, (req, res) => {
  res.send('Login successful!');
});

const port = 5001; // Assurez-vous que vous utilisez le bon port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

