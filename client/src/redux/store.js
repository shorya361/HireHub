import { createStore } from 'redux';
import userReducer from './User/userReducer';

const store = createStore(userReducer);

export default store;
