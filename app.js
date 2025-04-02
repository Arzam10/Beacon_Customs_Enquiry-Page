require("dotenv").config();
const express=require ("express")
const router=require("./routes/route")
const cors = require("cors");
app.use(cors()); 

const path = require("path");
const mailrouter=require("./routes/mail")



const mongoose=require("mongoose")
const app=express()
const port=process.env.PORT || 9000

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB connected")
}).catch((err)=>console.error(err))
app.use(express.static('node_modules'));
app.use(express.static('public'));



app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("becon.ejs")
})
app.set("views", path.join(__dirname, "views", "pages"));

app.use(express.urlencoded({extended:false}))


app.use("/send",router)
app.use("/mail", mailrouter);


app.listen(port,()=>console.log("Server started at port 9000"))