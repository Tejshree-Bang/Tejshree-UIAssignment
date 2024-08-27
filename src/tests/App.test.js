import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import * as fetchUtils from "../utils/fetchTransactions";

// Mocking the fetchTransactions function from the utils directory to simulate fetching data without making an actual API call.
jest.mock("../utils/fetchTransactions");

// Mock data representing the transactions that the fetchTransactions function will return.
const mockTransactions = [
  { customerId: 1, name: "John Doe", mobile: "123-456-7890", date: "2024-01-15", amount: 120 },
  { customerId: 1, name: "John Doe", mobile: "123-456-7890", date: "2024-02-10", amount: 75 },
  { customerId: 2, name: "Jane Smith", mobile: "098-765-4321", date: "2024-02-15", amount: 150 },
];

// Test to check if the loading state is rendered initially when the App component is mounted.
test("renders loading state initially", async () => {
  // Mock the fetchTransactions function to return the mockTransactions data when called.
  fetchUtils.fetchTransactions.mockResolvedValueOnce(mockTransactions);

  // Render the App component.
  render(<App />);

  // Check if the "Loading..." text is displayed initially.
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

// Test to verify that customer points are displayed after data is loaded.
test("renders customer points after data is loaded", async () => {
  // Mock the fetchTransactions function to return the mockTransactions data.
  fetchUtils.fetchTransactions.mockResolvedValueOnce(mockTransactions);

  // Render the App component.
  render(<App />);

  // Wait for the text "John Doe" to be found in the document after loading the data.
  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();

  // Wait for the text "Jane Smith" to be found in the document after loading the data.
  expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
});

// Test to verify that the customer list is correctly filtered based on search input.
test("filters customers based on search input", async () => {
  // Mock the fetchTransactions function to return the mockTransactions data.
  fetchUtils.fetchTransactions.mockResolvedValueOnce(mockTransactions);

  // Render the App component.
  render(<App />);

  // Find the search input field by its placeholder text.
  const input = screen.getByPlaceholderText(/Search by name or mobile.../i);

  // Simulate a user typing "Jane" into the search input field.
  fireEvent.change(input, { target: { value: "Jane" } });

  // Check if the text "Jane Smith" is displayed in the document, indicating the filter worked.
  expect(await screen.findByText(/Jane Smith/i)).toBeInTheDocument();
});
