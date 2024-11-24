import React, { useEffect, useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { getUser } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";

const Profile = () => {
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [user, setuser] = useState("");

  const getuser = async () => {
    const res = await getUser(currentUser.user.email);
    console.log(res);
    setuser(res.user);
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    dispatch(logout());
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <TextField
          value={user.name}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          value={user.email}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          value={user.phone}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Edit Profile
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
