/********************************************************************************
* BTI425 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Safal Awal Student ID: 153359229 Date: Jan 17 2025
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors")
require('dotenv').config();
app.use(cors());
app.use(express.json())
// Add support for incoming JSON entities
app.use(express.json());
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();


app.get("/api/listings", async (req, res) => {
    let listings =  await db.getAllListings(1, 5);
    res.send(listings);
})


app.post("/api/listings", async (req, res) => {
        let listings = await db.getAllListings();
        res.send(listings);
});

app.get("/api/listings/:listingId", async (req, res) => {
    try{
        let name = await db.getListingById(req.params.listingId);
        res.send(name);

    }catch(err){
        res.status(404).send({message:err});
    }
})

app.post('/api/listings', async(req, res) => {
    await listing.addName(req.body);
  // MUST return HTTP 201
  res.status(201).json({ message: `added a new item: ${req.body}}` });
});

app.put('/api/listings/:listingsId', async (req, res) => {
    try{
        await db.updateListingById(req.params.listingsId, req.body);
        res.send({
            message: `updated item with identifier: ${req.params.listingsId}`,
        });
    }catch(err){
        res.status("404").send({message: err});
    }
  });

  app.delete('/api/listings/:listingsId', async (req, res) => {
    try{
        await db.deleteListingById(req.params.listingsId);
        res.status(200).send({ message: `deleted item with identifier: ${req.params.listingsId}` });
    }catch(err){
        res.status("404").send({message: err})
    }
  });


db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    });



