const pool = require('../config/db');

// GET /api/recipes - Get all recipes with pagination
exports.getAllRecipes = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    try {
        const results = await pool.query(
            'SELECT * FROM recipes ORDER BY rating DESC NULLS LAST LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        const totalCountResult = await pool.query('SELECT COUNT(*) FROM recipes');
        const total = parseInt(totalCountResult.rows[0].count, 10);

        res.json({
            data: results.rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error while fetching recipes.' });
    }
};

// GET /api/recipes/search - Search for recipes
exports.searchRecipes = async (req, res) => {
    const { title, cuisine, total_time, rating, calories } = req.query;

    let query = 'SELECT * FROM recipes WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (title) {
        query += ` AND title ILIKE $${paramIndex++}`;
        params.push(`%${title}%`);
    }
    if (cuisine) {
        query += ` AND cuisine = $${paramIndex++}`;
        params.push(cuisine);
    }
    if (total_time) {
        const [operator, value] = Object.entries(total_time)[0];
        const symbol = { gt: '>', lt: '<', eq: '=' }[operator] || '=';
        query += ` AND total_time ${symbol} $${paramIndex++}`;
        params.push(parseInt(value, 10));
    }
    if (rating) {
        const [operator, value] = Object.entries(rating)[0];
        const symbol = { gt: '>', lt: '<', eq: '=' }[operator] || '=';
        query += ` AND rating ${symbol} $${paramIndex++}`;
        params.push(parseFloat(value));
    }
    if (calories) {
        const [operator, value] = Object.entries(calories)[0];
        const symbol = { gt: '>', lt: '<', eq: '=' }[operator] || '=';
        // Note the casting to float for JSONB numeric value
        query += ` AND (nutrients->>'calories')::float ${symbol} $${paramIndex++}`;
        params.push(parseFloat(value));
    }

    try {
        const results = await pool.query(query, params);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error during search.' });
    }
};