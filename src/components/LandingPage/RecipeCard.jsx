import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RecipeCard = ({ name, description, ingredients, direction, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={name}
    
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={name}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
    
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
