import React from "react";

/**
 * Component for the search input.
 * @param {Object} props - Component props.
 * @param {string} props.value - Current search input value.
 * @param {Function} props.onChange - Handler for input change.
 * @returns {JSX.Element} - The rendered component.
 */
const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name or mobile..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
