import "./Navbar.scss";
import Profile from "../../assets/profile.jpeg";

const Navbar = () => {
  return (
    <nav>
      <a href="#" class="notification">
        <i class="bx bxs-bell"></i>
        <span class="num">7</span>
      </a>
      <a href="#" class="profile">
        <img src={Profile} />
      </a>
    </nav>
  );
};

export default Navbar;
