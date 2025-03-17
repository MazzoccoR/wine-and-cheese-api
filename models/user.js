import mongoose from 'mongoose';

//this model shoud ingerit from passport-local-mongoose, its a special model for user managment NOT a regular model
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 8
    },
    password: {
        type: String
        //No need for password
    }
});

//inherit from/extend passport local mongoose to get all properties and methode (e.g. register)
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export default User;