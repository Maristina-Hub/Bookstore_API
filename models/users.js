import pkg from 'mongoose';
import validator from 'validator';

const { Schema, model } = pkg

const userSchema = new Schema({
    firstName: { 
        type: String, 
        required: true 
    },

    email: {
        type: String, 
        required: 'Email address is required',
        validate:{
        validator: validator.isEmail,
        //The validator dosn't play well with mongoose to get rid of the warning set isAsync to false
        message: '{VALUE} is not a valid email',
        isAsync: false
    }
    },

    password: {
        type: String, 
    }
    
},

{ timestamps: true }

)


export const User = model('user', userSchema)