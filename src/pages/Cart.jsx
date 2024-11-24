import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import CartCard from "../components/CartCard";
import { getCart } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { removefromcart } from "../api/api";

const Cart = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);

  const [cartItems, setCartItems] = useState([]);
  const [t, st] = useState(0);

  const getcart = async () => {
    const res = await getCart({
      email: currentUser.user.email,
    });
    setCartItems(res.cart.items);
    const data = res.cart.items;

    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem("cartcnt", totalQuantity);
  };

  const handleRemoveItem = async (id) => {
    const res = await removefromcart({
      email: currentUser.user.email,
      productId: id,
    });

    setCartItems(cartItems.filter((item) => item.productId !== id));
  };

  useEffect(() => {
    getcart();
  }, [handleRemoveItem]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: "#333",
          fontWeight: "bold",
          backgroundColor: "white",
          position: "sticky",
          top: "4rem",
          zIndex: 10,
          padding: "10px 0",
          boxShadow: "0px 4px 2px -2px gray",
        }}
      >
        Your Shopping Cart
      </Typography>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, marginRight: { md: "20px" } }}>
            {cartItems.length === 0 ? (
              <Typography variant="h6" align="center" color="textSecondary">
                Your cart is empty!
              </Typography>
            ) : (
              cartItems.map((item) => (
                <CartCard
                  productId={item.productId}
                  key={item.productId}
                  product={item}
                  onRemove={handleRemoveItem}
                  sx={{ marginBottom: "20px", width: "100%" }}
                />
              ))
            )}
          </div>

          {/* Total and Checkout Button - Positioned Conditionally */}
          <Box
            sx={{
              width: { xs: "100%", md: "300px" },
              position: { xs: "relative", md: "fixed" },
              top: { md: "20rem" },
              right: { md: 20 },
              padding: 3,
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "white",
              mt: { xs: 3, sm: 3, md: 0 }, // Margin top for mobile view
              order: { xs: 2, md: 1 }, // Ensures box appears below items on mobile
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Total: ₹{Number(calculateTotal()) + Number(t)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                padding: "12px",
                borderRadius: "30px",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => {
                if (cartItems.length !== 0) {
                  alert("Proceeding to Checkout");
                  window.location.href = "/checkout";
                } else alert("No items in cart");
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default Cart;
