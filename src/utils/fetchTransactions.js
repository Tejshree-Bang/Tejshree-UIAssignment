import data from '../data/data.json'

/**
 * Simulate an API call to fetch transaction data.
 * @returns {Promise<Object[]>} - A promise that resolves with the transaction data.
 */
export const fetchTransactions = async () => {
    try {
      // Mock transaction data
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 1000); // Simulate network delay
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  };
  