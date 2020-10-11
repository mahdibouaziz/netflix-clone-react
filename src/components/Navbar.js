import React, { useEffect, useState } from "react";
import logo from "../images/Netflix-Logo.png";
import mahdi from "../images/mahdi.jpg";
import "../css/Navbar.css";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: ${({ showBG }) => (showBG ? "#111" : "transparent")};
  transition: background-color 0.4s ease-in-out;
`;

function Navbar() {
  const [showBG, setShowBG] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowBG(true);
      } else {
        setShowBG(false);
      }
    });
  }, []);

  return (
    <Nav className="navbar" showBG={showBG}>
      <img src={logo} alt="Netflix Logo" className="nav__logo" />
      <a
        href="https://www.facebook.com/mahdi.bouaziz.319/"
        className="mahdi__logo"
      >
        <img src={mahdi} alt="Mahdi logo" className="" />
      </a>
    </Nav>
  );
}

export default Navbar;
