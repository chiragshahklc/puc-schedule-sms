/**
 * Import React Package.
 * @param useEffect This Hook Is Used To Re-Render Component Based On The Specific State Change.
 */
import React, { useEffect } from "react"

/**
 * React Router Packages Import
 * @param Route It Used To Set Router So When Specific URL Requested Then Component Binded To That URL Will Render.
 * @param Switch it  Check All The Router And Render Matched Route.
 * @param Redirect It Will Navigate To New Location. The New Location Override The Current Location In History Stack.
 * @param userHistory This Hook Gives You Access To The History Instance That You May Use To Navigate.
 */
import { Route, Switch, Redirect, useHistory } from "react-router-dom"

/**
 * Custom Component Import
 * This Component Containt All The Routes In Form Of Array.
 */
import routes from "./routes"

/**
 * Custom Component Import
 * This Component For Authorised Users
 */
import Auth from "./layouts/Auth"

/**
 * Custom Component Import
 * This Component For Non-Authorised Users
 */
import NonAuth from "./layouts/NonAuth"

/**
 * The Handler Is Used To Perform Various Tasks.
 * If You Need To Check What Handler Do Please Check Handler Folder
 */
import handler from "./handlers"

/**
 * Custom CSS Import For The Component
 */
import "./App.css"

/**
 * This Is Main Method Of This Funtional Component.
 */
function App() {
  // This Section Check That User Is Authenticated Or Not With The Help Of Helper Section.
  const isUserAuthenticated = handler.auth.isUserAuthenticated()

  // Creating Object Of useHistory().
  let history = useHistory()

  /**
   * This is React Hooks Method.
   * This Method Only Exectute When isUserAuthenticated And history Variable Will Change,
   */
  useEffect(() => {
    try {
      if (!isUserAuthenticated) {
        localStorage.clear()
      }
    } catch (error) {
      console.error(error)
    }
  }, [isUserAuthenticated, history])
  return (
    <div className="App">
      {/* Switch Section Which Match Route Provided In URL And Render Components Based On That Matched Route */}
      <Switch>
        {routes.map((route, i) =>
          route.isPublic ? (
            <Route
              key={`route-${i + 1}`}
              path={route.path}
              render={(props) =>
                isUserAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <NonAuth>
                    <route.component {...props}></route.component>
                  </NonAuth>
                )
              }
            ></Route>
          ) : isUserAuthenticated ? (
            <Route
              key={`route-${i + 1}`}
              path={route.path}
              render={(props) => (
                <Auth>
                  <route.component {...props}></route.component>
                </Auth>
              )}
            ></Route>
          ) : (
            <Redirect key={`route-${i + 1}`} to="/login"></Redirect>
          )
        )}
      </Switch>
    </div>
  )
}

// Export The Current Component
export default App
