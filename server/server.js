const express = require('express');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());


app.use(routes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});