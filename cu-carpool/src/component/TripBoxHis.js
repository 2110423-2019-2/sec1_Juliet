import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton, MyGreyButton } from "./MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from "./MapData";
import moment from "moment";

const TripBoxHis = ({ history, data }) => {
  const {
    id,
    trip_id,
    start_datetime,
    request_status,
    plate_license,
    car_brand,
    price,
    departure_latitude,
    departure_longtitude,
    destination_latitude,
    destination_longtitude,
    owner_firstname,
    departure_detail,
    destination_detail
  } = data;

  const datetime = moment(start_datetime).format("MMMM Do YYYY h:mm a");

  const handleCancel = async () => {
    console.log("yes");
    // TODO
    const response = await axios.post("http://localhost:4000/trip/cancelTrip", {
      id
    });
    console.log(response);
    const { success } = response.data;
    if (success) {
      this.fetchData();
    }
  };

  return (
    <Paper
      square
      variant="outlined"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "#BDBDBD",
        marginBottom: "16px"
      }}
    >
      <Paper
        square
        elevation={0}
        style={{
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#C78899"
        }}
      >
        <MyTitle
          style={{
            fontSize: "20px",
            color: "#FFFFFF",
            marginLeft: "6px"
          }}
        >
          {datetime}
        </MyTitle>
      </Paper>

      <Paper
        square
        elevation={0}
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"
        }}
      >
        <MyTitle
          style={{
            color: "#C78899",
            marginBottom: "8px"
          }}
        >
          Status: {request_status}
        </MyTitle>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column"
            }}
          >
            <div style={{ marginBottom: 6 }}>Driver: {owner_firstname}</div>
            <div style={{ marginBottom: 6 }}>Car brand: {car_brand}</div>
            <div style={{ marginBottom: 6 }}>
              License plate: {plate_license}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                fontSize: 20,
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 6
              }}
            >
              {price} ฿
            </div>
            <MyLink
              style={{ marginBottom: 6 }}
              goto={"/trip-history/" + trip_id + "/member"}
            >
              see trip member
            </MyLink>
            <MyLink
              style={{ marginBottom: 6 }}
              goto={"/trip/" + trip_id + "/detail"}
            >
              see trip detail
            </MyLink>
          </div>
        </div>
        <div style={{ marginBottom: 6 }}>Pick up: {departure_detail}</div>
        <MapData
          fixed
          longitude={departure_longtitude}
          latitude={departure_latitude}
        />
        <div style={{ margin: "6px 0" }}>Destination: {destination_detail}</div>
        <MapData
          fixed
          longitude={destination_longtitude}
          latitude={destination_latitude}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "12px"
          }}
        >
          {(request_status == "approved" ||
            request_status == "paid" ||
            request_status == "pending") && (
            <MyButton onClick={handleCancel}>Cancel</MyButton>
          )}
          {(request_status == "rejected" ||
            request_status == "on going" ||
            request_status == "done" ||
            request_status == "canceled") && (
            <MyGreyButton disabled>Cancel</MyGreyButton>
          )}
          {request_status == "approved" && (
            <MyButton onClick={() => history.push("/")}>Payment</MyButton> // TODO add path
          )}
          {request_status != "approved" && (
            <MyGreyButton disabled>Payment</MyGreyButton>
          )}
          {request_status == "done" && (
            <MyButton onClick={() => history.push("/")}>Review</MyButton> // TODO add path
          )}
          {request_status != "done" && (
            <MyGreyButton disabled>Review</MyGreyButton>
          )}
        </div>
      </Paper>
    </Paper>
  );
};

export default withRouter(TripBoxHis);
