import { create } from "zustand";
import axios from "axios";

const useSaapStore = create((set, get) => ({
  loading: false,
  error: null,
  success: null,
  user: null,
  merchant: null,
  transactions: [],

  syncUser: async (privyToken) => {
    if (get().loading) return;
    try {
      set({ loading: true, error: null, success: null });
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/sync-user`,
        {
          privyToken,
        },
      );
      console.log("User synced successfully", response.data);
      set({ loading: false, success: response.data.message });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: error, success: null });
    }
  },

  setupUser: async (formData) => {
    if (get().loading) return;
    try {
      set({ loading: true, error: null, success: null });
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/user/setup`,
        {
          ...formData,
        },
      );
      console.log("User setup completed successfully", response.data);
      set({ loading: false, success: response.data.message });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: error, success: null });
    }
  },
}));

// FUNCTIONS
const syncUserSelector = (state) => state.syncUser;
const setupUserSelector = (state) => state.setupUser;

// GETTERS
const getLoadingSelector = (state) => state.loading;
const getErrorSelector = (state) => state.error;
const getSuccessSelector = (state) => state.success;
const getUserSelector = (state) => state.user;
const getMerchantSelector = (state) => state.merchant;
const getTransactionsSelector = (state) => state.transactions;

export {
  useSaapStore,
  syncUserSelector,
  setupUserSelector,

  // GETTERS
  getLoadingSelector,
  getErrorSelector,
  getSuccessSelector,
  getUserSelector,
  getMerchantSelector,
  getTransactionsSelector,
};
