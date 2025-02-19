'use client'

import ContainerLabel from '@/components/ContainerLabel/ContainerLabel';
import { InvoiceStore, InvoiceType } from '@/store/invoicesStore';
import { 
  Box, InputAdornment, MenuItem, Select, Stack, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import style from './ListInvoice.module.scss'

const columns = [
  { id: 'Number', label: 'Invoice', minWidth: 170 },
  { id: 'Due Date', label: 'Due Date', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 170, },
  { id: 'Amount', label: 'Amount', minWidth: 170, },
  { id: 'Actions', label: 'Actions', minWidth: 170, },
] as const;

const colorStatus = {
  "Paid": { bg: '#21965314', text: '#219653' },
  "Unpaid": { bg: '#D3405314', text: '#D34053' },
  "Pending": { bg: '#FFA70B14', text: '#FFA70B' },
};

function ListInvoice() {
  const { invoices } = InvoiceStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ambil nilai dari query params
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  // Fungsi untuk memperbarui query params
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filter invoices berdasarkan query params
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.Number.toLowerCase().includes(search.toLowerCase()) &&
    (status === '' || invoice.Status === status)
  );

  return (
    <Stack direction={'column'} gap={4}>
      <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
        <span className='font-bold text-[26px] text-black'>My Invoices</span>
        <Box display="flex" gap={'25px'}>
          {/* Search Input */}
          <TextField
            variant='outlined'
            className={style.input}
            placeholder="Search"
            value={search}
            onChange={(e) => updateQueryParams('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white", borderRadius: 3, width: 216, height: 38, "& fieldset": { border: "none" } }}
          />

          {/* Dropdown */}
          <Select
            value={status || 'all'}
            displayEmpty
            IconComponent={ExpandMoreIcon}
            sx={{ backgroundColor: "white", borderRadius: 3, width: 135, height: 38 }}
            onChange={(e) => updateQueryParams('status', e.target.value === 'all' ? '' : e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </Box>
      </Stack>
      <ContainerLabel>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className='!bg-[#f7f9fc] border-none'
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No items
                  </TableCell>
                </TableRow>
              ) :filteredInvoices.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                  {columns.map((column) => {
                    const value = row[column.id as keyof InvoiceType];
                    return (
                      <TableCell key={column.id} align={"center"}>
                        {column.id === "Actions" ? (
                          <MenuIcon sx={{ color: '#7e7e7e' }} />
                        ) : column.id === "Status" ? (
                          <span
                            className='py-1 px-[14px] rounded-3xl'
                            style={{ backgroundColor: colorStatus[row.Status].bg, color: colorStatus[row.Status].text }}
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ContainerLabel>
    </Stack>
  );
}

export default ListInvoice;
