const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config =require('config');
const dotenv = require('dotenv');
dotenv.config();

const userSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    }
});

userSchema.methods.generateAuthToken = function(){
     // const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
 const token = jwt.sign({_id: this._id,name: this.name},'jwtPrivateKey');
 return token;
}
const User = mongoose.model('User',userSchema);

function validateUser(user)
{
    const schema ={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(500).required()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;