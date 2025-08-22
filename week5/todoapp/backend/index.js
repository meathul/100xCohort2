const { createTodo } = require("./types");
const{updateTodo} = require("./types")
const express= require(express);
const bodyparser= require(bodyparser);
const app = express();
const PORT=3000;
app.use(express.json());
app.post("/todo",function(req,res){
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"Input is Invalid",
        })
        return
    }
    //put in mongodb
})
app.get("/todos",function(req,res){

})

app.put("/completed",function(req,res){
    const updatePayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"Input is Invalid",
        })
        return
    }
})
app.listen(PORT,()=>{
    console.log("SERVER RUNNING");
});



