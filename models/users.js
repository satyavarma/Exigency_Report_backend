var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model('Users', Users);