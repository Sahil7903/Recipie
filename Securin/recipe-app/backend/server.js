const express = require('express');
const cors = require('cors');
require('dotenv').config();
const recipeRoutes = require('./src/routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Recipe API is running...');
});

app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));