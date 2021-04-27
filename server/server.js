const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
var db = require('./Database/db');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.post('/beers/favorites/add', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let beer=req.body.beer;
    let userEmail=req.body.userEmail;

    //Get userId
    db.query('select id as userId from user where email = "' + userEmail + '";', (err, rows) => {
        if(err) throw err;

        let userId = rows[0].userId;

        //Verify if favorite already exists
        db.query('SELECT count(*) as result from favorite where userId = '  + userId + ' and id = ' +  beer.id + ';', (err, rows) => {
            if(err) throw err;

            if(rows[0].result === 1){
                res.json({error:'La bière est déjà dans vos favoris.'});
            } else {
                //Insert into favorites
                db.query('insert into favorite values(' + beer.id + ',"' + beer.name + '",' + beer.abv + ',"' + beer.image + '","' + beer.description + '","' + beer.tag + '",' + userId + ',"' + beer.date + '");', (err, rows) => {
                    if(err) throw err;

                    res.json({error:'no'});
                });
            }
        });
    });
})

app.post('/beers/favorites/delete', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let beer=req.body.beer;
    let userEmail=req.body.userEmail;

    //Get userId
    db.query('select id as userId from user where email = "' + userEmail + '";', (err, rows) => {
        if(err) throw err;

        let userId = rows[0].userId;

        //Delete correct beer from favorite
        db.query('DELETE from favorite where userId=' + userId + ' and id=' + beer.id + ';', (err, rows) => {
            if(err) throw err;

            res.json({error:'no'});
        });
    });
});

app.post('/beers/favorites', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let userEmail=req.body.email;

    db.query('SELECT id from user where email="' + userEmail + '";', (err, rows) => {
        if(err) throw err;

        let userId=rows[0].id;

        if(rows[0].id){
            db.query('SELECT * from favorite where userId=' + userId + ';', (err, rows) => {
                if(err) throw err;

                res.json({error:'no', favorites: rows});
            });
        } else {
            res.json({error:'Probleme d\'utilisateur...'});
        }
    });
})

app.post('/user/login', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let email=req.body.email;
    let password=req.body.password;

    db.query('SELECT count(*) as result from user where email="' + email + '" and password="' + password +'";', (err, rows) => {
        if(err) throw err;

        if(rows[0].result === 1){
            res.json({error:'no'});
        } else {
            res.json({error: "Nom de compte ou mot de passe erroné."});
        }
    });
})

app.post('/user/register', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;

    db.query('select count(*) as result from user where email="' + email + '";', (err, rows) => {
        if(err) throw err;

        if(rows[0].result === 1){
            res.json({error:'L\'adresse email est déjà utilisée.'});
        } else {
            db.query('insert into user(name, email, password) values ("' + name + '", "' + email + '", "' + password +'");', (err, rows) => {
                if(err) throw err;

                res.json({error:'no'});
            });
        }
    });
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
