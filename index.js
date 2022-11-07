const express = require("express");
const app = express();


const con = require("./connection");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}))

app.set("view engine" , "ejs");


app.get("/" , (req, res)=>{
    res.sendFile(__dirname +  "/index.html")
})

app.post("/" ,(req,res)=>{
    const name = req.body.name;
    const date = req.body.date;
    const country = req.body.country;
    const resume = req.body.resume;


    con.connect((error)=>{
        // if(error) throw error;

        // const sql = "INSERT INTO students(name , email , phone) VALUES('"+name+"' , '"+email+"' ,'"+phone+"')";
        const sql = "INSERT INTO addictive(name , date , country , resume) VALUES('"+name+"' , '"+date+"' ,'"+country+"' ,'"+resume+"')";

        con.query(sql , (error , result)=>{
            if(error) throw error;

            res.redirect("/");
        })
    })
}) 


app.post("/" ,(req,res)=>{
    
}) 

app.get("/submissions" , (req , res)=>{
    con.connect((error)=>{
        if(error) console.log(error);

        const sql = "select * from addictive";

        con.query(sql , (error , result)=>{
            if(error) console.log(error);
            console.log(result);

            res.render(__dirname + "/submissions" , {addictive:result})
        })
    })
})

app.get("/delete-submission" , (req,res)=>{
    con.connect((error)=>{
        if(error) console.log(error);

        const sql = "delete from addictive where sno=?";
        
        
        var sno = req.query.sno;

        con.query(sql ,[sno] ,  (error , result)=>{
            if(error) console.log(error);
            // console.log(result);
            // ALTER TABLE addictive AUTO_INCREMENT=1;
            

            res.redirect( "/submissions" )
        })
    })
});

app.get("/resume" , (req,res)=>{
    con.connect((error)=>{
        if(error) console.log(error);

        const sql = "select * from addictive where sno=?";
        
        var sno = req.query.sno;

        con.query(sql ,[sno] ,  (error , result)=>{
            if(error) console.log(error);
            console.log(result);

            res.redirect( "/resume" )
            // res.render(__dirname + "/resume" , {addictive:result})
        })
    })
});



app.listen(7000);