const express = require('express') ;
const app = express() 

const mysql = require('mysql2');

const bodyParser = require( 'body-parser' ) ;

app.use(express.static('public')) ;
app.use( bodyParser.urlencoded( {extended : true} ) ) ;
 
app.get( "/" , (req,res) => res.send("hello") ) ;

const PORT = process.env.PORT || 3000

app.listen( PORT , function (req, res) {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
} ) ;