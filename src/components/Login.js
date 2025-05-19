import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      localStorage.setItem('jwtToken', response.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanner = async () => {
    setScanning(true);
    setError('');

    try {
      const mockScanResult = {
        email: 'demo@jananiaarogya.com',
        password: 'demo@123'
      };

      setEmail(mockScanResult.email);
      setPassword(mockScanResult.password);
      await handleLogin({ preventDefault: () => {} });
    } catch (err) {
      setError('Scanning failed. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Janani Aarogya Login
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={scanning || loading}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={scanning || loading}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, height: 48 }} disabled={loading || scanning}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">OR</Typography>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleScanner}
            disabled={loading || scanning}
            fullWidth
            sx={{ height: 48 }}
            startIcon={scanning ? <CircularProgress size={20} /> : null}
          >
            {scanning ? 'Scanning...' : 'Login with QR Code'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
