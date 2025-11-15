import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

export interface BubbleTea {
  id: number;
  assetPath: string;
  name: string;
  description: string;
  currency: string;
  price: number;
}


interface ProductCardProps {
  tea: BubbleTea;
  onButtonClick?: () => void;
  onRemoveClick?: () => void;
  buttonText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ tea, onButtonClick, onRemoveClick, buttonText = 'Add to Cart' }) => {
  return (
    <Card sx={{ maxWidth: 345, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 400 }}>
      {tea.assetPath && (
        <CardMedia
          component="img"
          height="180"
          image={`/${tea.assetPath}`}
          alt={tea.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {tea.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
           {tea.price}{tea.currency}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {tea.description || 'No description.'}
        </Typography>
      </CardContent>
      <Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={onRemoveClick}
          sx={{
            bgcolor: 'white',
            borderColor: '#7B1FA2',
            color: '#7B1FA2',
            '&:hover': {
              bgcolor: '#f3e5f5',
              borderColor: '#7B1FA2',
              color: '#7B1FA2',
            },
          }}
        >
          Remove from Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
