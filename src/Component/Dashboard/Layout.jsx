import "./Layout.scss";
import SideBar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { fontWeight } from "@mui/system";

const Layout = () => {
  const [transactions, setTransactions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }

    fetchTransaction();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchTransaction = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        purchasedItems: doc.data().purchasedItems || [],
        timestamp: doc.data().timestamp,
      }));
      setTransactions(newData);
      console.log(transactions, newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hide");
    }

    fetchTransaction();
  }, []);

  const transactionCount = transactions.length;
  const uniqueCustomersCount = new Set(
    transactions.map((transaction) => transaction.email)
  ).size;

  const totalPrices = calculateTotalPrices(transactions);

  return (
    <>
      <SideBar />
      <div id="content">
        <Navbar />
        <main>
          <div class="head-title">
            <div class="left">
              <h1>Dashboard</h1>
            </div>
          </div>

          <ul class="box-info">
            <li>
              <i class="bx bxs-cart"></i>
              <span class="text">
                <h3>{transactionCount}</h3>
                <p>Transaction</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-group"></i>
              <span class="text">
                <h3>{uniqueCustomersCount}</h3>
                <p>Customer</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-dollar-circle"></i>
              <span class="text">
                <h3>${totalPrices}</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          {windowWidth > 768 ? (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Customer</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Purchased Items</th>
                      <th>TimeStamp</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.email}</td>

                        <td>
                          <ul>
                            {transaction.purchasedItems.map((item, index) => (
                              <li key={index}>
                                Product: {item.productName}, Price: {item.price}
                                , Quantity: {item.quantity}, Size: {item.size}
                              </li>
                            ))}
                          </ul>
                        </td>

                        <td>
                          {transaction.timestamp.toDate().toLocaleString()}
                        </td>

                        <td>
                          <i className="bx bxs-trash"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* ======BAGIAN BIMO======= */}
          {/* TABLE DATA BEGIN */}
          {windowWidth <= 768
            ? transactions.map((transaction) => (
                <div key={transaction.id} className="table-data">
                  <div className="order">
                    {/* EMAIL */}
                    <div>
                      <h4>Email</h4>
                      <p>{transaction.email}</p>
                      <br />
                    </div>

                    {/* ORDERS */}
                    <div>
                      <h4>Purchased Items</h4>
                      <div>
                        {transaction.purchasedItems.map((item, index) => (
                          <div className="purchased-items-container">
                            <li key={index}>
                              Product: {item.productName}, Price: {item.price},
                              Quantity: {item.quantity}, Size: {item.size}
                            </li>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TIMESTAMP */}
                    <div>
                      <p>{transaction.timestamp.toDate().toLocaleString()}</p>
                    </div>

                    {/* DELETE BUTTON */}
                    <div>
                      <br />
                      <button className="btn-style" type="submit">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : null}

          {/* {windowWidth <= 768 ? (
            {transactions.map((transaction) => (
              <div key={transaction.id}>
              </div>
            ))}
            
          ) : null} */}

          {/* TABLE DATA END */}
        </main>
      </div>
    </>
  );
};

const calculateTotalPrices = (transactions) => {
  const total = transactions.reduce(
    (total, transaction) =>
      total + calculateTotalPrice(transaction.purchasedItems),
    0
  );

  return total.toFixed(2);
};

const calculateTotalPrice = (purchasedItems) => {
  return purchasedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export default Layout;
