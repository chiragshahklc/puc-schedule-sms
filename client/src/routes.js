/**
 * Import Home Component.
 */
import Home from "./components/Home"

/**
 * Import Login Component.
 */
import Login from "./components/Login"

/**
 * Import Logout Component.
 */
import Logout from "./components/Logout"

/**
 * Customer Section Component
 * ! Need to Delete It If Not Required.
 */
// import Customers from "./components/Customers";
import ScheduleMsg from "./components/ScheduleMsg"

/**
 * Creating Array of Routes Which Can Latter Used In Switch Section.
 */
const routes = [
  { path: "/login", component: Login, isPublic: true },
  { path: "/logout", component: Logout, isPublic: false },
  // { path: "/customers", component: Customers },
  { path: "/schedule-msg", component: ScheduleMsg },
  { path: "/", component: Home },
]

// Export The Current Component
export default routes
