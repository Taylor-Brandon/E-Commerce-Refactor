const express = require('express');
require('dotenv').config()
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stripe = require('stripe')(process.env.STRIPE_KEY)

const cors = require('cors');
app.use(cors());


app.use(routes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});