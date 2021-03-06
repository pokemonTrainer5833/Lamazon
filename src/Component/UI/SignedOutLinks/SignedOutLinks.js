import React from "react";
import Classes from "./SignedOutLinks.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const signedOutLinks = (props) => {
  return (
    <div className={Classes.NavLinksWrapper}>
      <ul className={Classes.NavLinks}>
        <li>
          <Link to="/cart">
            <p className={Classes.NavLink}>
              <FaShoppingCart />
              <i className="ui red circular label">{props.cartCount}</i>
            </p>
          </Link>
        </li>
        <li>
          <Link to="/SignIn" className={Classes.NavLink}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/SignUp" className={Classes.NavLink}>
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartCount: state.cart.total,
  };
};

export default connect(mapStateToProps)(signedOutLinks);
