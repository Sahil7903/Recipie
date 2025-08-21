import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(totalStars)].map((_, index) => {
                return index < filledStars ? (
                    <StarIcon key={index} sx={{ color: '#FFD700' }} />
                ) : (
                    <StarBorderIcon key={index} sx={{ color: '#FFD700' }} />
                );
            })}
        </Box>
    );
};

export default StarRating;