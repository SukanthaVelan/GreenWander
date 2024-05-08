// ForgotPassword.js

import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

export default function ForgotPassword() {
  const history = useHistory();

  const handleHomeButtonClick = () => {
    history.push('/');
  };

  return (
    <>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Carbon Foot Print
          </Typography>
          <IconButton color="primary" onClick={handleHomeButtonClick}>
            <HomeIcon />
            <Typography variant="body2" sx={{ ml: 1 }} color={'black'}>
              Home
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Typography component="p" variant="body1">
            Please enter your email address and we'll send you a link to reset your password.
          </Typography>
          {/* Add your form components here */}
        </Box>
      </Container>
    </>
  );
}
