import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { getproduct } from "../api/api";

const PurchaseHistoryCard = ({ purchase }) => {
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
            <strong>Product ID:</strong> {purchase._id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Product Name:</strong> {purchase.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Quantity:</strong> {purchase.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${purchase.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Purchase Date:</strong>{" "}
            {new Date(purchase.purchaseDate).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PurchaseHistoryCard;
