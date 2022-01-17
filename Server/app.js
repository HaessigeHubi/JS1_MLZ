const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const dataPrices = require('yahoo-stock-prices');

const app = express();
const port = 3000;
//Initial Portfolio Array
let portfolio = [
    {
        "id": 1,
        "Company":"Tesla",
        "Stock":"TSLA",
        "Amount":10,
        "Current":1050,
        "Starting":519,
        "balance" : 0
    },
    {
        "id": 2,
        "Company":"Logitec",
        "Stock":"LOGI",
        "Amount":55,
        "Current":120,
        "Starting":39,
        "balance" : 0
    }
];
app.use(cors());

//Body parser
app.use(bodyParse.urlencoded({
    extended: false
}));
app.use(bodyParse.json());

//POST for Stocks
app.post('/stock', (req, res) => {
    const stock = req.body;
    //Calculating the Array Identifier (1 when array is empty)
    if(portfolio.length!=0){
        stock.id = parseInt(portfolio[portfolio.length - 1].id) + 1;
    } else{
        stock.id = 1;
    }
    portfolio.push(stock);
    res.send('Stock '+ stock.Stock + ' was added to the portfolio')
});

//PUT for Stocks
app.put('/stock', (req, res) => {
    const id = req.body.id;
    const newStock = req.body;
    let contains = false;
    //Searching for matching ID
    for(let i = 0; i < portfolio.length; i++){
        let stock = portfolio[i];
        if(stock.id == newStock.id){
            portfolio[i] = newStock;
            contains = true;
        }
    }
    if(!contains){
     //Adding the Stock if it's Missing    
        if(portfolio.length!=0){
            newStock.id = parseInt(portfolio[portfolio.length - 1].id) + 1;
        } else{
            newStock.id = 1;
        }
        portfolio.push(newStock);
    }

    res.send('Stock ' + newStock.Stock + ' was edited')
});

//GETTER for all Stocks
app.get('/stock', (req, res) => {
    updatePrices();
    res.send(portfolio);
});

//GETTER for single Stock with ID 
app.get('/stock/:id', (req, res) => {
    const id = req.params.id;
    //Sending back the Stock with matching ID
    for(let stock of portfolio){
        if(stock.id == id){
            res.send(stock);
            return;
        }
    }
    res.status(404).send('Stock not found');
});

//DELETE for Stocks
app.delete('/stock/:id', (req, res) =>{
    const id = req.params.id;
    var name = 'Undefined';
    console.log("DELETE Stock" + id);
    //Filter to Delete the matching stock
    portfolio = portfolio.filter(i =>{
        if(i.id != id){
            return true;
        }
        name = i.name;
        return false;
    })
    res.send('Stock was deleted. ID ' + id);
});


//DELETE ALL Stocks
app.delete('/stock', (req, res) =>{
    console.log("DELETE all Stock");
    portfolio = [];
    res.send('Everything was deleted');
});

//GETTER for Stock Validity
app.get('/valid/:stock', (req, res) => {
    const stock = req.params.stock;
    //Function has an empty price, when the stock wasn't found
    dataPrices.getCurrentPrice(stock, (err, price) => {
        if(!price){
            console.log("NOK");
            res.status(404).send(new Error('Not Found'));
        } else{
            console.log("OK");
            res.send("OK");
        }
    });
});

//Function for checking Current Stock Prices and updating all Stocks
function updatePrices(){  
    for(let i = 0; i < portfolio.length; i++){
        let stock = portfolio[i];
        console.log("Check Price for " + stock.Stock)
        //Function Gets all current Market Prices for stock.Stock
        dataPrices.getCurrentPrice(stock.Stock, (err, price) => {
            if(!price){
                stock.Current = NaN;
            } else{
                stock.Current = price;
                stock.balance = (stock.Amount * stock.Current) - (stock.Amount * stock.Starting);
            }
            console.log(price); // 132.05
        });
    }
}

//LISTENER for Port 3000
app.listen(port, () => console.log(`The app is listening on port ${port}!`));