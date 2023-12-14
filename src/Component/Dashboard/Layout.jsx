import React, { useEffect } from "react";
import "./Layout.scss";
import SideBar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  useEffect(() => {
    // Toggle sidebar based on window width
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    }
  }, []);

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
                <h3>1020</h3>
                <p>Transaction</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-group"></i>
              <span class="text">
                <h3>1000</h3>
                <p>Customer</p>
              </span>
            </li>
            <li>
              <i class="bx bxs-dollar-circle"></i>
              <span class="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default Layout;
