import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from '../api/api';
import { addtocart, decreseQuantity, removefromcart } from '../api/api';
import { increasecart } from '../Redux/userSlice';

const CartCard = ({ productId,product, onRemove }) => {

  const [productData,setProductData] = useState({});
  const [q,sq] = useState(0);

  const dispatch = useDispatch();

  const { isLoggedIn, currentUser, cartCount } = useSelector((state) => state.user);

  const handleIncreaseQuantity = async () => {
    if(productData.countInStock > q)
    {
    
    sq(q+1);
    console.log(currentUser.user.email)
    console.log(isLoggedIn);
    const res = await addtocart({
      email : currentUser.user.email,
      productId : productId
    })

    dispatch(increasecart())

    localStorage.setItem('cartcnt',cartCount);
    }
    else
    {
      alert("out of stock");
    }
    

  };

  const handleDecreaseQuantity =async () => {
    if(q>1)
    {
      sq(q-1);
      console.log(currentUser.user.email)
      console.log(isLoggedIn);
      const res = await decreseQuantity({
        email : currentUser.user.email,
        productId : productId
    })
    }
    
  };

  const getProductDetail = async ()=>{
    const res = await getproduct(productId)
    console.log(res);
    setProductData(res.product);
    sq(product.quantity);
  }

  useEffect(()=>{
    getProductDetail()
  },[])

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', maxWidth: 700, mb: 2, boxShadow: 2 }}>
      <img src={productData.image} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {productData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {productData.description}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
        ₹{productData.price}
        </Typography>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">Quantity:</Typography>
          <IconButton onClick={handleDecreaseQuantity} size="small">
            <Remove />
          </IconButton>
          <Typography variant="body2" sx={{ marginX: 1 }}>
            {q}
          </Typography>
          <IconButton onClick={handleIncreaseQuantity} size="small">
            <Add />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onRemove(productData._id,q,productData.price)
            console.log(productData._id)
            }}
          sx={{ marginTop: 2, width: '100%' }}
          
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartCard;
