import axios from 'axios'

//const BASE_URL = "https://adizen-backend.onrender.com"
const BASE_URL = "http://localhost:5001"

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "withCredentials": true
  };

  async function signup(data) {
    const result = await axios.post(`${BASE_URL}/api/users/signup/`, data, { headers });

    console.log(data)

    console.log(result);
    return result.status;
  }

  async function signin(data) {
    const result = await axios.post(`${BASE_URL}/api/users/signin/`, data, { headers });

    console.log(result.status)
    return result;
  }

  async function getAllProducts() {
    const result = await axios.get(`${BASE_URL}/api/products`, { headers });

    console.log(result)
  
    if (result.status === 200) {
      return result.data;
    }
  
    return [];
  }

  async function addtocart(data) {
    const result = await axios.post(`${BASE_URL}/api/cart/addtocart`, data, { headers });

    console.log(result.status)
    return result;
  }

  async function getCart(data) {
    const result = await axios.post(`${BASE_URL}/api/cart/getcart`,data, { headers });
  
    if (result.status === 200) {
      return result.data;
    }
  
    return [];
  }


  async function getproduct(data) {
    const result = await axios.get(`${BASE_URL}/api/products/${data}`, { headers });

    console.log(result)
  
    if (result.status === 200) {
      return result.data;
    }
  
    return [];
  }

  async function decreseQuantity(data) {
    const result = await axios.post(`${BASE_URL}/api/cart/decreasequantity`, data, { headers });

    console.log(result.status)
    return result;
  }

  async function removefromcart(data) {
    console.log(data);
    const result = await axios.delete(`${BASE_URL}/api/cart/removeproduct`, { headers,data });

    console.log(result.status)
    return result;
  }

  async function order(data) {
    const result = await axios.post(`${BASE_URL}/api/order/placeorder`, data, { headers });

    console.log(result.status)
    return result;
  }

  
  

  async function gethistory(data) {
    const result = await axios.post(`${BASE_URL}/api/users/history`, data, { headers });

    console.log(result.status)
    return result;
  }

  async function getUser(data) {
    const result = await axios.get(`${BASE_URL}/api/users/${data}`, { headers });

    console.log(result)
  
    if (result.status === 200) {
      return result.data;
    }
  
    return [];
  }

  async function getorder(data) {
    const result = await axios.get(`${BASE_URL}/api/order/${data.email}/${data.id}`, { headers });

    console.log(result)
  
    if (result.status === 200) {
      return result.data;
    }
  
    return [];
  }





export default signup;

export {signin,getAllProducts,addtocart,getCart,getproduct,decreseQuantity,removefromcart,order,gethistory,getUser,getorder};



