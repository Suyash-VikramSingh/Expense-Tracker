import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Salary",
  "Freelance",
  "Other",
];

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().substr(0, 10),
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category) return;
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ ...form, title: "", amount: "", category: "" });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
            size="small"
            inputProps={{ min: 1 }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            size="small"
            sx={{ minWidth: 120 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            size="small"
            sx={{ minWidth: 110 }}
          >
            <MenuItem value="expense">Expense</MenuItem>
            <MenuItem value="income">Income</MenuItem>
          </TextField>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ minWidth: 120 }}
          >
            Add
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
