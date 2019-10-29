import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { onCreateMsg, onGetMsg } from '../actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Your Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
});

class TopicMessages extends Component {

  constructor() {
    super();
    this.state = {
      message: "",
      error: "",
      modal: false,
      currentTopicMsgs: [],
      currentPage: 1,
    };
  }

  handleClose = () => {
    this.setState({
      modal: false,
      error: "",
    });
  }

  handleCreate = () => {
    const { message } = this.state;
    const token = sessionStorage.getItem('token');
    if (message === "") {
      this.setState({ error: "Message field is required." });
    } else {
      this.props.onCreateMsg({ message, token, id: this.props.match.params.id });
      this.props.onGetMsg({ page: this.state.currentPage, id: this.props.match.params.id });
    }
  }

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpen = () => {
    this.setState({
      modal: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (
        JSON.stringify(this.props.currentTopicMsgs) !== JSON.stringify(prevProps.currentTopicMsgs)
      ) {
      this.setState({ currentTopicMsgs: this.props.currentTopicMsgs });
    }
  }

  fetchMsgs = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.props.onGetMsg({ page: this.state.currentPage, id: this.props.match.params.id });
  }

  componentDidMount() {
    this.props.onGetMsg({ page: this.state.currentPage, id: this.props.match.params.id });
  }

  render() {
    const { error, modal, currentTopicMsgs } = this.state;
    const { classes, loading, success, hasMore } = this.props;
    const errorResponse = this.props.error || "";
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit">
              Sari
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Messages
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Topic ID: {this.props.match.params.id}
              </Typography>
              <Link to="/">Go Back</Link>
              <div className={classes.heroButtons}>
                <Grid container justify="center">
                  <Grid>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>
                      Create message.
                    </Button>
                  </Grid>
                </Grid>
                <Dialog open={modal} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  {loading && <LinearProgress />}
                  <DialogTitle id="form-dialog-title">Create Message</DialogTitle>
                  <div
                    className="alert alert-warning"
                    role="alert"
                    style={{ display: error ? "" : "none", margin: "0 20px" }}
                  >
                    All Fields are required.
                  </div>
                  <div
                    className="alert alert-warning"
                    role="alert"
                    style={{ display: errorResponse.length ? "" : "none", margin: "0 20px" }}
                  >
                    {errorResponse}
                  </div>
                  <div
                    className="alert alert-success" role="alert"
                    style={{ display: success ? "" : "none", margin: "0 20px" }}
                  >
                    Message is successfully created.
                  </div>
                  <DialogContent>
                    <TextField
                      id="message"
                      name="message"
                      label="Message"
                      fullWidth
                      rows="4"
                      multiline
                      onChange={this.handleChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleCreate} color="primary">Create</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
          {loading && <LinearProgress />}
            <InfiniteScroll
              dataLength={currentTopicMsgs.length}
              next={this.fetchMsgs}
              hasMore={hasMore}
              loader={<LinearProgress />}
            >
              <Grid container>
                {currentTopicMsgs.length <= 0 && <p>No data found.</p>}
                {currentTopicMsgs.map((card, index) => (
                  <Grid key={`${card}-${index}`} item xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography variant="h6" color="textSecondary">
                        {card.message}
                        </Typography>
                        <p color="textSecondary">Posted by: {card.created_by}</p>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.response,
    loading: state.loading,
    error: state.error,
    success: state.success,
    hasMore: state.hasMore,
    redirectFromTopic: state.redirectFromTopic,
    currentTopicMsgs: state.currentTopicMsgs,
  };
};

export default connect(mapStateToProps,{
  onCreateMsg,
  onGetMsg,
})(withStyles(useStyles, { withTheme: true })(TopicMessages));