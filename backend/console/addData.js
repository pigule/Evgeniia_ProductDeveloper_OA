const fs = require('fs');
const csv = require('csv');
const path = require('path');

let models = require("../models");
let DailyInventory = models.DailyInventory;

let input = fs.createReadStream('Daily Inventory.csv');
let parser = csv.parse({
    delimiter: ',',
    columns: true
})

let transform = csv.transform(function(data) {
    let resultObj = {
        productID: data['Product ID'],
        date: data['Date'],
        location: data['Location'],
        onHandQty: data['On Hand Qty'],
        unitCost: data['Unit Cost'],
        onHandValue: data['On Hand Value']
    }
    DailyInventory.bulkCreate([resultObj])
        .then(function() {
            console.log('Created')
        })
        .catch(function(err) {
            console.log('Error: ' + err)
        })
})

input.pipe(parser).pipe(transform)