import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Bill from "./pages/Bill";
import BillManagement from "./admin/Bill-Management";
import ContactManagement from "./admin/Contact-Management";
import BillEdit from "./admin/Bill-Edit";
import PostPage from "./pages/Post";
import PostEdit from "./admin/Post-Edit";
import PostManagement from "./admin/Post-Management";
import TabBar from "./pages/TabBar";
import PostAdd from "./admin/Post-Add";
// import ProductManagement from "./admin/Product-management";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/adminBill" element={<BillManagement />} />
          <Route path="/adminContact" element={<ContactManagement />} />
          <Route path="/admin/bill/:idBill/edit" element={<BillEdit />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/adminPost" element={<PostManagement />} />
          <Route path="/admin/post/:idPost/edit" element={<PostEdit />} />
          {/* <Route path="/product" element={<ProductManagement />} /> */}
          <Route path="/hisBill" element={<TabBar />} />
          <Route path="/postAdd" element={<PostAdd />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
