import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import Layout from "../Layout";
import "../Customer/Customer.scss";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    fetchUsers();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        fullName: doc.data().fullName,
      }));
      setUsers(newData);
      console.log(users, newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <SideBar />
      <div id="content">
        <Navbar />

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Customer</h1>
            </div>
          </div>

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
                      <th>Full Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>
                          <i class="bx bxs-trash"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {windowWidth <= 768 ? (
            <div className="table-data">
              {users.map((user) => (
                <div key={user.id} className="order">
                  <div className="item-container">
                    <div className="user-data-container">
                      <h4>Email</h4>
                      <p className="center-text">{user.email}</p>
                      <br />
                      <h4>Full Name</h4>
                      <p className="center-text">{user.fullName}</p>
                      <div className="btn-container">
                        <button className="btn-style" type="submit">
                          Delete
                        </button>
                      </div>
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

export default Customer;
