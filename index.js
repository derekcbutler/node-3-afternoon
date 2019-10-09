require("dotenv").config();
const express = require('express');
const massive = require('massive');
const ctrl = require('./products_controller');

app = express();

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING } = process.env;


massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('THIS BITCH WORKS')
})
.catch(err => console.log(err));



app.post("/api/products", ctrl.create);
app.get("/api/products", ctrl.getAll);
app.get("/api/products/:id", ctrl.getOne);
app.put("/api/products/:id", ctrl.update);
app.delete("/api/products/:id", ctrl.delete);



app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});