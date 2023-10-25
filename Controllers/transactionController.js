const express  = require('express');
const transactions = express.Router();
const transactionArray = require('../Models/data');
transactions.use(express.json());

//Renders All Items from Data
transactions.get('/' , (req, res, next)=>{

    try{

        if(transactionArray){ 

            res.status(200).json(transactionArray)

        }else{

            res.status(404).send({message: `Transactions not found!`});
        }}

    catch(error){
        next(error)
    }
});

//Renders Specified Item by ID
transactions.get('/:id', (req, res, next)=>{
    const id = req.params.id;
    const purchase = transactionArray.find((transaction)=> transaction.id === parseInt(id));
    
   try{ 

    if(purchase){ 

        res.status(202).json(purchase) }

    else{
    res.status(404).send({ message: "Transaction not found!"})

}}
    catch(error){
        next(error)
    }
});

//Adds New Transaction to List
transactions.post('/', (req, res, next)=>{
    try{
        const transactionBody = req.body;
        if(transactionBody){
            transactionArray.push(transactionBody);
            res.status(201).send({message: `Transaction successfully added!`})
        }else{
            res.status(404).send({message: `Transaction not added!`})
        }
    }

    catch(error){
        next(error)
    }
});

//Updates a Transaction in the List
transactions.put('/:id', (req,res, next)=>{
try{

const transactionID = parseInt(req.params.id);
const transactionToUpdate = req.body;
const transactionIndex = transactionArray.findIndex((item)=>item.id === transactionID)

if(transactionIndex === -1){
    res.status(404).send({message: `Transaction not found!`});
}

//The existing transaction that's being updated
const chosenTransaction = transactionArray[transactionIndex]; 

for(let key in transactionToUpdate){
    if(chosenTransaction.hasOwnProperty([key])){
//Transfers the user's inputs to the existing transaction
        chosenTransaction[key] = transactionToUpdate[key];
    }
}
//Transfers the new details to the position of the existing transaction
transactionArray[transactionIndex] = chosenTransaction;

res.status(200).send(chosenTransaction);

}

catch(error){

    next(error)
}
});


//Deletes a Transaction
transactions.delete('/:id', (req, res, next) => {
   
    try {
        const id = parseInt(req.params.id);
        const itemIndex = transactionArray.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item not found' });
        }

        const deletedItem = transactionArray.splice(itemIndex, 1); 

        res.send(deletedItem[0]);

    } catch (error) {
        next(error);
    }
});

module.exports = transactions