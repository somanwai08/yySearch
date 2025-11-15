'use client';

import React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useCart } from '../(services)/CartContext';

export default function CartPage() {
  const { items, updateQuantity } = useCart();

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

  return (
    <Container sx={{ pt: 10 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Your Cart
      </Typography>

      <Box>
        {items.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        ) : (
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton edge="end" aria-label="decrease" onClick={() => decrease(item.id!)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton edge="end" aria-label="increase" onClick={() => increase(item.id!)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={item.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
