import React from "react";
import Classes from "./SignedInLinks.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import * as actions from "../../../store/actions/actionCreaters/exporter";
const signedInLinks = (props) => {
  const { profile } = props;
  let initals = profile.initials;

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
          <Button color="blue" size="large" onClick={props.signOut}>
            Sign Out
          </Button>
        </li>
        <li>
          <Link to="/Orders" className={Classes.NavLink}>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/Profile">
            {profile.image ? (
              <Image
                circular
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "13px",
                }}
                src={profile.image}
              />
            ) : (
              <Button
                circular
                color="google plus"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "13px",
                }}
              >
                {initals ? initals : ""}
              </Button>
            )}
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
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(actions.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks);
