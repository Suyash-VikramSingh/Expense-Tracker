import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Paper, Typography, Box } from "@mui/material";

Chart.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function ExpenseChart({ expenses }) {
  const categories = Array.from(new Set(expenses.map((e) => e.category)));
  const expenseData = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat && e.type === "expense")
      .reduce((a, e) => a + e.amount, 0)
  );
  const incomeData = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat && e.type === "income")
      .reduce((a, e) => a + e.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(255,99,132,0.65)",
      },
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(54,162,235,0.65)",
      },
    ],
  };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Income & Expenses by Category
      </Typography>
      <Box sx={{ height: 320 }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { y: { beginAtZero: true } },
          }}
        />
      </Box>
    </Paper>
  );
}
