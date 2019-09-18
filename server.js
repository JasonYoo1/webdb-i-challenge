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

server.get('/accounts/:id', (req,res)=>{
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
server.post('/accounts', (req, res) => {
    db ('accounts')
    .insert(req.body, 'id')//array of id's
        .then(response => {
            res.status(200).json({message: `account# ${response} added`});
        })
        .catch(error => {
            res.status(500).json(error);
        })
});
server.put('/accounts/:id', (req, res)=>{
    const {id} = req.params
    db('accounts')
        .where('id', id)
        .update(req.body)
        .then(results=>{
            if (results.length === 0) {
                res.status(400).json({message: 'error updating ID'});
            } else {
                console.log('hello')
            }
            res.status(200).json(results) 
        })
        .catch(err=> {
            res.status(500).json(err)
        })
})

server.delete('/accounts/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .del()
        .then(res => {
            res.status(200).json({message: `${res} deleted!`});
        })
        .catch(error => {
            res.json(error);
        })
});



module.exports = server;