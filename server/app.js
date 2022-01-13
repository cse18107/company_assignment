const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personsRouter = require('./routers/personsRouters');
const app = express();


app.use(express.json());

app.use(cors());

const DB="mongodb+srv://cse18107:cse18107@cluster0.6uonr.mongodb.net/personal_database?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true
}).then(con=>{
    console.log('successfully connected with database');
}).catch(err=>{
    console.log(err);
});

app.use('/',personsRouter);



app.listen(4000,()=>{
    console.log('server is working on port 4000');
})