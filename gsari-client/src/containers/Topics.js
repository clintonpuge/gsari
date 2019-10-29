import React, { PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';


import { onGetTopics, onCreateTopic, onUpdateTopic, onDeleteTopic, onLogout } from '../actions';

import Modal from '../components/Modal';

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
    padding: theme.spacing(2, 0, 6, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
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

class Topics extends PureComponent {

  constructor() {
    super();
    this.state = {
      subject: "",
      description: "",
      error: "",
      modal: false,
      loading: false,
      success: false,
      currentPage: 1,
      topics: [],
      isUpdate: false,
      currentTopicId: "",
      formMethod: "",
      deleteAlert: false,
    };
  }

  handleClose = () => {
    this.setState({
      modal: false,
      subject: "",
      error: "",
      description: "",
      formMethod: "",
      currentTopicId: "",
    });
  }

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpen = () => {
    this.setState({
      modal: true,
      formMethod: "Create",
      error: "",
    });
  }

  handleOpenUpdate = ({ subject, description, id }) => {
    this.setState({
      modal: true,
      formMethod: "Update",
      subject,
      description,
      currentTopicId: id,
    });
  }

  handleCreate = (e) => {
    e.preventDefault();
    const { subject, description, formMethod, currentTopicId } = this.state;
    if (subject === '' || description === '') {
      this.setState({ error: true });
    } else {
      const token = sessionStorage.getItem('token');
      if (formMethod === "Update") {
        this.props.onUpdateTopic({ subject, description, token, id: currentTopicId });
      } else {
        this.props.onCreateTopic({ subject, description, token });
      }
    }
  }

  handleDelete = (id) => {
    this.setState({ deleteAlert: true, currentTopicId: id });
  }

  fetchTopics = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.props.onGetTopics(this.state.currentPage);
  }

  handleDeleteClose = (isDelete = false) => {
    const token = sessionStorage.getItem('token');
    if (isDelete) {
      this.props.onDeleteTopic({ id: this.state.currentTopicId, token });
    }
    this.setState({
      deleteAlert: false,
      currentTopicId: "",
    });
  }

  handleLogout = () => {
    this.props.onLogout();
  }

  componentDidUpdate(prevProps) {
    if (
        JSON.stringify(this.props.topics) !== JSON.stringify(prevProps.topics) ||
        this.props.redirectFromMsg
      ) {
      this.setState({ topics: this.props.topics });
    }
  }

  componentDidMount() {
    this.props.onGetTopics(this.state.currentPage);
  }

  render() {
    const { classes, loading, success, hasMore } = this.props;
    const { modal, error, submit, topics, subject, description, formMethod, deleteAlert } = this.state;
    const errorResp = this.props.error || "";
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit">
              Sari
            </Typography>
            <Link to="/signin">
              <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Topics
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  List of topics
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container justify="center">
                    <Grid>
                      <Button variant="contained" color="primary" onClick={this.handleOpen}>
                        Create Topic
                      </Button>
                    </Grid>
                  </Grid>
                  <Modal
                    handleClose={this.handleClose}
                    handleChange={this.handleChange}
                    handleCreate={this.handleCreate}
                    modal={modal}
                    error={error}
                    success={success}
                    loading={loading}
                    submit={submit}
                    subject={subject}
                    errorResp={errorResp}
                    formMethod={formMethod}
                    description={description}
                  />
                  <Dialog
                    open={deleteAlert}
                    onClose={ () => this.handleDeleteClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Delete Topic"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this topic?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.handleDeleteClose(false)} color="primary">
                        No
                      </Button>
                      <Button onClick={() => this.handleDeleteClose(true)} color="secondary">
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Container>
            </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {loading && <LinearProgress />}
            <InfiniteScroll
              dataLength={topics.length}
              next={this.fetchTopics}
              hasMore={hasMore}
              loader={<LinearProgress />}
            >
              <Grid container>
                {topics.length <= 0 && <p>No data found.</p>}
                {topics.map((card, index) => (
                  <Grid key={`${card}-${index}`} item xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h4" component="h2">
                          {card.subject}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {card.description}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          Created: {card.created_at}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/topic/${card._id}/messages`} variant="body2">
                          <Button size="small" color="primary">
                            View Messages
                          </Button>
                        </Link>
                        <Button disabled={currentUser.id !== card.created_by} size="small" color="primary" onClick={
                          () => this.handleOpenUpdate({ subject: card.subject, description: card.description, id: card._id })
                        }>
                          Edit
                        </Button>
                        <Button disabled={currentUser.id !== card.created_by} size="small" color="primary" onClick={() => this.handleDelete(card._id) }>
                          Delete
                        </Button>
                      </CardActions>
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
    currentPage: state.currentPage,
    loading: state.loading,
    error: state.error,
    success: state.success,
    topics: state.topics,
    token: state.token,
    hasMore: state.hasMore,
    redirectFromMsg: state.redirectFromMsg,
  };
};

export default connect(mapStateToProps,
    { onGetTopics, onCreateTopic, onUpdateTopic, onDeleteTopic, onLogout }
  )(withStyles(useStyles, { withTheme: true })(Topics));
