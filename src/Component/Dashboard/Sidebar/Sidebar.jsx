import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 768);
    };

    handleResize(); // Call it initially to set the sidebar based on the current width

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement;
      const href = item.getAttribute("href");

      // Check if the item's href matches any of the specified routes
      if (
        location.pathname === href ||
        (location.pathname.startsWith(href) && href !== "/")
      ) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }

      item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });
  }, [location.pathname]);

  // useEffect(() => {
  //   const allSideMenu = document.querySelectorAll(
  //     "#sidebar .side-menu.top li a"
  //   );

  //   allSideMenu.forEach((item) => {
  //     const li = item.parentElement;
  //     const href = item.getAttribute("href");

  //     // Check if the item's href matches any of the specified routes
  //     if (
  //       location.pathname === href ||
  //       (location.pathname.startsWith(href) && href !== "/")
  //     ) {
  //       li.classList.add("active");
  //     } else {
  //       li.classList.remove("active");
  //     }

  //     item.addEventListener("click", function () {
  //       allSideMenu.forEach((i) => {
  //         i.parentElement.classList.remove("active");
  //       });
  //       li.classList.add("active");
  //     });
  //   });
  // }, [location.pathname]);

  return (
    <section id="sidebar" className={isSidebarVisible ? "" : "hide"}>
      <a href="#" class="brand">
        <i class="bx bxs-coffee"></i>
        <span class="text">Aroma Coffe</span>
      </a>
      <ul class="side-menu top">
        <li class="active">
          <a href="/dashboard">
            <i class="bx bxs-dashboard"></i>
            <span class="text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/product">
            <i class="bx bxs-shopping-bag-alt"></i>
            <span class="text">Product</span>
          </a>
        </li>
        <li>
          <a href="/customer">
            <i class="bx bxs-group"></i>
            <span class="text">Customer</span>
          </a>
        </li>
      </ul>
      <ul class="side-menu">
        <li>
          <a href="/" class="logout">
            <i class="bx bxs-log-out-circle"></i>
            <span class="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default SideBar;
