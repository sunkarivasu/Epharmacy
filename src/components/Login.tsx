import React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here (e.g., validate against database)
    console.log('Login submitted');
    navigate('/'); // Redirect to the homepage on successful login
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px auto'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          bgcolor: '#fff',
          p: 3,
          borderRadius: 2,
          border: '1px solid #ccc',
        }}
      >
        {/* Form Header */}
        <Box
          sx={{
            bgcolor: '#003161',
            color: '#fff',
            textAlign: 'center',
            py: 2,
            borderRadius: '4px 4px 0 0',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Sign In or Sign Up
          </Typography>
        </Box>

        {/* Description */}
        <Box
          sx={{
            bgcolor: '#f9f9f9',
            color: '#003161',
            textAlign: 'center',
            py: 2,
            mt: 1,
            borderRadius: '4px',
          }}
        >
          <Typography variant="body2">
            Sign up or Sign in to access your orders, special offers, health tips, and more!
          </Typography>
        </Box>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ marginTop: '1rem' }}>
          {/* Email Field */}
          <TextField
            placeholder="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              bgcolor: '#fff',
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />

          {/* Password Field */}
          <TextField
            placeholder="Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              bgcolor: '#fff',
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />

          {/* Sign In Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#3652AD',
              color: '#fff',
              fontWeight: 'bold',
              py: 1.5,
              ':hover': { bgcolor: '#2d468d' },
            }}
          >
            Sign In
          </Button>

          {/* OR Divider */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 2,
            }}
          >
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#d3d3d3' }} />
            <Typography variant="body2" sx={{ mx: 2, color: '#757575' }}>
              OR
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#d3d3d3' }} />
          </Box>

          {/* Create New Account Button */}
          <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centers the button horizontally
                mt: 2,
            }}
            >
            <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                bgcolor: '#000',
                color: '#fff',
                fontWeight: 'bold',
                py: 1.5,
                px: 3,
                ':hover': { bgcolor: '#333' },
                }}
            >
                Create New Account
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
