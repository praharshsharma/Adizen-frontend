import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { getproduct } from "../api/api";

const PurchaseHistoryCard = ({ purchase }) => {

  const getProductDetail = async (id)=>{
    const res = await getproduct(id)
    console.log(res);

    setnames(name+" "+res.product.name+" ")
  }

  const [name,setnames] = useState("");

  useEffect(()=>{
    console.log(purchase.products.length)
    for(let i=0;i<purchase.products.length;i++)
    {
      getProductDetail(purchase.products[i].productId)
      setnames(name+"x"+purchase.products[i].quantity)
    }
    
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
            <strong>Products:</strong> {name
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
