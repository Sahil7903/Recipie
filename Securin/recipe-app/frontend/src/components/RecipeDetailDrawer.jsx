import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Collapse,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RecipeDetailDrawer = ({ recipe, open, onClose }) => {
    const [isTimeExpanded, setIsTimeExpanded] = useState(false);

    if (!recipe) return null;

    const nutrientOrder = [
        'calories', 'carbohydrateContent', 'cholesterolContent', 'fiberContent',
        'proteinContent', 'saturatedFatContent', 'sodiumContent', 'sugarContent', 'fatContent'
    ];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 450, padding: 3 }} role="presentation">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{recipe.title}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {recipe.cuisine}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total Time: {recipe.total_time} min</Typography>
                    <IconButton onClick={() => setIsTimeExpanded(!isTimeExpanded)}
                        sx={{ transform: isTimeExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
                <Collapse in={isTimeExpanded}>
                    <Typography>Prep Time: {recipe.prep_time || 'N/A'} min</Typography>
                    <Typography>Cook Time: {recipe.cook_time || 'N/A'} min</Typography>
                </Collapse>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>Nutrition Facts</Typography>
                <Paper variant="outlined">
                    <Table size="small">
                        <TableBody>
                            {nutrientOrder.map((key) => recipe.nutrients && recipe.nutrients[key] ? (
                                <TableRow key={key}>
                                    <TableCell sx={{ textTransform: 'capitalize', border: 0 }}>
                                        {key.replace('Content', '')}
                                    </TableCell>
                                    <TableCell align="right" sx={{ border: 0 }}>
                                        {recipe.nutrients[key]}
                                    </TableCell>
                                </TableRow>
                            ) : null)}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Drawer>
    );
};

export default RecipeDetailDrawer;