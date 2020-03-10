import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Map from "../component/Map"
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader } from "../component/MyTitle";
import { MyButton,MyGreyButton } from "../component/MyButton";

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
    padding: theme.spacing(2, 4, 3),
    width: '300px'
  },
  margin: {
    marginBottom: 16
  }
}));

const RequestJoin = ({ trip_id, member_id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //const [joined,setJoined] = React.useState(false);
  const [form, setForm] = useState({
    departure_latitude: 13.769059,
    departure_longtitude: 100.493117,
    departure_detail: "",
    destination_latitude: 13.769059,
    destination_longtitude: 100.493117,
    destination_detail: ""
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /*const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/trip/passenger", { params: { trip_id } });
      const { success, passenger } = response.data;
      if (success) {
         setJoined(passenger.filter(i => i.id == member_id)[0]!=null);
      }
    } catch (e) {
      console.log(e);
    }
  };
   useEffect(() => {
    fetchData();
  }, []);
  */
  const join = async () => {
    try {
      const { ...data } = form;
      const response = await axios.post("http://localhost:4000/request", { trip_id,member_id, ...data});
      const { success } = response.data;
      if (success) {
	//fetchData();
	setOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
	<MyButton type="button" onClick={handleOpen}>
        Join
       </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Join trip</MyHeader>
          <TextField
            label="Pick up"
            className={classes.margin}
	    value={form.departure_detail}
            onChange={e => {
              setForm({ ...form ,departure_detail: e.target.value });
            }}
          />
          <Map setLocation={(departure_longtitude, departure_latitude) => setForm({ ...form, departure_longtitude, departure_latitude })} />
          <TextField
            label="Destination"
            className={classes.margin}
	    value={form.destination_detail}
            onChange={e => {
              setForm({ ...form , destination_detail: e.target.value });
            }}
          />
          <Map setLocation={(destination_longtitude, destination_latitude) => setForm({ ...form, destination_longtitude, destination_latitude })} />
          <div style={{ marginTop: "25px", display: 'flex' }}>
            <Button onClick={join} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>
            <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default RequestJoin