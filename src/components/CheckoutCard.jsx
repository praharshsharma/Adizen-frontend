import { React, useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { getproduct } from "../api/api";
import { useState } from "react";

const CheckoutCard = ({ item }) => {
  const [productData, setProductData] = useState({});
  const getProductDetail = async (id) => {
    const res = await getproduct(id);
    console.log(res);
    setProductData(res.product);
  };

  useEffect(() => {
    getProductDetail(item.productId);
  }, []);
  return (
    <Card sx={{ marginBottom: "15px" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body1">{productData.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Quantity: {item.quantity}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" align="right">
              ₹{(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CheckoutCard;
