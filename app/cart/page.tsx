'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Divider, Button, Alert } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/navigation';
import { useCart } from '../(services)/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const increase = async (id: number) => {
    const item = items.find((it) => it.id === id);
    if (item) {
      await updateQuantity(id, item.quantity + 1);
    }
  };

  const decrease = async (id: number) => {
    const item = items.find((it) => it.id === id);
    if (item) {
      await updateQuantity(id, item.quantity - 1);
    }
  };

  // Calculate subtotal for each item and total
  const cartSummary = items.reduce(
    (acc, item) => {
      const subtotal = (item.price ?? 0) * item.quantity;
      return {
        total: acc.total + subtotal,
        items: [...acc.items, { ...item, subtotal }],
      };
    },
    { total: 0, items: [] as (typeof items[0] & { subtotal: number })[] }
  );

  const handleSubmitOrder = async () => {
    // Simulate order submission
    await clearCart();
    setShowSuccess(true);
    // After 3s hide the alert and show the Back link
    setTimeout(() => {
      setShowSuccess(false);
      setShowBack(true);
    }, 3000);
  };

  return (
    <Container sx={{ pt: 2, pb: 4 }}>
      {/* Top Back Link */}
      <Box sx={{ mb: 2, ml: 0 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/user')}
          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
        >
          Back to Bubble Tea List
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Cart
      </Typography>

      {/* Success Alert */}
      {showSuccess && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => {
            setShowSuccess(false);
            setShowBack(true);
          }}
        >
          Order submitted successfully! Your cart has been cleared.
        </Alert>
      )}

      <Box>
        {items.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <List>
              {cartSummary.items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton edge="end" aria-label="decrease" onClick={() => decrease(item.id!)}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                        <IconButton edge="end" aria-label="increase" onClick={() => increase(item.id!)}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`HKD ${item.price} × ${item.quantity} = HKD ${item.subtotal.toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            {/* Summary Section */}
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1" fontWeight="600">
                  Total:
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  HKD {cartSummary.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmitOrder}
              sx={{ mt: 3 }}
            >
              Submit Order
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
