const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost/pivedb', { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(db => console.log('DB ok'))
    .catch(err => console.error(err));


//Settings
app.set('port', 3000);

//Middlewarres
app.use(morgan('dev'));
app.use(express.json());

//router
app.use('/api/tasks', require('./routers/tasks'));
app.use('/api/users', require('./routers/users'));

//Static File
app.use(express.static(__dirname + '/public'));

//Server listening
app.listen(app.get('port'), ()=> {
    console.log('Server on port ', app.get('port'));
} );