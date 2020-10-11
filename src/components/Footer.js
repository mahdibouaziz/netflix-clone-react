import React from "react";
import styled from "styled-components";

const FooterDiv = styled.footer`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.5rem;
  flex-direction: column;

  .horizontal__row {
    background-color: #f2f2f2;
    height: 1px;
    width: 90%;
  }
  .fb__link {
    text-decoration: none;
    color: red;
    font-size: 1.1rem;
  }
  .footer__text {
    padding: 0 1.2rem;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <div className="horizontal__row" />
      <br />
      <p className="footer__text">
        This clone is created by{" "}
        <a
          href="https://www.facebook.com/mahdi.bouaziz.319"
          target="_blank"
          rel="noopener noreferrer"
          className="fb__link"
        >
          Mahdi Bouaziz
        </a>
        , If you have any projects in your mind just contact me
      </p>
    </FooterDiv>
  );
}

export default Footer;
