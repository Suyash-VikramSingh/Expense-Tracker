import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Chip,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No entries yet! Add your expenses and incomes above.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 3, mb: 4 }}>
      <List>
        {expenses.map((e, idx) => (
          <React.Fragment key={e._id}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(e._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                {e.type === "income" ? (
                  <TrendingUpIcon color="success" />
                ) : (
                  <TrendingDownIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {e.title}
                    </Typography>
                    <Chip
                      label={e.category}
                      color={e.type === "income" ? "success" : "error"}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="body2">
                      {e.type === "income" ? "+" : "-"}₹
                      {e.amount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(e.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {idx < expenses.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
