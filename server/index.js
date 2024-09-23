const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"tesina"
});

//Ingresos
app.post("/create", (req, res) => {
    const concepto = req.body.concepto;
    const cantidad = req.body.cantidad;
    
    db.query('INSERT INTO ingresos(concepto,cantidad) VALUES(?,?)',[concepto,cantidad],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.get("/ingresos", (req, res) => {
    db.query('SELECT * FROM ingresos',
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.put("/update", (req, res) => {
    const idIngreso = req.body.idIngreso;
    const concepto = req.body.concepto;
    const cantidad = req.body.cantidad;

    db.query('UPDATE ingresos SET concepto=?,cantidad=? WHERE idIngreso=?',[concepto,cantidad,idIngreso],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.delete("/delete/:idIngreso", (req, res) => {
    const idIngreso = req.params.idIngreso;

    db.query('DELETE FROM ingresos WHERE idIngreso=?',[idIngreso],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }   
    }
    );
});


//Gastos
app.post("/createGas", (req, res) => {
    const concepto = req.body.concepto;
    const adeudo = req.body.adeudo;
    const prioridad = req.body.prioridad;
    const tipo = req.body.tipo;

    db.query('INSERT INTO gastos(concepto,adeudo,prioridad,tipo) VALUES(?,?,?,?)',[concepto,adeudo,prioridad,tipo],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.get("/gastos", (req, res) =>{ 
    db.query('SELECT * FROM gastos',
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.put("/updateGas", (req, res) => {
    const idGasto = req.body.idGasto;
    const concepto = req.body.concepto;
    const adeudo = req.body.adeudo;
    const prioridad = req.body.prioridad;
    const tipo = req.body.tipo;

    db.query('UPDATE gastos SET concepto=?,adeudo=?,prioridad=?,tipo=? WHERE idGasto=?',[concepto,adeudo,prioridad,tipo,idGasto],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
    }
    );
});

app.delete("/deleteGas/:idGasto", (req, res) => {
    const idGasto = req.params.idGasto;

    db.query('DELETE FROM gastos WHERE idGasto=?',[idGasto],
    (err,result)=>{
        if(err){
            console.log(err);
            return;
        }   
    }
    );
});

//Confirmacion de conexion
app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})