//signup.js


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

export default function SignUp({ switchToSignIn }) {
  const history = useHistory();

  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
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
    if (!formValues.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formValues.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formValues.password.trim()) {
      errors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8081/greenwander', formValues);
        console.log('Response from server:', response.data);
        history.push('/Signin'); // Navigate to the home page after successful submission
      } catch (error) {
        console.error('Error:', error);
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            p={4}
            bgcolor="rgba(240, 240, 240, 0.6)"
            borderRadius={4}
            sx={{
              marginTop: 0.25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#4caf50' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formValues.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formValues.password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="./SignIn"
                    variant="body2"
                    onClick={switchToSignIn}
                    sx={{ color: 'black' }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>

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