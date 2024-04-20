const express= require("express");
const app = express();
const m=require("mongoose");
const bp=require("body-parser");
app.set('view engine','ejs')

app.use(bp.urlencoded({extended: true}));

m.connect("mongodb://localhost:27017/Tourism");
const st={

    monument:String,
    how_many:String,
    arrivals:String
}
const st1={

    email:String,
    password:String
    // arrivals:String
}
const st2={

    name:String
    // pass/'word:String
    // arrivals:String
}
const Student=m.model("data1", new m.Schema(st, { collection: "data1" }));
const Student1=m.model("login", new m.Schema(st1, { collection: "login" }));
const Student2=m.model("form", new m.Schema(st2, { collection: "form" }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/preview.html");
})
app.get("/queries.html",function(req,res){
    res.sendFile(__dirname+"/queries.html");
})
app.get("/store",function(req,res){
    Student.find({}).then(function(data){
        res.render("student",{
        datalist:data 
        })
    }).catch(function(err){
        console.log("there is an error");
    })
})
app.post("/storedata",function(req,res){
const newst=new Student({
    // monument:req.body.monumentte,
    monument:req.body.monument,
    how_many:req.body.how_many,
    arrivals:req.body.arrivals
});
newst.save();
// res.send("data is stored in the database");my 
res.redirect("/");

})
app.post("/form1",function(req,res){
const newst2=new Student2({
    // monument:req.body.monumentte,
    name:req.body.name
});
newst2.save();
// res.send("data is stored in the database");my 
res.redirect("/queries.html");

})
app.post("/storelogin",function(req,res){
const newst1=new Student1({
    // monument:req.body.monumentte,
    email:req.body.email,
    password:req.body.password,
    // arrivals:req.body.arrivals
});
newst1.save();
// res.send("data is stored in the database");my 
res.redirect("/");

})
app.listen(3010,function(){
    console.log("the server is running in the port 3000");
})