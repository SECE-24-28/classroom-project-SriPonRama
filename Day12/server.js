const app=require("express")();

const port=3000;

app.get("/",(req,res)=>{
    res.send("Run BTS!");
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});