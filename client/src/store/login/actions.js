import { LOGIN_SUCCESS } from "./actionTypes";
export const loginSuccessful = user => {
  return { type: LOGIN_SUCCESS, payload: user };
};
