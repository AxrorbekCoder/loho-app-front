import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { FaUserAlt, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'agent') {
        navigate('/agent');
      } else {
        alert('Unknown role!');
      }
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <FaUserAlt style={{ marginRight: '10px' }} />
                <TextField
                  label="Username"
                  variant="standard"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <FaLock style={{ marginRight: '10px' }} />
                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}


export default LoginPage;
