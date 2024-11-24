import React from "react";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/api";

const Main = () => {
  const [products, setData] = useState([]);

  async function getProductData() {
    const result = await getAllProducts();
    console.log(result);
    setData(result);
  }

  useEffect(() => {
    getProductData();
  }, []);
  
  return (
    <>
      <div>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              productId={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
