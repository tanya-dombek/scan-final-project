import { combineReducers } from "redux";
import loginReducer from './login';
import userInfoReducer from './user-info';
import histogramReducer from './histogram-search';
import objectSearchReducer from './object-search';
import documentsReducer from './documents';

export const rootReducer = combineReducers({
    login: loginReducer,
    userInfo: userInfoReducer,
    histograms: histogramReducer,
    objectSearch: objectSearchReducer,
    documents: documentsReducer
})