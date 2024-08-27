import React from "react";
import CustomerReward from "./CustomerRewards";

/**
 * Component to display a list of customers and their points.
 * @param {Object} props - Component props.
 * @param {Object[]} props.pointsData - Array of points data for customers.
 * @returns {JSX.Element} - The rendered component.
 */
const CustomerRewardList = ({ pointsData }) => {
  if (!pointsData.length) {
    return <p>No results found</p>;
  }

  return (
    <>
      {pointsData.map(({ customerId, name, mobile, monthlyPoints, totalPoints }) => (
        <CustomerReward
          key={customerId}
          name={name}
          mobile={mobile}
          monthlyPoints={monthlyPoints}
          totalPoints={totalPoints}
        />
      ))}
    </>
  );
};

export default CustomerRewardList;
