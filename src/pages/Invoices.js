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
    products: [
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
      setError(null);
    } catch (error) {
      const errorMessage = error.response?.data?.errors || 'Ошибка при создании счета';
      setError(Array.isArray(errorMessage) ? errorMessage.map(e => e.msg).join(', ') : errorMessage);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Создать счет
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Клиент Ф.И.О"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Телефон клиента"
            value={invoiceDetails.client_phone}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_phone: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Адрес клиента"
            value={invoiceDetails.client_address}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_address: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Дата счета"
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
            label="Код отслеживания"
            value={invoiceDetails.tracking_code}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, tracking_code: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            margin="normal"
            label="Личный кабинет клиента"  
            value={invoiceDetails.client_account}
            onChange={e => setInvoiceDetails({ ...invoiceDetails, client_account: e.target.value })}
            InputProps={{ style: { width: '100%', height: '48px' } }}
          />
        </Grid>
        {invoiceDetails.products.map((product, index) => (
          <Grid item xs={12} key={index}>
            <Box mb={3} p={2} border={1} borderColor="grey.300" borderRadius={2}>
              <Typography variant="h6" gutterBottom>
                Продукт {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Название магазина</InputLabel>
                    <Select
                      name="shop_name"
                      value={product.shop_name}
                      onChange={e => handleProductChange(index, e)}
                      label="Название магазина"
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
                    label="Название продукта"
                    name="product_name"
                    value={product.product_name}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Ссылка на продукт"
                    name="product_link"
                    value={product.product_link}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Цвет"
                    name="color"
                    value={product.color}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Количество"
                    name="quantity"
                    type="number"
                    value={product.quantity}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Размер"
                    name="size"
                    value={product.size}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Код продукта"
                    name="product_code"
                    value={product.product_code}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Сумма"
                    name="amount"
                    type="number"
                    value={product.amount}
                    onChange={e => handleProductChange(index, e)}
                    InputProps={{ style: { width: '100%', height: '48px' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton onClick={() => removeProduct(index)} color="error">
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={addProduct}>
              Добавить продукт
            </Button>
            <Button variant="contained" color="secondary" onClick={createInvoice}>
              Сгенерировать счет
            </Button>
          </Box>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        {docxUrl && (
          <Grid item xs={12}>
            <Typography variant="h6">Скачать счет</Typography>
            <Link href={docxUrl} download="invoice.docx">
              Нажмите здесь, чтобы скачать
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Invoices;
