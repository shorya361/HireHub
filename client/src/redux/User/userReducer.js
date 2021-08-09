// Redcuer accepts a state and an action as a parameter and returns a new state.
import { SET_USER, REMOVE_USER } from './userTypes';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: action.payload,
      };

    case REMOVE_USER:
      const newState = state;
      delete newState['user'];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return newState;

    default:
      return state;
  }
};

export default userReducer;
