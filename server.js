const express = require("express");
const app     = express();
const cors    = require("cors");
app.use(express.json())
app.use(cors())

// Mysql Connection
const mysql  = require("mysql");
const mydatabase = mysql.createConnection({
    host   :   'localhost',
    user   :    'root',
    password :  '',
    database : 'lms'
});
mydatabase.connect();

// Employee Login
app.post("/login", function(req,res){
    var email   = req.body.email;
    var password = req.body.password;
    var sql = "select * from employee where email='"+email+"' and password='"+password+"'";
    mydatabase.query(sql, function(error, rows, fields){
      
        if(error) throw error
        if(rows.length > 0){
            res.send(rows);
            res.end();
        } else{
            res.send({"id":""});
            res.end();
        }
    })
});

app.post("/loginattendance", function(req,res){
    var empid = req.body.empid;
    var time  = req.body.time
    var sql="insert into attendance(employee , login) values('"+empid+"', '"+time+"')";
    mydatabase.query(sql, function(error, rows, fields){
        if(error) throw error
        res.send("Attendance Submitted.. !");
        res.end();
    })
});

app.post("/employeeinfo", function(req,res){
    var empid   = req.body.empid;
    var name    = req.body.ename;
    var mobile  = req.body.emobile;
    var cardid  = req.body.ecardid;
    var age     = req.body.eage;
    var pemail  = req.body.eemail;
    var sql="insert into employeeinfo(employee, name, mobile, cardid, age, pemail)values('"+empid+"', '"+name+"', '"+mobile+"', '"+cardid+"', '"+age+"', '"+pemail+"')";
    mydatabase.query(sql, function(error, rows,fields){
        if(error) throw error
        res.send("Employee info updated successfully..!")
        res.end();
    })
})

app.post("/fetchemployeeinfo", function(req,res){
    var empid  = req.body.empid
    var sql = "select * from employeeinfo where employee='"+empid+"' order by id desc";
    mydatabase.query(sql, function(error, rows,fields){
        if(error) throw error
        res.send(rows);
        res.end();
    })
})

app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})