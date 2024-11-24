import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
} from "@mui/material";
import signup from "../api/api";
import { signin } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess, authstore } from "../Redux/userSlice";

const AuthPage = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name) {
      newErrors.name = "Full Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!isLogin && !formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!isLogin && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({}); // Clear errors when switching forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      try {
        const res = await signin({
          email: formData.email,
          password: formData.password,
        });

        dispatch(authSuccess(res.data));
        dispatch(
          authstore({
            email: formData.email,
            password: formData.password,
          })
        );
      } catch {
        alert("Wrong ID or password");
        console.log(e);
      }
    } else {
      try{
        const res = await signup(formData);
      if (res === 200) window.location.href = "/auth";
      else alert("User Already Exists")
      }
      catch(error){
        alert("User Already Exists")
      }
      
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: "50px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          )}

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {!isLogin && (
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          )}

          {isLogin && (
            <FormControlLabel
              control={<Checkbox name="remember" />}
              label="Remember me"
              sx={{ marginBottom: "16px" }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px", padding: "12px" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <Box sx={{ marginTop: "16px", textAlign: "center" }}>
            <Divider sx={{ marginBottom: "16px" }} />
            <Typography variant="body2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link href="#" onClick={toggleForm} sx={{ cursor: "pointer" }}>
                {isLogin ? "Sign Up" : "Login"}
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AuthPage;
