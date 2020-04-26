import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader } from "./MyTitle";
import { MyButton } from "./MyButton";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
    width: '300px'
  },
  margin: {
    marginBottom: 16
  }
}));

const CreateReviewModal = ({ request_id, review_id, passenger_id, driver_id, fetchData }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [form, setForm] = useState({
    comment: "",
    rating: 0
  });

  const isDisabled = form.comment.length > 1000 ;

  const handleOpen = async () => {
    if (review_id != null) {
      await getReview();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getReview = async () => {
    try {
      const response = await axios.get("http://localhost:4000/review/getReviewById", { params: { review_id } });
      const { success, review, message } = response.data;
      if (success) {
        setForm({ comment: review.comment, rating: review.rating });
      } else {
        setErr(message);
      }
    } catch (e) {
      setErr('Cannot access database');
    }
  }

  const review = async () => {
    try {
      const { ...data } = form;
      const response = await axios.post("http://localhost:4000/review/create", { passenger_id, driver_id, request_id, ...data });
      const { success, message } = response.data;
      if (success) {
        setOpen(false);
        fetchData();
      } else {
        setErr(message);
      }
    } catch (e) {
      setErr('Cannot access database')
    }
  };

  return (
    <div>
      <MyButton type="button" onClick={handleOpen}>
        Review
       </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Review</MyHeader>
          <div style={{ margin: "0 auto" }}>
            <Rating name="sizeLarge"
              defaultValue={form.rating}
              precision={1}
              size="large"
              disabled={review_id != null}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                setForm({ ...form, rating: newValue });
              }}
            />
          </div>
          <TextField
            label="Comment"
            className={classes.margin}
            value={form.comment}
            multiline
            disabled={review_id != null}
            onChange={e => {
              setForm({ ...form, comment: e.target.value });
              setErr(null)
            }}
          />
          {err !== "" && <div style={{ color: "red", marginTop: '16px' }}>{err}</div>}
          <div style={{ marginTop: "0px", display: 'flex' }}>
            {review_id != null ? (<Button onClick={handleClose} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>) :
              <React.Fragment>
                <Button onClick={review} color="secondary" style={{ fontSize: 16, flexGrow: 1 }} disabled={isDisabled}>OK</Button>
                <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>Cancel</Button>
              </React.Fragment>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateReviewModal

