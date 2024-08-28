import React, { useState, useEffect, useMemo } from "react";
import CustomerRewardList from "./components/CustomerRewardList";
import SearchBar from "./components/searchBar";
import { fetchTransactions } from "./utils/fetchTransactions";
import { groupByMonth } from "./utils/groupByMonth";
import { useDebounce } from "./hooks/useDebounce";
import Loading from "./components/Loading";


const App = () => {
  // State to hold transactions data
  const [transactions, setTransactions] = useState([]);

  // State to hold points data grouped by month
  const [pointsData, setPointsData] = useState({});

  // State to manage the search term input
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  // Use debounce to delay the search input for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch transactions on component mount
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []); // Empty dependency array means this runs once on component mount

  // Group transactions by month whenever transactions data changes
  useEffect(() => {
    if (transactions.length > 0) {
      // Group transactions and update pointsData state
      setPointsData(groupByMonth(transactions));
    }
  }, [transactions]); // Dependency array includes transactions

  // Filter the data based on the debounced search term
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) {
      // If no search term, return all points data
      return Object.entries(pointsData).map(([customerId, data]) => ({
        customerId,
        ...data,
      }));
    }
    // Filter points data based on search term and return filtered results
    return Object.entries(pointsData)
      .filter(([_, { name, mobile }]) =>
        name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        mobile.includes(debouncedSearchTerm)
      )
      .map(([customerId, data]) => ({
        customerId,
        ...data,
      }));
  }, [debouncedSearchTerm, pointsData]); // Dependency array includes debouncedSearchTerm and pointsData

  return (
    <>
      <h1>Customer Reward Points</h1>
      {/* SearchBar component for user input */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {/* Show Loading component while data is being fetched */}
      {loading ? <Loading /> : <CustomerRewardList pointsData={filteredData} />}
    </>
  );
};

export default App;
