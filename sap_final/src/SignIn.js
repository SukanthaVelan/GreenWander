//signin.js

import * as React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
  },
});

export default function SignIn({ switchToSignUp }) {
  const history = useHistory();
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formValues.password.trim()) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/greenwander/signin', formValues);
        console.log('Sign in successful');
        // Store user's first name in local storage
        localStorage.setItem('userFirstName', response.data.firstName);
        localStorage.setItem('userId', response.data.id);
        // Redirect to home page
        history.push('/home'); // Replace '/home' with the path to your home page
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          // Show an alert for incorrect password
          alert('Incorrect email or password. Please try again.');
        } else {
          // Show a generic error alert
          alert('Incorrect email or password. Please try again.');
        }
      }
    }
  };

  const handleHomeButtonClick = () => {
    history.push('/');
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography align="center" variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Greenwander
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
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box p={5} bgcolor="rgba(240, 240, 240, 0.6)" borderRadius={4}  sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center' // Add this line for center alignment
            }}>
            <Avatar sx={{ m: 1, bgcolor: '#4caf50' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="./ForgetPassword" variant="body2" sx={{ color: 'black' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <br></br>
                <Grid item>
                  <Link href="./SignUp" variant="body2" onClick={switchToSignUp} sx={{ color: 'black' }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>        
      {/* Background Image */}
      <style>
        {`
          body {
            background-image: url('https://media.canadianunderwriter.ca/uploads/2021/03/Carbon-Footprint-1536x1152.jpg');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
        `}
      </style>
    </ThemeProvider>
  );
}
