/**
 * Calculate reward points based on the amount spent.
 * @param {number} amount - The transaction amount.
 * @returns {number} - The calculated reward points.
 */
export const calculatePoints = (amount) => {
    if (amount <= 50) return 0;
    if (amount <= 100) return amount - 50;
    return 2 * (amount - 100) + 50;
  };
  