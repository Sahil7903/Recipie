import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import RecipeTable from './components/RecipeTable';
import RecipeDetailDrawer from './components/RecipeDetailDrawer';
import './App.css';

const API_URL = 'http://localhost:5000/api/recipes';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [page, setPage] = useState(0); // MUI TablePagination is 0-indexed
    const [limit, setLimit] = useState(15);
    const [totalRecipes, setTotalRecipes] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                // API is 1-indexed for pages, so we add 1
                const response = await axios.get(`${API_URL}?page=${page + 1}&limit=${limit}`);
                setRecipes(response.data.data);
                setTotalRecipes(response.data.pagination.total);
                setError(null);
            } catch (err) {
                setError('Failed to fetch recipes. Is the backend server running?');
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [page, limit]);

    const handleRowClick = (recipe) => {
        setSelectedRecipe(recipe);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recipe Finder 🧑‍🍳
            </Typography>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>}
            
            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
            
            {!loading && !error && (
                <RecipeTable
                    recipes={recipes}
                    onRowClick={handleRowClick}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    totalRecipes={totalRecipes}
                />
            )}
             {!loading && recipes.length === 0 && !error && (
                 <Typography sx={{mt: 4, textAlign: 'center'}}>No recipes found. Try seeding the database!</Typography>
             )}

            <RecipeDetailDrawer
                recipe={selectedRecipe}
                open={drawerOpen}
                onClose={handleDrawerClose}
            />
        </Container>
    );
}

export default App;