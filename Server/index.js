const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const dataPrices = require('yahoo-stock-prices');

const app = express();
const port = 3000;

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
    console.log(stock);
    if(portfolio.length!=0){
        stock.id = parseInt(portfolio[portfolio.length - 1].id) + 1;
    } else{
        stock.id = 1;
    }
    portfolio.push(stock);
    res.send('Stock '+ stock.Stock + ' was added to the portfolio')
});

//POST for Stocks
app.put('/stock', (req, res) => {
    const id = req.body.id;
    const newStock = req.body;

    console.log(newStock);
    for(let i = 0; i < portfolio.length; i++){
        let stock = portfolio[i];
        if(stock.id == newStock.id){
            portfolio[i] = newStock;
        }
    }

    res.send('Stock ' + newStock.Stock + ' was edited')
});

//GETTER for Stocks
app.get('/stock', (req, res) => {
    updatePrices();
    res.send(portfolio);
});

//GETTER with ID for Stocks
app.get('/stock/:id', (req, res) => {
    const id = req.params.id;
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
    portfolio = portfolio.filter(i =>{
        if(i.id != id){
            return true;
        }
        name = i.name;
        return false;
    })
    res.send('Stock ' + name + ' was deleted. ID ' + id);
});


//DELETE ALL Stocks
app.delete('/stock', (req, res) =>{
    console.log("DELETE all Stock");
    portfolio = [];
    res.send('Everything was deleted');
});


function updatePrices(){  

    for(let i = 0; i < portfolio.length; i++){
        let stock = portfolio[i];
        console.log("Check Price for " + stock.Stock)
        dataPrices.getCurrentPrice(stock.Stock, (err, price) => {
            if(!price){
                stock.Current = NaN;
            } else{
                stock.Current = price;
                stock.balance = (stock.Amount * stock.Current) - (stock.Amount * stock.Starting);
                console.log(stock);
            }
            
            console.log(price); // 132.05
        });
    }

}


//GETTER with ID for Stocks
app.get('/valid/:stock', (req, res) => {
    const stock = req.params.stock;
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

app.listen(port, () => console.log(`The app is listening on port ${port}!`));