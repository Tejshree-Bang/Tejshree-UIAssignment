import React, { useState, useEffect, useMemo } from "react";
import CustomerRewardList from "./components/CustomerRewardList";
import SearchBar from "./components/searchBar";
import { fetchTransactions } from "./utils/fetchTransactions";
import { groupByMonth } from "./utils/groupByMonth";
import { useDebounce } from "./hooks/useDebounce";
import Loading from "./components/Loading";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [pointsData, setPointsData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      setPointsData(groupByMonth(transactions));
    }
  }, [transactions]);

  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) {
      return Object.entries(pointsData).map(([customerId, data]) => ({
        customerId,
        ...data,
      }));
    }

    return Object.entries(pointsData)
      .filter(([_, { name, mobile }]) =>
        name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        mobile.includes(debouncedSearchTerm)
      )
      .map(([customerId, data]) => ({
        customerId,
        ...data,
      }));
  }, [debouncedSearchTerm, pointsData]);

  return (
    <>
      <h1>Customer Reward Points</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {loading ? <Loading /> : <CustomerRewardList pointsData={filteredData} />}
    </>
  );
};

export default App;
