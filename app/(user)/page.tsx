'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { BubbleTeaService } from '../(services)/bubbleTeaService';

export default function UserPage() {
  useEffect(() => {
    BubbleTeaService.insertIfEmpty();
  }, []);

  return (
    <Container>
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
    </Container>
  );
}
