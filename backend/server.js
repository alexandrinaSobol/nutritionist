require('./models/User');
require('./models/Product');
require('./models/Meal');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const dbConfig = require('./database/db');

const foodRoute = require('../backend/routes/food.route');
const accountRoute = require('../backend/routes/account.route');
const mealRoute = require('../backend/routes/meal.route');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
   console.log('Database sucessfully connected')
},
   error => {
      console.log('Database could not connected: ' + error)
   }
)

app.use(passport.initialize());
app.use(passport.session());

require('./database/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', foodRoute);
app.use('/api/account', accountRoute);
app.use('/api/meal', mealRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
   console.log('Connected to port ' + port)
})
