import { calculatePoints } from "./calculatePoints";

/**
 * Groups transactions by customer and calculates reward points per month and total.
 * @param {Object[]} transactions - The array of transactions.
 * @returns {Object} - The grouped and calculated points data.
 */
export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, { customerId, name, mobile, date, amount }) => {
    const month = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
    const points = calculatePoints(amount);

    if (!acc[customerId]) {
      acc[customerId] = { name, mobile, monthlyPoints: {}, totalPoints: 0 };
    }

    if (!acc[customerId].monthlyPoints[month]) {
      acc[customerId].monthlyPoints[month] = 0;
    }

    acc[customerId].monthlyPoints[month] += points;
    acc[customerId].totalPoints += points;

    return acc;
  }, {});
};
