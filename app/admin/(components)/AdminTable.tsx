'use client';

import { BubbleTeaService } from '@/app/(services)/bubbleTeaService';
import { type BubbleTea } from '@/dexie/db';
import {
  Box,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useMemo, type ChangeEvent } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AdminTable() {
  const bubbleTeas = useLiveQuery(() => BubbleTeaService.getBubbleTeas(), []);
  const fields = useMemo(
    () =>
      BubbleTeaService.getFields().filter(
        (field) => !['id', 'isListed', 'assetPath'].includes(field)
      ),
    []
  );

  const onAllCheckboxChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        await BubbleTeaService.listAllBubbleTea();
      } else {
        await BubbleTeaService.delistAllBubbleTea();
      }
    },
    []
  );

  const onCheckboxChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, data: BubbleTea) => {
      if (event.target.checked) {
        await BubbleTeaService.listBubbleTea(data);
      } else {
        await BubbleTeaService.delistBubbleTea(data);
      }
    },
    []
  );

  const displayValue = useCallback((value: any) => {
    if (Array.isArray(value)) return value.join(', ');
    return value;
  }, []);

  return (
    <Box sx={{ overflowY: 'auto' }}>
      <TableContainer>
        <Table stickyHeader sx={{ padding: '1rem' }}>
          <TableHead sx={{ backgroundColor: 'lightgray' }}>
            <TableRow>
              <StyledTableCell
                key="head-isListed"
                align="center"
                padding="checkbox"
                sx={{ backgroundColor: 'lightgray' }}
              >
                <Checkbox
                  sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                  checked={
                    bubbleTeas?.every((bubbleTea) =>
                      'isListed' in bubbleTea ? !!bubbleTea.isListed : false
                    ) ?? false
                  }
                  onChange={onAllCheckboxChange}
                />
              </StyledTableCell>
              {fields.map((field) => (
                <StyledTableCell
                  key={`head-${field}`}
                  align="center"
                  sx={{ backgroundColor: 'lightgray' }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>{field}</Typography>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bubbleTeas?.map((bubbleTea) => (
              <TableRow
                key={`row-${bubbleTea.id}`}
                role="checkbox"
                sx={{ tabIndex: -1 }}
                hover
              >
                <TableCell
                  key={`cell-checkbox-${bubbleTea.id}`}
                  align="center"
                  padding="checkbox"
                >
                  <Checkbox
                    color="secondary"
                    checked={
                      'isListed' in bubbleTea ? !!bubbleTea.isListed : false
                    }
                    onChange={(e) => onCheckboxChange(e, bubbleTea)}
                  />
                </TableCell>
                {fields.map((field) => (
                  <TableCell
                    key={`cell-${field}-${bubbleTea.id}`}
                    align="center"
                  >
                    {field in bubbleTea
                      ? displayValue(bubbleTea[field as keyof BubbleTea])
                      : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
