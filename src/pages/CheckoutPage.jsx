// src/pages/CheckoutPage.js

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { getCart } from "../api/api";
import { useSelector } from "react-redux";
import CheckoutCard from "../components/CheckoutCard";
import { order } from "../api/api";

const CheckoutPage = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);

  const getcart = async () => {
    const res = await getCart({
      email: currentUser.user.email,
    });
    setCartItems(res.cart.items);
  };

  useEffect(() => {
    getcart();
  }, []);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (shippingInfo.hasOwnProperty(name)) {
      setShippingInfo({ ...shippingInfo, [name]: value });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const res = await order({
      email: currentUser.user.email,
      address: shippingInfo.address,
    });

    console.log(res);
    alert("order placed");
    window.location.href = "/";
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {/* Order Summary */}
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ margin: "10px 0" }} />

      {cartItems.map((item) => (
        <CheckoutCard key={item.id} item={item} />
      ))}

      <Divider sx={{ margin: "10px 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align="right" variant="h6">
            ₹{calculateTotal()}
          </Typography>
        </Grid>
      </Grid>

      {/* Shipping Information */}
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <TextField
          label="Full Name"
          name="name"
          variant="outlined"
          fullWidth
          value={shippingInfo.name}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          type="email"
          value={shippingInfo.email}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          variant="outlined"
          fullWidth
          type="tel"
          value={shippingInfo.phone}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          fullWidth
          value={shippingInfo.address}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              variant="outlined"
              fullWidth
              value={shippingInfo.city}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="ZIP Code"
              name="zip"
              variant="outlined"
              fullWidth
              value={shippingInfo.zip}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Payment Information */}
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Payment Information
        </Typography>
        <TextField
          label="Card Number"
          name="cardNumber"
          variant="outlined"
          fullWidth
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Expiry Date"
              name="expiryDate"
              variant="outlined"
              fullWidth
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVV"
              name="cvv"
              variant="outlined"
              fullWidth
              type="password"
              value={paymentInfo.cvv}
              onChange={handleChange}
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
