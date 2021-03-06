import * as actionTypes from "../actions/actionTypes/actionTypes";
import diffProductFinder from "../../helpers/diffProductFinder";
let storage = null;
if (!localStorage.getItem("products")) {
  localStorage.setItem(
    "products",
    JSON.stringify({
      products: null,
      currentProduct: null,
    })
  );
  storage = {
    products: null,
    currentProduct: null,
  };
} else {
  storage = JSON.parse(localStorage.getItem("products"));
}
const initialState = storage;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      const newProducts = action.products.map((product) => ({
        ...product,
        isInCart: false,
      }));
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: [...newProducts],
        })
      );

      return {
        ...state,
        products: [...newProducts],
      };
    case actionTypes.REMOVE_ALL_FROM_CART:
      const nprods = state.products.map((product) => {
        return {
          ...product,
          isInCart: false,
        };
      });
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: nprods,
        })
      );
      return {
        ...state,
        products: nprods,
      };
    case actionTypes.ADDED_TO_CART:
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.id)
          return {
            ...product,
            isInCart: true,
          };
        else
          return {
            ...product,
          };
      });
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: updatedProducts,
        })
      );
      return {
        ...state,
        products: updatedProducts,
      };
    case actionTypes.REMOVED_FROM_CART:
      const updatedProducts2 = state.products.map((product) => {
        if (product.id === action.id)
          return {
            ...product,
            isInCart: false,
          };
        else
          return {
            ...product,
          };
      });
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: updatedProducts2,
        })
      );
      return {
        ...state,
        products: updatedProducts2,
      };

    case actionTypes.ADD_PRODUCT:
      const diffProd = diffProductFinder(action.products, action.localProducts);

      if (diffProd) {
        localStorage.setItem(
          "products",
          JSON.stringify({
            ...state,
            products: state.products.concat(diffProd),
          })
        );
        return {
          ...state,
          products: state.products.concat(diffProd),
        };
      }
      return {
        ...state,
      };
    case actionTypes.REMOVE_PRODUCT:
      const newProds = state.products.filter(
        (product) => product.id !== action.prodId
      );
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: newProds,
        })
      );
      return {
        ...state,
        products: newProds,
      };

    case "DELETE_EXTRA_LOCAL":
      const filteredProds = action.localProducts.filter((prods) => {
        const index = action.products.findIndex((item) => item.id === prods.id);
        if (index !== -1) {
          return true;
        }
        return false;
      });
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: filteredProds,
        })
      );

      return {
        ...state,
        products: filteredProds,
      };

    case actionTypes.UPDATE_PRODUCT:
      const reqProd = state.products.filter(
        (product) => product.id === action.product.id
      );
      reqProd[0] = { ...reqProd[0], ...action.product };
      const index = state.products.findIndex(
        (product) => product.id === action.product.id
      );
      const newPros = [...state.products];
      newPros[index] = reqProd[0];
      localStorage.setItem(
        "products",
        JSON.stringify({
          ...state,
          products: newPros,
        })
      );
      return {
        ...state,
        products: newPros,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
