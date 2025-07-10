import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import { fetchExpenses, addExpense, deleteExpense } from "./api";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));

  const loadExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await fetchExpenses(token);
    // Ensure expenses is always an array
    setExpenses(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (authed) loadExpenses();
  }, [authed]);

  const handleAdd = async (exp) => {
    const token = localStorage.getItem("token");
    const newExp = await addExpense(exp, token);
    setExpenses([newExp, ...expenses]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteExpense(id, token);
    setExpenses(expenses.filter((e) => e._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthed(false);
    setExpenses([]);
  };

  if (!authed) return <AuthForm onAuth={() => setAuthed(true)} />;

  // Simple totals
  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((a, e) => a + e.amount, 0);
  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((a, e) => a + e.amount, 0);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" enableColorOnDark sx={{ mb: 3 }}>
        <Toolbar>
          <PaidIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Balance: ₹{(totalIncome - totalExpense).toLocaleString()}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ mb: 2, display: "flex", gap: 2, justifyContent: "center" }}>
          <Typography variant="subtitle1" color="success.main">
            Total Income: ₹{totalIncome.toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" color="error.main">
            Total Expense: ₹{totalExpense.toLocaleString()}
          </Typography>
        </Box>
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseChart expenses={expenses} />
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </Container>
    </>
  );
}

export default App;
