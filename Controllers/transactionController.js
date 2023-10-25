const express  = require('express');
const transactions = express.Router();
const transactionArray = require('../Models/data');
transactions.use(express.json());

//Renders All Items from Data
transactions.get('/' , (req, res)=>{

    res.json(transactionArray)

});

//Renders specified item by ID
transactions.get('/:id', (req, res)=>{
    const id = req.params.id;
    const purchase = transactionArray.find((transaction)=> transaction.id === parseInt(id));
    if(purchase){
        res.json(purchase)
        
    }
});



module.exports = transactions