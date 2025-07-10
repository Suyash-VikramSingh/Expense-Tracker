const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const { title, amount, category, type, date } = req.body;
  const expense = new Expense({
    user: req.user.id,
    title,
    amount,
    category,
    type,
    date,
  });
  await expense.save();
  res.json(expense);
};

exports.deleteExpense = async (req, res) => {
  const exp = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!exp) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
};

exports.updateExpense = async (req, res) => {
  const { title, amount, category, type, date } = req.body;
  const exp = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, amount, category, type, date },
    { new: true }
  );
  if (!exp) return res.status(404).json({ error: "Not found" });
  res.json(exp);
};
