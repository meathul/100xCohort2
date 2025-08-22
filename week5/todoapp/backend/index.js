const { createTodo } = require("./types");
const{updateTodo} = require("./types");
const { todo }= require("./db");
const express= require(express);
const bodyparser= require(bodyparser);
const app = express();
const PORT=3000;
app.use(express.json());
app.post("/todo",async function(req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"Input is Invalid",
        })
        return
    }
    await todo.create({
        title: createPayload.title,
        description : createPayload.description,
        completed: false
    })
    res.json({
        msg:"Todo Created"
    })
})
app.get("/todos",async function(req,res){
    const todos= await todo.find({});
    res.json({
        todos
    })

})

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



