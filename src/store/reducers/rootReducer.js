import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import productReducer from "./productReducer";
import cartReducer from "./cartReducers";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  profile: profileReducer,
});

export default rootReducer;
