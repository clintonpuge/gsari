import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router'

import { onLogin } from '../actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Your Website
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: false,
    };
  }
  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };
  clickSubmit =  async(e) => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      this.setState({ error: true });
    } else {
      const { email, password } = this.state;
      await this.props.onLogin({ email, password });
    }
  }
 
  render() {
    const { classes, currentUser } = this.props;
    const { error } = this.state;
    const { message } = this.props.error;
    if (Object.keys(currentUser).length) {
      return <Redirect to="/" />
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            S
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <div className="alert alert-warning" role="alert" style={{ display: error ? "" : "none" }} >
              Email/Password required.
            </div>
            <div className="alert alert-warning" role="alert" style={{ display: this.props.error.message ? "" : "none" }} >
              {message}
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={this.clickSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  };
  
}

const mapStateToProps = state => {
  return {
    loading: state.loading, 
    error: state.error,
    currentUser: state.currentUser,
  };
};
export default connect(mapStateToProps, { onLogin },)(withStyles(useStyles, { withTheme: true })(Signin));
