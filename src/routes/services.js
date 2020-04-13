const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});
router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  const parsedAmount = parseInt(amount);

  let newBalance = accounts[from].balance - parsedAmount;
  accounts[from].balance = newBalance;

  newBalance = accounts[to].balance + parsedAmount;
  accounts[to].balance = newBalance;

  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});
router.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});
router.post('/payment', (req, res) => {
  const { amount } = req.body;
  const parsedAmount = parseInt(amount);

  let newBalance = accounts.credit.balance - parsedAmount;
  accounts.credit.balance = newBalance;

  newBalance = parseInt(accounts.credit.available) + parsedAmount;
  accounts.credit.available = newBalance;

  writeJSON();

  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;
