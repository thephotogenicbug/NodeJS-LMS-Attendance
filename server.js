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



app.post("/attendance", function(req , res){
    var empid           = req.body.empid;
    var name            = req.body.ename;
    var contact         = req.body.econtact;
    var cardid          = req.body.ecardid;
    var date            = req.body.edate;
    var time            = req.body.etime;
    var logouttime      = req.body.elogout;
    var sql = "insert into attendance(employee, name, contact, cardid, logindate, logintime, logout) values('"+empid+"', '"+name+"', '"+contact+"', '"+cardid+"', '"+date+"', '"+time+"', '"+logouttime+"')";
    mydatabase.query(sql, function(error, rows, fields){
        if(error) throw error
        res.send("Attendance Submitted Successfully...!")
        res.end()
    })

})

// app.post("/logoutattendance", function(req, res){
//     var empid = req.body.empid;
//     var time = req.body.etime;
//     var sql = "update attendance set logout='"+time+"' where employee='"+empid+"' ";
//     mydatabase.query(sql, function(error, rows, fields){
//         if(error) throw error
//         res.send("Logout Submitted successfully... !")
//         res.end();
//     })

// })

app.post("/lunchbreakin", function(req, res){
    var empid           = req.body.empid;
    var name            = req.body.ename;
    var contact         = req.body.econtact;
    var cardid          = req.body.ecardid;
    var date            = req.body.edate;
    var time            = req.body.etime;
    var time            = req.body.etime;
    var lunchbreakout = req.body.elunchbreakout;
    var sql = "insert into lunchbreak(employee, name, contact, cardid, lunchdate, lunchbreakin, lunchbreakout) values('"+empid+"', '"+name+"', '"+contact+"', '"+cardid+"', '"+date+"', '"+time+"', '"+lunchbreakout+"')";
    mydatabase.query(sql, function(error, rows, fields){
        if(error) throw error
        res.send("Lunch Break in Submitted successfully... !")
        res.end();
    })

})
// app.post("/lunchbreakout", function(req, res){
//     var empid = req.body.empid;
//     var time = req.body.etime;
//     var sql = "update attendance set lunchbreakout='"+time+"' where employee='"+empid+"' ";
//     mydatabase.query(sql, function(error, rows, fields){
//         if(error) throw error
//         res.send("Lunch Break in Submitted successfully... !")
//         res.end();
//     })

// })


app.post("/employeeinfo", function(req,res){
    var empid            = req.body.empid;
    var name             = req.body.ename;
    var sex              = req.body.esex;
    var age              = req.body.eage;
    var contact          = req.body.econtact;
    var altcontact       = req.body.ealtcontact;
    var cardid           = req.body.ecardid;
    var offmail          = req.body.eoffmail;
    var permail          = req.body.epermail;
    var designation      = req.body.edesignation;
    var department       = req.body.edepartment;
    var date             = req.body.edate;
    var address          = req.body.eaddress;
    var sql = "insert into employeeinfo(employee, name, sex, age, contact, altcont, cardid, offmail, permail, designation, department, joiningdate, address) values('"+empid+"', '"+name+"', '"+sex+"', '"+age+"', '"+contact+"', '"+altcontact+"', '"+cardid+"', '"+offmail+"', '"+permail+"', '"+designation+"', '"+department+"', '"+date+"', '"+address+"')"
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

// app.get("/getinfo", function(req,res){
//     var sql = "select * from employeeinfo order by id desc";
//     mydatabase.query(sql, function(error, rows,fields){
//         if(error) throw error
//         res.send(rows);
//         res.end();
//     })
// })

app.post("/applyforleave", function(req, res){
    var empid  = req.body.empid;
    var name   = req.body.ename;
    var mobile = req.body.emobile;
    var cardid = req.body.ecardid;
    var from   = req.body.efrom;
    var to     = req.body.eto;
    var reason = req.body.ereason
    var sql = "insert into appliedforleave(employee, name, mobile, cardid, fromdate, todate, reason) values('"+empid+"', '"+name+"', '"+mobile+"', '"+cardid+"', '"+from+"', '"+to+"', '"+reason+"' )"
    mydatabase.query(sql, function(error , rows , fields){
        if(error) throw error
        res.send("Leave Requested submitted successfully")
        res.end();
    })
})

app.listen(5005, function(){
    console.log("Server is Running on port 5005")
})