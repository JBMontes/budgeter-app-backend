const express  = require('express');

const app = express();

const cors = require('cors')

app.use(cors());

const transactionsController = require("./Controllers/transactionController");

app.use(express.json());

app.use('/transactions', transactionsController)

module.exports= app