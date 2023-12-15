import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingContext } from "../contexts/ShoppingContext";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  quantity: number;
  category: number;
};

const Products = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const { addCartItem } = useShoppingContext();

  useEffect(() => {
    console.log("get products data from api");
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3003/products");
        console.log("products=> ", res);
        setProducts(res.data);
      } catch (error) {
        console.log("error=> ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="row">
      <h3>Products</h3>
      {products.map((item) => {
        return (
          <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <img src={item.img} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <p className="card-text">Số lượng: {item.quantity}</p>
                <p className="card-text">{item.description}</p>
                <a
                  href="#"
                  className="btn btn-sm btn-success"
                  onClick={() => addCartItem(item)}
                >
                  <i className="fas fa-shopping-cart"></i>Add to Cart
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
