const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');



var app = express();


app.use(xmlparser());
app.use(bodyparser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

var mysqlConnection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"magasin",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('Db connection succeded');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.get('/api/produits',(req,res) => {
  mysqlConnection.query('SELECT * FROM produit',(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/api/produits/enstock',(req,res) => {
  mysqlConnection.query('SELECT produit.id,nom,categorie,valeur,quantite FROM produit,prix,stock where produit.id=prix.produit_id and produit.id=stock.produit_id and quantite>0 group by produit.id,nom,categorie,valeur,quantite',(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.get('/api/allstock',(req,res) => {
  mysqlConnection.query('SELECT * FROM stock',(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});



app.post('/api/produit',(req,res) => {
  let content= req.body;
  console.log(content)
  var sql= "INSERT INTO produit (nom,categorie) VALUES (?, ?)";
  mysqlConnection.query(sql,[content.nom,content.categorie],(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.post('/api/prix',(req,res) => {
  let content= req.body;
  var sql= "INSERT INTO prix (valeur,datedeb,datefin,produit_id) VALUES (?, ?, ?, ?)";
  mysqlConnection.query(sql,[content.valeur,content.dateDeb,content.dateFin,content.produit.id],(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});


app.post('/api/produit/vente',(req,res) => {
  let content= req.body;
  var itempaniers=JSON.parse(content.itempaniers);
  var idvente=JSON.parse(content.idvente);
  
  var values="";

  for (var i=0;i<ob.length; i++) {
    values += "("+ itempaniers[i].produit.id + ","+idvente.ID+","+itempaniers[i].quantite+"),"  ;
  }
  values=values.substring(0, values.length - 1);
  var sql= "INSERT INTO produit_vente (produit_id,vente_id,quantite) VALUES "+values;
  mysqlConnection.query(sql,(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});


app.post('/api/vente',(req,res) => {
  let content= req.body;
  var sql= "INSERT INTO ventes (dates,prix_total) VALUES (?, ?)";
  var sql1="Select LAST_INSERT_ID() ID;"
  mysqlConnection.query(sql,[content.date,content.prixTotale],(err, rows, fields) => {
  if(!err)
    mysqlConnection.query(sql1,(err1,rows1,fields) => {
      if(!err1)
        res.send(rows1[0]);
      else
        console.log(err1);
    })
  else
    console.log(err);
  })
});



app.post('/api/stock',(req,res) => {
  let content= req.body;
  var sql= "INSERT INTO stock (dates,quantite,produit_id) VALUES (?,?, ?)";
  mysqlConnection.query(sql,[content.date,content.quantite,content.produit.id],(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});


app.get('/api/getCountNomProduct/:nomProduit',(req,res) => {
  mysqlConnection.query('SELECT count(*) as count FROM produit where nom = ?',[req.params.nomProduit],(err, rows, fields) => {
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});



app.get('/api/produit/:nomProduit',(req,res) => {
  mysqlConnection.query('SELECT * FROM produit where nom = ?',[req.params.nomProduit],(err, rows, fields) => {
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/api/prix/:idProduit',(req,res) => {
  mysqlConnection.query('SELECT * FROM prix WHERE produit_id = ?',[req.params.idProduit],(err, rows, fields) => {
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/api/vente/:id',(req,res) => {
  mysqlConnection.query('SELECT * FROM vente WHERE id = ?',[req.params.id],(err, rows, fields) => {
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.get('/api/stock/:idProduit',(req,res) => {
  mysqlConnection.query('SELECT * FROM stock WHERE produit_id = ?',[req.params.idProduit],(err, rows, fields) => {
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.delete('/api/produit/:idProduit',(req,res) => {
  mysqlConnection.query('DELETE FROM produit WHERE id = ?',[req.params.idProduit],(err, rows, fields) => {
  if(!err)
    res.send('Deleted successfully !');
  else
    console.log(err);
  })
});

app.get('/api/produitId/:idProduit',(req,res) => {
  mysqlConnection.query('SELECT * FROM produit WHERE id = ?',[req.params.idProduit],(err, rows, fields) => {
  if(!err)
    res.send(rows);
  else
    console.log(err);
  })
});

app.put('/api/stock',(req,res) => {
  let content= req.body;
  var sql= "UPDATE stock SET dates= ? ,quantite = ? WHERE produit_id = ?";
  mysqlConnection.query(sql,[content.date,content.quantite,content.produit.id],(err, rows, fields) => {
  if(!err)
    res.send('Updated successfully');
  else
    console.log(err);
  })
});

app.listen(3000,() => console.log('Express server is runnning at part no : 3000'));
