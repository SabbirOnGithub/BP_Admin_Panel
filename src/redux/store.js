import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { subMenuDeleteReducer, subMenuDetailsReducer, subMenuListReducer, subMenuSaveReducer } from './reducers/subMenuReducers';
import { homePageDataListReducer, homePageDataDetailsReducer, homePageDataSaveReducer,homePageDataDeleteReducer } from './reducers/homePageReducers';
import { menuListReducer, menuDetailsReducer, menuSaveReducer,menuDeleteReducer } from './reducers/menuReducers';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { userSigninReducer, userRegisterReducer, userUpdateReducer, userListReducer, userDeleteReducer } from './reducers/userReducers';
import { homePageSliderDeleteReducer, homePageSliderDetailsReducer, homePageSliderListReducer, homePageSliderSaveReducer } from './reducers/homePageSliderReducers';

const userInfo = Cookie.getJSON("userInfo") || null;


const initialState={ 
    userSignin:{ userInfo }
};
const reducer = combineReducers({
    userList:userListReducer,
    userSignin:userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    subMenuList:subMenuListReducer,
    subMenuDetails: subMenuDetailsReducer,
    subMenuSave: subMenuSaveReducer,
    subMenuDelete: subMenuDeleteReducer,
    homePageDataList:homePageDataListReducer,
    homePageDataDetails: homePageDataDetailsReducer,
    homePageDataSave: homePageDataSaveReducer,
    homePageDataDelete: homePageDataDeleteReducer,
    menuList:menuListReducer,
    menuDetails: menuDetailsReducer,
    menuSave: menuSaveReducer,
    menuDelete: menuDeleteReducer,
    homePageSliderList:homePageSliderListReducer,
    homePageSliderDetails: homePageSliderDetailsReducer,
    homePageSliderSave: homePageSliderSaveReducer,
    homePageSliderDelete: homePageSliderDeleteReducer,



});
const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk))); 

export default store;