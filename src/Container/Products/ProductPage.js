import React, { Component } from "react";
import Classes from "./ProductPage.module.scss";
import { Container, Button, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import ProductList from "./ProductList/ProductList";
import { Dimmer, Loader } from "semantic-ui-react";
import * as actions from "../../store/actions/actionCreaters/exporter";
import { NotificationManager } from "react-notifications";

class ProductPage extends Component {
  state = { width: 0 };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    if (this.props.products && !this.props.localProducts) {
      this.props.getProducts(this.props.products);
    } else if (this.props.products && this.props.localProducts) {
      if (this.props.localProducts.length < this.props.products.length) {
        this.props.addProduct(this.props.products, this.props.localProducts);
      } else if (this.props.localProducts.length > this.props.products.length) {
        this.props.deleteProducts(
          this.props.products,
          this.props.localProducts
        );
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.products && !this.props.localProducts) {
      this.props.getProducts(this.props.products);
    } else if (this.props.products && this.props.localProducts) {
      if (this.props.localProducts.length < this.props.products.length) {
        this.props.addProduct(this.props.products, this.props.localProducts);
      } else if (this.props.localProducts.length > this.props.products.length) {
        this.props.deleteProducts(
          this.props.products,
          this.props.localProducts
        );
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
    });
  };
  clickHandler = () => {
    this.props.clearCart();
    this.props.clearStatus();
    this.props.getProducts(this.props.products);
    NotificationManager.info("Fetched latest Products", "Hurray!", 1000);
  };
  render() {
    const Spinner = (
      <Container>
        <Dimmer active>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      </Container>
    );
    const { products, localProducts } = this.props;

    return (
      <React.Fragment>
        <Container>
          <br />
          <br />
          <Button color="blue" onClick={this.clickHandler}>
            Fetch Updated Products
          </Button>
          <div className="ui horizontal divider">
            <h1
              style={{
                fontSize: "23px",
                color: " #7bed9f",
                fontWeight: "100",
              }}
            >
              Our Products
            </h1>
            <br />
            <br />
            <br />
          </div>

          {localProducts ? (
            <ProductList width={this.state.width} products={localProducts} />
          ) : (
            Spinner
          )}
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    localProducts: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (products) => dispatch(actions.getProducts(products)),
    addProduct: (products, localProducts) =>
      dispatch(actions.addLocalProduct(products, localProducts)),
    deleteProducts: (products, localProducts) => {
      dispatch({ type: "DELETE_EXTRA_LOCAL", products, localProducts });
    },
    clearCart: () => dispatch(actions.clearCart()),
    clearStatus: () => dispatch(actions.clearAllCart()),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "products" }])
)(ProductPage);
//firestore connect to the projects collection i.e when this component is active ,we will connect to the products collection in the firestore
//whenever this collection is changed fire the firestore reducer which changes the firestore state and updates the component acc..
