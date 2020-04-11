const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/src/public/css')));
app.use('/js', express.static(path.join(__dirname, '/src/public/js')));

const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'), {
  encoding: 'utf-8'
});

const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'), {
  encoding: 'utf-8'
});

const users = JSON.parse(userData);

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

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
