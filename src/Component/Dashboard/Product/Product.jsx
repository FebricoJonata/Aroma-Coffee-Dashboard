import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Product.scss";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }

    fetchProducts();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }

    fetchProducts();
  }, []);

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
          {windowWidth > 768 ? (
            <div class="table-data">
              <div class="order">
                <div class="head">
                  <h3>Product List</h3>
                  <i class="bx bx-search"></i>
                  <i class="bx bx-filter"></i>
                </div>

                {/* HIDE THIS IF DIMENSION IS MORE THAN 768 */}
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
          ) : null}

          {/* BAGIAN BIMO */}
          {windowWidth <= 768 ? (
            <div>
              {products.map((product) => (
                <div key={product.id} className="table-data">
                  <div className="order">
                    {/* IMAGE & NAME */}
                    <div className="product-img-name">
                      <img
                        src={product.img}
                        alt="Product"
                        className="img-style"
                      />
                      {/* NAME */}
                      <p class="space-name">{product.name}</p>
                      <p>${product.price}</p>
                      <br />
                      <p>{truncateDescription(product.description)}</p>
                    </div>
                    <br />
                    {/* DELETE BUTTON */}
                    <div class="button-del-product">
                      <button className="btn-style-item" type="submit">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default Product;


// {windowWidth > 768 ? (
  
// ) : null}