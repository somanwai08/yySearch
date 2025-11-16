import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { useCart } from '../../(services)/CartContext';
import { BubbleTea } from '@/dexie/db';


interface ProductCardProps {
  tea: BubbleTea;
  onButtonClick?: () => void;
  onRemoveClick?: () => void;
  buttonText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ tea, onButtonClick, onRemoveClick, buttonText = 'Add to Cart' }) => {
  const { addToCart, items, removeFromCart, updateQuantity } = useCart();
  const [showRemove, setShowRemove] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(tea.originalId, tea.name, tea.price);
    onButtonClick?.();
  };

  const handleRemoveFromCart = async () => {
    // Find cart item by teaId
    const cartItem = items.find((it) => it.teaId === tea.originalId);
    if (cartItem && cartItem.id) {
      if (cartItem.quantity > 1) {
        await updateQuantity(cartItem.id, cartItem.quantity - 1);
      } else {
        await removeFromCart(cartItem.id);
      }
      setShowRemove(true);
    }
    onRemoveClick?.();
  };

  return (
    <>
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
            onClick={handleAddToCart}
          >
            {buttonText}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleRemoveFromCart}
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
      <Snackbar
        open={showRemove}
        autoHideDuration={3000}
        onClose={() => setShowRemove(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }} onClose={() => setShowRemove(false)}>
          Item(s) removed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
