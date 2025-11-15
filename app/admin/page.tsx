'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { BubbleTeaService } from '../(services)/bubbleTeaService';
import AdminTable from './(components)/AdminTable';

export default function AdminPage() {
  useEffect(() => {
    BubbleTeaService.insertIfEmpty();
  }, []);

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar color="secondary" position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Page
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography
        variant="body2"
        component="div"
        sx={{
          fontWeight: 'bold',
          alignSelf: 'start',
          padding: '1rem',
          paddingBottom: 0,
          fontStyle: 'italic',
          color: 'grey',
        }}
      >
        Check / uncheck to list / delist bubble tea
      </Typography>
      <AdminTable />
    </Container>
  );
}
