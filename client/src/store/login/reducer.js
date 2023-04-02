import { LOGIN_SUCCESS } from "./actionTypes";
const user = localStorage.getItem("user");
const initialState = {
  user: user ? JSON.parse(user) : null
};
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default login;
