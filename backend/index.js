const express = require("express")
const app = express()

app.get("/" , (req , res) =>{
    res.send("Backedn is working with Nodemon!")
})

app.listen(5000, ()=>{
    console.log("server is running on port 5000.")
})