const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personsRouter = require('./routers/personsRouters');
const adminRouter = require('./routers/adminRouters');
const app = express();
require('dotenv').config();


app.use(express.json());

app.use(cors());
console.log(process.env.DB_USER)
const DB=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6uonr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB,{
    useNewUrlParser:true
}).then(con=>{
    console.log('successfully connected with database');
}).catch(err=>{
    console.log(err);
});
app.get('/',(req,res)=>{
    res.status(200).json({
        message:success
    })
})

app.use('/',personsRouter);
app.use('/admin',adminRouter);



app.listen(4000,()=>{
    console.log('server is working on port 4000');
})