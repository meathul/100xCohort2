const { createTodo } = require("./types");
const { updateTodo } = require("./types");
const cors =  require("cors")
const zod = require("zod");
const { todo } = require("./db");
const express = require("express");
const app = express();
const PORT=3000;
app.use(express.json());
app.use(cors()); 
app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "Input is Invalid",
        });
        return;
    }
    
    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo Created"
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
            msg: "Error creating todo",
            error: error.message
        });
    }
});
app.get("/todos", async function(req, res) {
    try {
        const todos = await todo.find({});
        res.json({
            todos
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            msg: "Error fetching todos",
            error: error.message
        });
    }
});

app.put("/completed",async function(req,res){
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"Input is Invalid",
        })
        return
    }
    await todo.update({
        _id:req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"todo marked as completed"
    })
})
app.listen(PORT,()=>{
    console.log("SERVER RUNNING");
});



