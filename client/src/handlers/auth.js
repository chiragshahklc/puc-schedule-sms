import jwtDecode from "jwt-decode"
// local imports
import axios from "./axios-handler"

/**
 * Token Fetching Method.
 * This Method Fetch Token From LocalStorage in Store in Variable.
 */
const getToken = () => {
  const token = localStorage.getItem("token")

  if (!!token) return token
  return null
}

/**
 * This Method Is Used To Clear Token From LocalStorage
 */
const clearToken = () => {
  localStorage.removeItem("token")
}

/**
 * This Is Main Method Of This Funtional Component.
 */
export const auth = {
  // This Method Checks That User Is Authenticated or Not
  isUserAuthenticated: () => {
    try {
      const token = getToken()
      if (token) {
        const exp = jwtDecode(token).exp
        const isValid = exp > Date.now() / 1000
        return isValid
      }
      return false
    } catch (error) {
      console.error(error)
    }
  },

  // This Method Is Responsible For Checking That Given Username And Password Are Valid Or Not
  login: async ({ username, password }) => {
    try {
      let response = await axios
        .post("/login", { username, password })
        .catch((err) => {
          console.error(err.response)
          return false
        })
      if (response.status >= 200 && response.status <= 300) {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.token)
          return true
        }
        return false
      }
      return false
    } catch (error) {
      console.error(error)
    }
  },

  // Logout Method Which Clear Token From LocalStorage
  logout: () => {
    clearToken()
  },
}
