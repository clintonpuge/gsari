import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { onRegister } from '../actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/signin">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      error: "",
    };
  }
  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };
  clickSubmit =  async(e) => {
    e.preventDefault();
    const { email, password, name } = this.state;
    if (email === '' || password === '' || name === '') {
      this.setState({ error: true });
    } else {
      this.props.onRegister({ email, name, password });
    }
  }
  render() {
    const { classes, success } = this.props;
    const { error } = this.state;
    const { message } = this.props.error;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            S
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <div className="alert alert-warning" role="alert" style={{ display: error ? "" : "none" }} >
              Invalid fields.
            </div>
            <div className="alert alert-warning" role="alert" style={{ display: this.props.error.message ? "" : "none" }} >
              {message}
            </div>
            <div className="alert alert-success" role="alert" style={{ display: success ? "" : "none" }}>
              Successfully registered. Click <Link to="/signin" variant="body2">
                here 
              </Link>
               to Login.
            </div>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    success: state.success,
  };
};

export default connect(mapStateToProps, { onRegister },)(withStyles(useStyles, { withTheme: true })(Signup));
