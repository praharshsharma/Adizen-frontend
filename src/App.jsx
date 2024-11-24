import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Main from "./pages/Main";
import PurchaseHistoryPage from "./pages/PurchaseHistoryPage";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "./Redux/userSlice";
import { getCart, signin } from "./api/api";
const App = () => {
  const dispatch = useDispatch();

  const { currentUser, cartCount } = useSelector((state) => state.user);

  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticate = async () => {
    const data = localStorage.getItem("auth");
    const auth = JSON.parse(data);
    if (data) {
      const result = await signin(auth);

      if (result.status) {
        console.log(result);
        setIsLoggedIn(true);
      } else {
        alert("Wrong email or password");
      }
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  const getcart = async () => {
    const res = await getCart({
      email: currentUser.user.email,
    });

    const data = res.cart.items;

    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);

    console.log(totalQuantity);

    localStorage.setItem("cartcnt", totalQuantity);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getcart();
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!isLoggedIn && (
        <>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<AuthPage />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}

      {isLoggedIn && (
        <>
          <main>
            <Navbar />

            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Main />} />
              <Route path="/history" element={<PurchaseHistoryPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
