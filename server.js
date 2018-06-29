const express = require('express') ;
const app = express() 

const mysql = require('mysql2');

const bodyParser = require( 'body-parser' ) ;

app.use(express.static('public')) ;
app.use(express.static('public/images'));
app.use( bodyParser.urlencoded( {extended : true} ) ) ;
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12245265',
  password : 'upsLUJk7Bh' ,
  multipleStatements: true 
});


// setting up the database to be used ;

let startQuery = "create database if not exists sql12245265 ;" +
                  "use sql12245265 ;" +
                  "create table if not exists products ( id int primary key auto_increment , title varchar(200) , content varchar(1000) , price int , image varchar(200) ) ; " +
                  "create table if not exists cart ( id int primary key , title varchar(200) , content varchar(1000) , price int , quantity int ) ; " ;


connection.query(
    startQuery ,
  function(err, results, fields) {
      if (err) {
          console.log( "Error " + err ) ;
      }
      console.log("Done Start Query") ;
  }
);
 
app.post("/addproduct" , function (req, res) {
    //console.log("inside") ;
    let data = req.body ;

    let query = "insert into products (title , content , price, image) values ( '" + 
                data.title + "' , '" + data.content + "' , " + data.price + ", '" + data.image + "' );" ;
    connection.query(
        query,
        function(err, results, fields) {
            if (err) {
                console.log( "Error " + err ) ;
            }
            //console.log(query) ;
            //console.log("Product Added Successfully") ;
        }
      );
      res.redirect("/") ;
      //console.log("outside") ;

}) ;

app.get("/" , function (req,res) {

    let cards = [] ;

    connection.query(
        'select * from products ;',
        function(err, results, fields) {
         
            if (results != null) {
                cards = results ;
            }
            //console.log( results ) ;
            res.render( "home.ejs" , { cards : cards } ) ;
        }
      );

}) ;


app.post( "/updatecart" , function (req , res) {

    let data = req.body ;

    for ( let val in data ) {

        let temp_data = {} ;

        connection.query(
            "select * from products where id = " + val + " ;" ,
            function( err , results , fields ) {
                temp_data = results[0] ;

                let query = "insert into cart ( id , title , content , price , quantity ) values ( " + 
                            val + " , '" + temp_data.title + "' , '" + temp_data.content + "' , " + temp_data.price + " , " + data[val] + " )" +
                            " on duplicate key update quantity = quantity + " + data[val] + " ;" ;                     
                //console.log( val + " inside " + query ) ;
                connection.query(
                    query ,
                    function(err , results , fields) {
                        if (err) {
                            console.log(err) ;
                        }
                        //console.log("Executed a query...") ;
                    }
                ) ;

            }

        )        
       
    }

    res.redirect("/cart") ;

} ) ;

app.post( "/updatecart2" , function (req , res) {

    let data = req.body ;

    for ( let val in data ) {

        let temp_data = {} ;

        connection.query(
            "select * from products where id = " + val + " ;" ,
            function( err , results , fields ) {
                temp_data = results[0] ;

                let query = "insert into cart ( id , title , content , price , quantity ) values ( " + 
                            val + " , '" + temp_data.title + "' , '" + temp_data.content + "' , " + temp_data.price + " , " + data[val] + " )" +
                            " on duplicate key update quantity = " + data[val] + " ;" ; 
               // console.log(query) ;                                
                connection.query(
                    query ,
                    function(err , results , fields) {
                        if (err) {
                            console.log(err) ;
                        }
                      //  console.log("Executed a query...") ;
                    }
                ) ;

            }

        )        
       
    }

    res.redirect("/cart") ;

} ) ;

app.get("/cart", function(req,res) {

    let cart = [] ;

    let query = "select * from cart ;" ;

    connection.query(
        query , 
        function ( err , results , fields ) {
            //console.log(results) ;
            cart = results ;
            res.render( "cart.ejs" , { cart : cart } ) ;
        }
     )
    
}) ;

app.get( "/order" , function(req,res) {

    connection.query(
        "delete from cart ;" , 
        function ( err , results , fields ) {
            
            res.render( "order.ejs") ;
        }
     )

} ) ;

app.get( "/admin" , function(req , res) {

    res.render( "admin.ejs" ) ;

} ) ;

app.get( "/order" , function (req , res) {
    res.render( 'order.ejs' ) ;
} ) ;

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
let ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

//const PORT = process.env.PORT || 4000

app.listen( port, ip ,  function (req, res) {
    console.log("%s and %s", process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP) ;
    console.log("Express server listening on port %d in %s mode", port , ip);
} ) ;