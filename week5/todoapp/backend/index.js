const express= require(express);
const bodyparser= require(bodyparser);
const app = express();
const PORT=3000;
app.use(express.json());
app.post("/todo",function(req,res){
//middleware
//input validation
//todo logic
})
app.get("/todos",function(req,res){
//middlware
//input validation
//get todos
})

app.put("/completed",function(req,res){
//middleware
//input validation
//todo logic
})
app.listen(PORT,()=>{
    console.log("SERVER RUNNING");
});



