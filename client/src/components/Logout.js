/**
 * Import React Package.
 */
import React from "react"

/**
 * React Router Packages Import
 * @param userHistory This Hook Gives You Access To The History Instance That You May Use To Navigate.
 */
import { useHistory } from "react-router-dom"

/**
 * The Handler Is Used To Perform Various Tasks.
 * If You Need To Check What Handler Do Please Check Handler Folder
 */
import handler from "../handlers"

/**
 * This Is Main Method Of This Funtional Component.
 */
const Logout = (props) => {
  // Object Creation of useHistory().
  let history = useHistory()

  /**
   * This is React Hooks Method.
   * This Method Only Exectute When  history Variable Will Change,
   */
  React.useEffect(() => {
    localStorage.clear()
    window.location.reload()
    // history.push("/login")
  }, [history])
  return <React.Fragment>&nbsp;</React.Fragment>
}

// Export The Current Component
export default Logout
