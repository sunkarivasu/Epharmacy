import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Menu, MenuItem, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Temporary auth state
  const [username, setUsername] = useState('John'); // Temporary username
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#003161',
      color: '#fff', // Set text color to white for better contrast
    }}>
      <div>
        <h3 style={{ margin: 0 }}>EPharmacy</h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>Sign In</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/medicines" style={{ color: '#fff', margin: '0 1rem', textDecoration: 'none' }}>Medicines</Link>
            <IconButton onClick={() => navigate('/cart')} style={{ color: '#fff' }}>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <span
              style={{ margin: '0 1rem', cursor: 'pointer', color: '#fff' }}
              onClick={handleMenuOpen}
            >
              Welcome, {username}
            </span>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
              <MenuItem onClick={() => navigate('/orders')}>My Orders</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
