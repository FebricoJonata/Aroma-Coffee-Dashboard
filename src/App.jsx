import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import Layout from "./Component/Dashboard/Layout";
import Product from "./Component/Dashboard/Product/Product";
import Customer from "./Component/Dashboard/Customer/Customer";
import Create from "./Component/Dashboard/Product/Create/Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/product/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
