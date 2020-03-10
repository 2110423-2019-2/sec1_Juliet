import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyTitle, MyHeaderWithArrow } from "../component/MyTitle";
import { Input, Grid, TextField } from "@material-ui/core";
import { MyButton, MyWhiteButton } from "../component/MyButton";

const Payment = ({ history }) => {
  const { request_id } = useParams();
  const [errorMessage, setErrorMessage] = useState('')
  const [price, setPrice] = useState(0)
  const [form, setForm] = useState({
    card_number: "4916350758733533",
    card_holder_name: "Boonyawee Kiatsilp",
    card_expiry_date: "02/2014",
    card_code: "456"
  });
  const [error, setError] = useState({
    card_number: false,
    card_holder_name: false,
    card_expiry_date: false,
    card_code: false
  })
  const validate = () => {
    setError({
      card_number: !form.card_number,
      card_holder_name: !form.card_holder_name,
      card_expiry_date: !form.card_expiry_date,
      card_code: !form.card_code
    })
    return form.card_number &&
      form.card_holder_name &&
      form.card_expiry_date &&
      form.card_code
  };
  useEffect(() => {
    //YIN TODO: get price by request id -> setPrice
  }
    , [])
  const handlePayment = async () => {
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:4000/user/payment", {
          id: request_id,
          ...form,
          price: 200
          //YIN TODO แก้เป็น price เฉยๆ
        });
        const { success } = response.data;
        if (success) {
          //history.push("/trip-history");
          console.log(success + response);
          setErrorMessage(null)
        } else {
          setErrorMessage("what's wrong")
        }
      } catch (e) {
        setErrorMessage("Payment failed. Please try again.")
      }
    } else {
      setErrorMessage("Please fill all inputs with valid data")
    }
  };

  const clearData = () => {
    setForm({
      card_number: "",
      card_holder_name: "",
      card_expiry_date: "",
      card_code: ""
    });
  }
  return (
    <div>
      <MyHeaderWithArrow goto="/trip-history" >Payment</MyHeaderWithArrow>
      <form autoComplete="on">
        <Grid container direction="column" justify="flex-start"  >
          <TextField
            fullWidth
            required
            label="Card Number"
            style={{ marginTop: 25 }}
            value={form.card_number}
            error={error.card_number}
            onChange={e => {
              setForm({ ...form, card_number: e.target.value });
              setErrorMessage('')
            }}
          />
          <TextField
            fullWidth
            required
            label="Card Holder Name"
            style={{ marginTop: 25 }}
            value={form.card_holder_name}
            error={error.card_holder_name}
            onChange={e => {
              setForm({ ...form, card_holder_name: e.target.value });
              setErrorMessage('')
            }}
          />
          <Grid container direction="row" justify="space-between" style={{ marginBottom: "5px" }}>
            <div>
              <TextField
                fullWidth
                required
                label="Expiry Date"
                style={{ marginTop: 25 }}
                value={form.card_expiry_date}
                error={error.card_expiry_date}
                onChange={e => {
                  setForm({ ...form, card_expiry_date: e.target.value });
                  setErrorMessage('')
                }}
              />
            </div>
            <div>
              <TextField
                fullWidth
                required
                label="CVV"
                style={{ marginTop: 25 }}
                value={form.card_code}
                error={error.card_code}
                onChange={e => {
                  setForm({ ...form, card_code: e.target.value });
                  setErrorMessage('')
                }}
              />
            </div>
          </Grid>
          {error !== "" &&
            <div style={{ marginTop: 20, color: "red" }}>{errorMessage}</div>
          }
          <Grid container direction="column" alignItems='flex-end' >
            <div style={{ marginTop: 25, marginBottom: 5 }}>Payment Amount</div>
            <div style={{ marginTop: 5, marginBottom: 60, fontSize: "20px" }}>200 ฿</div>
          </Grid>
          <Grid container direction="row" justify="space-evenly">
            <MyButton style={{ width: 150 }} onClick={handlePayment}>Pay</MyButton>
            <MyWhiteButton style={{ width: 150 }} onClick={clearData}>Cancel</MyWhiteButton>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};
export default withRouter(Payment);