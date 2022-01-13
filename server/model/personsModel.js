const mongoose = require('mongoose');

const personsSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    }
});

const Persons = mongoose.model('Persons',personsSchema);

module.exports = Persons;