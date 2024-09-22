import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const fetchClients = async () => {
  try {
    const response = await fetch('https://loho-app-5ca1033b0269.herokuapp.com/api/clients');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched clients:', data); // Debug output
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

const Clients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClients();
      console.log('Loaded clients:', data); // Debug output
      setClients(data);
    };
    loadClients();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = clients.filter(client =>
    client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.pinfl.includes(searchTerm) ||
    client.phone.includes(searchTerm) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <TextField
        label="Search Clients"
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
        value={searchTerm}
        sx={{
          width: 200,
          height: 35,
          marginBottom: 2,
          float: 'right',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Passport Photo</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>PINFL</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Full Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <img src={client.passportPhoto} alt="Passport" style={{ width: 100, height: 'auto' }} />
                </TableCell>
                <TableCell>{client.fullName}</TableCell>
                <TableCell>{client.pinfl}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Clients;
