import React from "react";
import plus18 from "../../assets/images/plus18.png";
import beGam from "../../assets/images/beGam.png";
import "./footer.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../assets/images/grandlotto.png";

const Footer = () => {
  const siteName = useSelector((state) => state.oauth.siteName);

  return (
    <div className="footer">
      <div className="footerGrid">
        <div className="footerGridItems">
          <img src={Logo} alt="grand-logo" />

          <div className="footer_social">
            <a href="true" onClick={(e) => e.preventDefault()}>
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="true" onClick={(e) => e.preventDefault()}>
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="true" onClick={(e) => e.preventDefault()}>
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="true" onClick={(e) => e.preventDefault()}>
              <i className="bx bxl-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footerGridItems">
          <p>
            Grandlotto provides online lotto systems, online gaming tools and
            API for all businesses interested in leveraging our experience,
            capacity and competence. Over the years, Grandlotto has built its
            reputation as a force to reckon with in the gaming industry.
          </p>
          <p className="hideOnMobile">
            This website is operated by Grandlotto (A Subsidiary of Lotgrand
            Limited). Lotgrand Limited is a company registered in Nigeria
            (RC1222087), and with it’s administrative office at Brick House 17,
            Yinusa Adeniji Street off Toyin IKEJA, 100212, Lagos. Grandlotto as
            a brand was established by a group of visionaries and insightful
            people with ideas and mechanism for providing latest technologies to
            continuously revolutionize the gaming industry.
          </p>
        </div>
        <div className="footerGridItems">
          <h5>Contact Us</h5>
          <div className="footerGridItemsFlex">
            <i className="bx bx-envelope"></i>
            <p>Support@grandlotto.com</p>
          </div>
          <div className="footerGridItemsFlex">
            <i className="bx bxs-phone"></i>
            <div className="d-block" style={{ marginTop: "-7px" }}>
              <div className="d-flex" style={{ columnGap: 10 }}>
                <p>0800000000</p>
                <p>Calls only</p>
              </div>
              <div className="d-flex" style={{ columnGap: 10 }}>
                <p>0800000000</p>
                <p>Calls only</p>
              </div>
              <div className="d-flex" style={{ columnGap: 10 }}>
                <p>0800000000</p>
                <p>Calls only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="topHeaderRight " style={{ marginTop: 50 }}>
        <NavLink to="/about" className="top_link">
          How to play
        </NavLink>
        <NavLink to="/about" className="top_link">
          Promotions
        </NavLink>
        <NavLink to="/about" className="top_link">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="top_link">
          FirstBet
        </NavLink>
      </div>
      <div className="footerImage">
        <img src={plus18} alt="grand-logo" />
        <img src={beGam} alt="grand-logo" />
      </div>
      <div className="footerCopyRight text-center text-secondary">
        <p>© 2023 {siteName}</p>
      </div>
    </div>
  );
};

export default Footer;
