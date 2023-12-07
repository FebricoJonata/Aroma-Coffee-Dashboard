import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const Product = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        img: doc.data().img,
        name: doc.data().name,
        price: doc.data().price,
        description: doc.data().description,
      }));
      setProducts(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully!");
      // After deleting, fetch products again to update the UI
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const truncateDescription = (description, maxLength = 50) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <SideBar />
      <div id="content">
        <Navbar />
        <main>
          <div class="head-title">
            <div class="left">
              <h1>Product</h1>
            </div>
          </div>

          <button className="primary-button">
            <a href="/product/create">Add item</a>
          </button>
          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>Product List</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img src={product.img} alt="Product" />
                        <p>{product.name}</p>
                      </td>
                      <td>{product.price}</td>
                      <td>{truncateDescription(product.description)}</td>
                      <td>
                        <i
                          class="bx bxs-trash"
                          onClick={() => deleteProduct(product.id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Product;
