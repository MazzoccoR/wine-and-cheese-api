import mongoose, {Mongoose} from "mongoose";

const cheeseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stinkRating:{
        type:Number,
    },
    category:{
        type: String,
        required: true
    }
});
const Cheese = mongoose.model('Cheese', cheeseSchema);
export default Cheese;