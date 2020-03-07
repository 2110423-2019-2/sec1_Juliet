import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall'

const MemberCard = ({ data }) => {
  const { open, setOpen } = useState(false)
  const { pickup, setPickup } = useState(false)
  const {
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    request_id
  } = data;
  const PickUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/pickupMember", { request_id });
      const { success, error, message} = response.data;
      if (success) {
        setPickup(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Paper
      square
      variant="outlined"
      style={{
        marginTop: "16px",
        padding: "16px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: 'center' }}>
        <img
          src={photo}
          height={50}
          width={50}
          style={{ borderRadius: "100%", marginRight: "8px" }}
        />
        <div>
          <MyTitle>{username}</MyTitle>
          <div
            style={{ color: "#C78899", textDecoration: "underline", fontSize: 14 }}
            onClick={() => { setOpen(true) }}
          >
            see location detail
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
        <div>
          {firstname} {lastname}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
        <div>
          {phone_number}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "24px"
        }}
      >
	{!pickup&&(
	<div>
        <MyButton onClick={PickUp} style={{ alignSelf: "center" }}>Pick up</MyButton>
        <MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Drop off</MyGreyButton>
	</div>
	)}
	{pickup&&(
        <div>
	<MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Pick up</MyGreyButton>
        <MyButton style={{ alignSelf: "center" }}>Drop off</MyButton>
	</div>
	)}
      </div>
    </Paper>
  );
};

export default withRouter(MemberCard);
