require('dotenv').config();
const mongoose= require(mongoose);
mongoose.connect(connectionstring)
const todoSchema=mongoose.schema({
    title: String,
    description:String,
    completed : Boolean
})
const todo= mongoose.model("todos", todoSchema);
module.export={
    todo: todo
}