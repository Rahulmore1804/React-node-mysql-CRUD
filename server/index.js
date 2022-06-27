const exp = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = exp()
app.use(cors())
app.use(exp.json())
const DB = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "Sincostan9@",
    port:3306,
    database: "react-node-mysql"
})

app.post("/a",function(req,res){
    console.log("ss")
    const name = req.body.name
    const number = req.body.number
    const age = req.body.age
    console.log(name)
    var sql = "INSERT INTO t1 (name, number,age) VALUES (?, ?,?)"
  
    DB.query(sql, [name,number,age], function (err, result) {  
        if (err) throw err;
        console.log("done");
}); 
})


app.get("/b",function(req,res){
    var sql = "SELECT * FROM t1"
  
    DB.query(sql,  function (err, result) {  
        if (err) throw err;
        res.send(result)
}); 

})


app.put("/update", (req, res) => {
    const id_T1 = req.body.id_T1;
    const age = req.body.age;
    DB.query(
      "UPDATE t1 SET age = ? WHERE id_T1 = ?",
      [age, id_T1],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    DB.query("DELETE FROM t1 WHERE id_T1 = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  

app.listen(3001,function(){
    console.log("started")
})


