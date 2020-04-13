const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/src/public/css')));
app.use('/js', express.static(path.join(__dirname, '/src/public/js')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts: accounts
  });
});
app.get('/account/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  })
});
app.get('/account/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  })
});
app.get('/account/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  })
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0]
  })
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  const parsedAmount = parseInt(amount);

  let newBalance = accounts[from].balance - parsedAmount;
  accounts[from].balance = newBalance;

  newBalance = accounts[to].balance + parsedAmount;
  accounts[to].balance = newBalance;

  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});
app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});
app.post('/payment', (req, res) => {
  const { amount } = req.body;
  const parsedAmount = parseInt(amount);

  let newBalance = accounts.credit.balance - parsedAmount;
  accounts.credit.balance = newBalance;

  newBalance = parseInt(accounts.credit.available) + parsedAmount;
  accounts.credit.available = newBalance;

  writeJSON();

  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
