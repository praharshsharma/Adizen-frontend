import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { getproduct } from "../api/api";
import { getorder } from "../api/api";
import { useDispatch, useSelector } from "react-redux";

const PurchaseHistoryCard = ({ purchase }) => {

  const { currentUser } = useSelector((state) => state.user);

  const [details,setdetails] = useState([]);

  const getOrder = async (id)=>{
    const res = await getorder({
      email : currentUser.user.email,
      id : id
    })
    console.log(res.data.products);
    setdetails(res.data.products)
  }

  

  useEffect(()=>{
    getOrder(purchase._id)
    
  },[])
  return (
    <Card
      sx={{ width: "100%", boxShadow: 3, borderRadius: 2, marginBottom: 2 }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Purchase ID: {purchase._id}
        </Typography>
        <Divider sx={{ marginY: 2 }} />

        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Products:</strong> {details.map(product=>(
              `(${product.productId.name} x${product.quantity})  `
            ))
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong> {purchase.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Amount:</strong> Rs{purchase.totalAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Purchase Date:</strong>{" "}
            {new Date(purchase.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PurchaseHistoryCard;
