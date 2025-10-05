import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'white' }} spacing={2} direction="row">
      <CircularProgress size={30} color="teal" />
    </Stack>
  );
}