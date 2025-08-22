 require('dotenv').config();
const mongoose= require(mongoose);
const todoSchema=mongoose.schema({
    title: String,
    description:String,
    completed : Boolean
})