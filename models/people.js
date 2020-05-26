var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var People = new Schema({
    name: {
        type: String,
        required: true,
    },
    adharno: {
        type: String,
        required: true,
        unique: true
    },
    mobileno: {
        type: String,
        required: true,
    },
    emgcntno: {
        type: String,
        required: true
    },
    born:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        requried:true,
    },
    height:{
        type: String,
        required:true,
    },
    weight:{
        type: String,
        required: true
    },
    physicallychallenged:{
        type: String,
        default:''
    },
    bloodgroup:{
        type: String,
        default: ''
    },
    skindiseases:{
        type: String,
        default: ''
    },
    bp:{
        type: String,
        default:''
    },
    sugar:{
        type:String,
        default:''
    },
    asthma:{
        type: String,
        default:''
    },
    heartproblems:{
        type: String,
        default:''
    },
    surgeries:{
        type: String,
        default:''
    },
    hereditaryproblems:{
        type: String,
        default:''
    },
    cancers:{
        type: String,
        default:''
    },
    aids:{
        type: String,
        default:''
    },
    senseorgansproblems:{
        type: String,
        default:''
    }
});

module.exports = mongoose.model('People', People);