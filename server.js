const express = require('express');
const path = require('path');
const fs = require('fs');

// path to json data
const { notes } = require('./db/notes');

// require for heroku
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());
// provides routes to static files like css and js 
app.use(express.static('public'));



// route listeners
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//  start the express server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`)
});