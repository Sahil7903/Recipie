const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const cleanAndSeed = async () => {
    try {
        const dataPath = path.join(__dirname, '..', '..', 'data', 'recipes.json');
        const recipesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        console.log('Starting to seed database...');
        const client = await pool.connect();

        await client.query('TRUNCATE TABLE recipes RESTART IDENTITY CASCADE');
        console.log('Existing table data cleared.');

        for (const recipe of recipesData) {
            const toIntOrNull = (val) => (val === "NaN" || isNaN(parseInt(val, 10)) ? null : parseInt(val, 10));
            const toFloatOrNull = (val) => (val === "NaN" || isNaN(parseFloat(val)) ? null : parseFloat(val));

            const query = `
                INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

            const values = [
                recipe.cuisine,
                recipe.title,
                toFloatOrNull(recipe.rating),
                toIntOrNull(recipe.prep_time),
                toIntOrNull(recipe.cook_time),
                toIntOrNull(recipe.total_time),
                recipe.description,
                recipe.nutrients,
                recipe.serves
            ];
            await client.query(query, values);
        }

        console.log('✅ Database seeded successfully!');
        client.release();
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
};

cleanAndSeed();