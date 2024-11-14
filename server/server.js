require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const routes = require('./routes');
const session = require('express-session');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);  

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sess = {
  secret: 'Super secret secret',
  cookie: {maxAge: 30 * 60 * 1000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const cors = require('cors');
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
