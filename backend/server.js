import express from 'express'

const app = express();


app.get('/',(req,res)=>{
    res.send("hello ghost");
});

app.listen(4000,()=>{
    console.log("server is listening at port",4000);
})