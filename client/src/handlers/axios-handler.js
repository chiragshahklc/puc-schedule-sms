import axios from "axios"

const token = localStorage.getItem("token") || null

/**
 * Creating Instance Of Axios.
 * We Can Use This Instance Repeatedly In Various Components
 */
let instance = axios.create({
  baseURL: "/api/v1",
  headers: { Authorization: token ? `Bearer ${token}` : "" },
})

// Export Generated Instance
export default instance
