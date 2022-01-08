import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginacion() {
  return (
    <Stack spacing={2}>
      <Pagination count={3} shape="rounded" />
      <Pagination count={4} variant="outlined" shape="rounded" />
    </Stack>
  );
}
