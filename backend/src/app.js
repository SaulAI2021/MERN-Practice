const express = require('express');
const cors = require('cors');
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json()); // el server recibe data json

//routes
app.get('/api/users',(req,res) => res.send('Users routes'));
app.get('/api/notes',(req,res) => res.send('Notes routes'));


module.exports = app;