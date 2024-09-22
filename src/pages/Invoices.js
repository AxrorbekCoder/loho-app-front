import axios from 'axios';
import React, { useState } from 'react';
import {
  MenuItem, FormControl, InputLabel, Select, TextField, Button,
  Typography, Link, IconButton, Box, Grid, Paper
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const Invoices = () => {
  const [clientId, setClientId] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState({
    client_phone: '',
    client_address: '',
    invoice_date: '',
    tracking_code: '',
    client_account: '',
    products: [{
      shop_name: '',
      product_name: '',
      product_link: '',
      color: '',
      quantity: '',
      size: '',
      product_code: '',
      amount: ''
    }]
  });
  const [error, setError] = useState(null);
  const [docxUrl, setDocxUrl] = useState('');

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...invoiceDetails.products];
    updatedProducts[index][name] = value;
    setInvoiceDetails({ ...invoiceDetails, products: updatedProducts });
  };

  const addProduct = () => {
    setInvoiceDetails({
      ...invoiceDetails,
      products: [
        ...invoiceDetails.products,
        {
          shop_name: '',
          product_name: '',
          product_link: '',
          color: '',
          quantity: '',
          size: '',
          product_code: '',
          amount: ''
        }
      ]
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...invoiceDetails.products];
    updatedProducts.splice(index, 1);
    setInvoiceDetails({ ...invoiceDetails, products: updatedProducts });
  };

  const createInvoice = async () => {
    try {
      const response = await axios.post('https://loho-app-5ca1033b0269.herokuapp.com/api/invoices/generate-docx', {
        clientId,
        invoiceDetails
      });
      setDocxUrl(response.data.docxUrl);
      setError(null); // Clear any previous errors
    } catch (error) {
      const errorMessage = error.response?.data?.errors || 'Error creating invoice';
      setError(Array.isArray(errorMessage) ? errorMessage.map(e => e.msg).join(', ') : errorMessage);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Create Invoice
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Client F.I.O"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Client Phone"
            value={invoiceDetails.client_phone}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_phone: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Client Address"
            value={invoiceDetails.client_address}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_address: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Invoice Date"
            type="date"
            value={invoiceDetails.invoice_date}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, invoice_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Tracking Code"
            value={invoiceDetails.tracking_code}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, tracking_code: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Client Account"
            value={invoiceDetails.client_account}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_account: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        {invoiceDetails.products.map((product, index) => (
          <Grid item xs={12} key={index}>
            <Box mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2}>
              <Typography variant="h6" gutterBottom>
                Product {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Shop Name</InputLabel>
                    <Select
                      name="shop_name"
                      value={product.shop_name}
                      onChange={(e) => handleProductChange(index, e)}
                      label="Shop Name"
                      sx={{ width: '100%', height: '48px' }}
                    >
                      <MenuItem value="Rakuten">Rakuten</MenuItem>
                      <MenuItem value="Zara">Zara</MenuItem>
                      <MenuItem value="Zozotown">Zozotown</MenuItem>
                      <MenuItem value="Uniqlo">Uniqlo</MenuItem>
                      <MenuItem value="Muji">Muji</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Product Name"
                    name="product_name"
                    value={product.product_name}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Product Link"
                    name="product_link"
                    value={product.product_link}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Size"
                    name="size"
                    value={product.size}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Product Code"
                    name="product_code"
                    value={product.product_code}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Amount"
                    name="amount"
                    type="number"
                    value={product.amount}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
              </Grid>
              <IconButton onClick={() => removeProduct(index)}>
                <Remove />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button onClick={addProduct} variant="contained" color="primary" startIcon={<Add />}>
        Add Product
      </Button>
      <Button onClick={createInvoice} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
        Generate Invoice
      </Button>

      {error && <Typography color="error">{error}</Typography>}
      {docxUrl && (
        <Typography>
          Invoice generated! Download it <Link href={docxUrl} target="_blank">here</Link>.
        </Typography>
      )}
    </Paper>
  );
};

export default Invoices;
