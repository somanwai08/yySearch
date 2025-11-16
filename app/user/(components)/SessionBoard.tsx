'use client';

import React, { useState } from 'react';
import { Box, Chip } from '@mui/material';
import ProductCard from './ProductCard';
import { BubbleTea } from '@/dexie/db';
import { labelToText } from './labelMap';

interface SessionBoardProps {
  title: string;
  teas: BubbleTea[];
  label?: string;
  onChipClick?: () => void;
}

const SessionBoard: React.FC<SessionBoardProps> = ({ title, teas, label, onChipClick }) => {
  // Filter teas by label if provided
  const filteredTeas = label ? teas.filter((tea) => tea.labels.includes(label)) : teas;
  const displayTitle = title || labelToText(label);
  return (
    <Box sx={{ mb: 4 }}>
      {/* Top Section - Chip */}
      <Box
        sx={{
          position: 'sticky',
          top: '64px',
          bgcolor: 'transparent',
          zIndex: 9,
          p: 0,
          pl: 2,
          pr: 2,
        }}
      >
        <Chip
          label={displayTitle}
          onClick={onChipClick}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* Bottom Section - Product Cards */}
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {filteredTeas.map((tea) => (
          <ProductCard key={tea.id} tea={tea} />
        ))}
      </Box>
    </Box>
  );
};

export default SessionBoard;
