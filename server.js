const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).send('Server is working!!!')
});

server.get('/accounts', (req, res) => {
    db('accounts')
        .then(results => {
            res.status(200).json(results);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

server.get('/:id', (req,res)=>{
    const {id} = req.params
     db('accounts')
        .where({id})
        .first()
        .then(accounts =>{
            res.status(200).json(accounts)
        })
        .catch(err=>{
            res.status(500).json({error: 'no account with this ID'})
        })
});



module.exports = server;