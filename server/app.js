const express = require('express');
const mongoose = require('mongoose');

const app = express();

const DB="mongodb+srv://cse18107:cse18107@cluster0.6uonr.mongodb.net/personal_database?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true
}).then(con=>{
    console.log('successfully connected with database');
}).catch(err=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'server is working'
    });
})

app.listen(4000,()=>{
    console.log('server is working on port 4000');
})