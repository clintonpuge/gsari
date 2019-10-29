import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const Modal = (props) => {
  const {
    modal,
    error,
    loading,
    success,
    subject,
    errorResp,
    formMethod,
    description,
    handleClose,
    handleChange,
    handleCreate,
  } = props;
  let label = "Create";
  if (formMethod === "Update") {
    label = "Update";
  }
  return (
    <div>
      <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
        {loading && <LinearProgress />}
        <DialogTitle id="form-dialog-title">Create Topic</DialogTitle>
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
          style={{ display: errorResp ? "" : "none", margin: "0 20px" }}
        >
          {errorResp}
        </div>
        <div
          className="alert alert-success" role="alert"
          style={{ display: success ? "" : "none", margin: "0 20px" }}
        >
          Topic is successfully created.
        </div>
        <DialogContent>
          <TextField
            id="subject"
            name="subject"
            label="Subject"
            fullWidth
            value={subject}
            onChange={handleChange}
          />
          <TextField
            id="description"
            name="description"
            multiline
            label="Description"
            fullWidth
            rows="4"
            value={description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">{label}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
