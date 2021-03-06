import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyGreyButton } from "../component/MyButton";
import { Paper } from "@material-ui/core/";
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from "./MapData";
import moment from "moment";
import ReviewModal from "../component/ReviewModal";
import ConfirmModal from "../component/ConfirmModal";
import backend from "../ip";
const TripBox = ({ data, fetchData }) => {
  const {
    trip_id,
    start_datetime,
    status,
    plate_license,
    car_brand,
    capacity,
    price,
    departure_latitude,
    departure_longitude,
    destination_latitude,
    destination_longitude,
    departure_detail,
    destination_detail,
    departure_province,
    destination_province,
  } = data;
  const datetime = moment(start_datetime).format("MMMM Do YYYY h:mm a");

  const handleCancel = async () => {
    try {
      const response = await axios.post(backend + "/trip/cancelTrip", {
        trip_id,
      });
      const { success } = response.data;
      if (success) {
        fetchData();
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
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "#BDBDBD",
        marginBottom: "16px",
      }}
    >
      <Paper
        square
        elevation={0}
        style={{
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#C78899",
        }}
      >
        <MyTitle
          style={{
            fontSize: "20px",
            color: "#FFFFFF",
            marginLeft: "6px",
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
          flexDirection: "column",
        }}
      >
        <MyTitle
          style={{
            color: "#C78899",
            marginBottom: "8px",
          }}
        >
          Status: {status}
        </MyTitle>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: 6 }}>
              License plate: {plate_license}
            </div>
            <div style={{ marginBottom: 6 }}>Car brand: {car_brand}</div>
            <div style={{ marginBottom: 6 }}>Capacity: {capacity}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "20px" }}>{price} ฿</div>
            <MyLink
              style={{ marginBottom: 6 }}
              goto={"/my-trip/" + trip_id + "/request"}
            >
              see request
            </MyLink>
            <MyLink
              style={{ marginBottom: 6 }}
              goto={"/my-trip/" + trip_id + "/member"}
            >
              see trip member
            </MyLink>
          </div>
        </div>
        <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
          Pick up: {departure_detail}
          <div style={{ fontSize: 14, color: "#BDBDBD", marginLeft: 8 }}>
            ({departure_province})
          </div>
        </div>
        <MapData
          fixed
          longitude={departure_longitude}
          latitude={departure_latitude}
        />
        <div style={{ margin: "6px 0", display: "flex", alignItems: "center" }}>
          Destination: {destination_detail}
          <div style={{ fontSize: 14, color: "#BDBDBD", marginLeft: 8 }}>
            ({destination_province})
          </div>
        </div>
        <MapData
          fixed
          longitude={destination_longitude}
          latitude={destination_latitude}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "12px",
          }}
        >
          {status == "scheduled" && (
            <ConfirmModal
              onConfirm={handleCancel}
              btn="0"
              action="Cancel"
              message="Are you sure you want to cancel this trip ?"
              confirm="OK"
              cancel="Cancel"
            />
          )}
          {status != "scheduled" && (
            <MyGreyButton disabled>Cancel</MyGreyButton>
          )}
          {(status == "on going" || status == "done") && (
            <ReviewModal modeButton={true} isTrip={true} id={trip_id} />
          )}

          {(status == "scheduled" || status == "canceled") && (
            <MyGreyButton disabled>Review</MyGreyButton>
          )}
        </div>
      </Paper>
    </Paper>
  );
};

export default withRouter(TripBox);
