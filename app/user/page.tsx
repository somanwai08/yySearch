'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import ProductCard, { BubbleTea } from './(components)/ProductCard';
import bubbleTeasData from '../../data/bubbleTeas.json';


export default function UserPage() {
  const [bubbleTeas, setBubbleTeas] = useState<BubbleTea[]>([]);

  useEffect(() => {
    // Normally you would fetch from an API, here we use static import
    setBubbleTeas(bubbleTeasData);
  }, []);

  return (
    <Container sx={{ pt: 10 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bubble Teas
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ShoppingCartIcon />}
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Cart
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
        {bubbleTeas.map((tea) => (
          <ProductCard key={tea.id} tea={tea} />
        ))}
      </Box>
    </Container>
  );
}
