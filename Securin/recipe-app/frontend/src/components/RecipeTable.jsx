import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import StarRating from './StarRating';

const RecipeTable = ({ recipes, onRowClick, page, setPage, limit, setLimit, totalRecipes }) => {
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '75vh' }}>
                <Table stickyHeader aria-label="recipe table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cuisine</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Time (min)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Serves</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow
                                hover
                                key={recipe.id}
                                onClick={() => onRowClick(recipe)}
                                className="table-row-clickable"
                            >
                                <TableCell>{truncate(recipe.title, 60)}</TableCell>
                                <TableCell>{recipe.cuisine || 'N/A'}</TableCell>
                                <TableCell>
                                    <StarRating rating={recipe.rating} />
                                </TableCell>
                                <TableCell>{recipe.total_time || 'N/A'}</TableCell>
                                <TableCell>{recipe.serves || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                component="div"
                count={totalRecipes}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default RecipeTable;