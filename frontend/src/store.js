import { applyMiddleware, createStore , compose,combineReducers} from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartReducers';
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import { userRegisterReducer, userSigninReducer } from './reducer/UserReducer';


const initialState = {
    cart:{
        cartItems : localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
    },
    userSignin: {
       userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,  
  },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
reducer , 
initialState ,
composeEnhancer(applyMiddleware(thunk))
);

export default store;

//certe a basic redux store and we can use it inreact app