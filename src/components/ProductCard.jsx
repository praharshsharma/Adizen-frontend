import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../api/api";
import { increasecart } from "../Redux/userSlice";
import { getproduct, signin } from "../api/api";

const ProductCard = ({ productId, name, price, image, description }) => {
  const { isLoggedIn, currentUser, cartCount } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [productData, setProductData] = useState({});

  const getProductDetail = async () => {
    const res = await getproduct(productId);
    console.log(res);
    setProductData(res.product);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const addToCart = async () => {
    const data = localStorage.getItem("auth");
    const auth = JSON.parse(data);
    if (data) {
      const result = await signin(auth);

      if (result.status) {
        if (productData.countInStock > 0) {
          console.log(currentUser.user.email);
          console.log(isLoggedIn);
          const res = await addtocart({
            email: currentUser.user.email,
            productId: productId,
          });

          dispatch(increasecart());
        } else {
          alert("out of stock");
        }
      } else {
        window.location.href = "/auth";
      }
    }
  };
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <img src={image} />
      {console.log(image)}

      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          {description}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
          ₹{price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={addToCart}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
