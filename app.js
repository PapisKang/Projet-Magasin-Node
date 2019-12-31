const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');



var app = express();

app.get('/',(req,res)=> res.send('hello world'));
app.use(xmlparser());
app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"magasin",
  //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('Db connection succeded');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
