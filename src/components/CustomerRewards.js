import React, { memo } from "react";

/**
 * Component to display points information for a single customer.
 * @param {Object} props - Component props.
 * @param {string} props.name - Customer name.
 * @param {string} props.mobile - Customer mobile number.
 * @param {Object} props.monthlyPoints - Points data per month.
 * @param {number} props.totalPoints - Total points.
 * @returns {JSX.Element} - The rendered component.
 */
const CustomerReward = ({ name, mobile, monthlyPoints, totalPoints }) => {
  return (
    <div>
      <h2>{name} ({mobile})</h2>
      <p>Total Points: {totalPoints}</p>
      <ul>
        {Object.entries(monthlyPoints).map(([month, points]) => (
          <li key={month}>
            {month}: {points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(CustomerReward);
