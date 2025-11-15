'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import SessionBoard from './(components)/SessionBoard';
import { LABEL_MAP } from './(components)/labelMap';
import { BubbleTea } from './(components)/ProductCard';
import bubbleTeasData from '../../data/bubbleTeas.json';


export default function UserPage() {
  const [bubbleTeas, setBubbleTeas] = useState<BubbleTea[]>([]);

  useEffect(() => {
    // Normally you would fetch from an API, here we use static import
    setBubbleTeas(bubbleTeasData);
  }, []);

  // Prepare label ordering: Popular first, then the rest alphabetically by display name
  const allLabels = Object.keys(LABEL_MAP);
  const otherLabels = allLabels.filter((l) => l !== 'popular');
  otherLabels.sort((a, b) => LABEL_MAP[a].localeCompare(LABEL_MAP[b]));
  const orderedLabels = allLabels.includes('popular') ? ['popular', ...otherLabels] : otherLabels;

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
      {/* Render a SessionBoard for every label defined in LABEL_MAP (Popular first, then alphabetical) */}
      {orderedLabels.map((lbl) => (
        <SessionBoard key={lbl} title={LABEL_MAP[lbl]} teas={bubbleTeas} label={lbl} />
      ))}
    </Container>
  );
}
