/**
 * Custom Component Import
 * Axios Instance Is Import So We Can Re-use In API's Calling Section.
 */
import axios from "./axios-handler";

/**
 * This Is Main Method Of This Funtional Component.
 */
export const customers = {
  // This Method Fetch All The Customers
  getCustomers: async () => {
    try {
      let customers = await axios.get("/untpuc/customers").catch(console.error);
      return customers.data;
    } catch (error) {
      console.error(error);
    }
  },

  // This Method Is Used To Add New Customer
  addCustomers: async ({ customers, vehicles, bulk }) => {
    try {
      let response = await axios
        .post("/untpuc/customers", {
          customer: customers,
          vehicle: vehicles,
          bulk,
        })
        .catch(console.error);
      if (response.status >= 200 && response.status < 300) return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  },
};
