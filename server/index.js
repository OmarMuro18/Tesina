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
    
    db.query(
        'INSERT INTO ingresos(concepto,cantidad) VALUES(?,?)',
        [concepto,cantidad],
        (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al crear el ingreso");
                return;
            }
            res.status(201).send("Ingreso creado con exito");
        }
    );
});

app.get("/ingresos", (req, res) => {
    db.query('SELECT * FROM ingresos', (err,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Error al obtener los ingresos");
            return;
        }
        res.send(result)
    }
    );
});

app.put("/update", (req, res) => {
    const idIngreso = req.body.idIngreso;
    const concepto = req.body.concepto;
    const cantidad = req.body.cantidad;

    db.query(
        'UPDATE ingresos SET concepto=?,cantidad=? WHERE idIngreso=?',
        [concepto,cantidad,idIngreso],
        (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al actualizar el ingreso");
                return;
            }
            res.send("Ingreso axtualizado exitosamente");
        }
    );
});

app.delete("/delete/:idIngreso", (req, res) => {
    const idIngreso = req.params.idIngreso;

    db.query('DELETE FROM ingresos WHERE idIngreso=?',[idIngreso],
    (err,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Error al eliminar el ingreso");
            return;
        }
        res.send("Ingreso eliminado exitosamente");
    }
    );
});


//Gastos
app.post("/createGas", (req, res) => {
    const concepto = req.body.concepto;
    const adeudo = req.body.adeudo;
    const prioridad = req.body.prioridad;
    const tipo = req.body.tipo;

    db.query(
        'INSERT INTO gastos(concepto,adeudo,prioridad,tipo) VALUES(?,?,?,?)',
        [concepto,adeudo,prioridad,tipo],
        (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al crear el gasto");
                return;
            }
            res.status(201).send("Gasto creado de manera exitosa");
        }
    );
});

app.get("/gastos", (req, res) =>{ 
    db.query('SELECT * FROM gastos', (err,result) => {
        if(err){
            console.log(err);
            res.status(500).send("Error al obtener el gasto");
            return;
        }
        res.send(result);
    }
    );
});

app.put("/updateGas", (req, res) => {
    const idGasto = req.body.idGasto;
    const concepto = req.body.concepto;
    const adeudo = req.body.adeudo;
    const prioridad = req.body.prioridad;
    const tipo = req.body.tipo;

    db.query('UPDATE gastos SET concepto=?,adeudo=?,prioridad=?,tipo=? WHERE idGasto=?',
        [concepto,adeudo,prioridad,tipo,idGasto],
        (err,result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al actualizar el gasto");
                return;
            }
            res.send("Gasto actualizado exitosamente");
        }
    );
});

app.delete("/deleteGas/:idGasto", (req, res) => {
    const idGasto = req.params.idGasto;

    db.query('DELETE FROM gastos WHERE idGasto=?',[idGasto],
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Erro al eliminar el gasto");
            return;
        }
        res.send("Gasto eliminado exitosamente");
    }
    );
});

//Deduas
app.post("/createDeuda", (req, res) => {
    const concepto = req.body.concepto;
    const saldoActual = req.body.saldoActual;
    const limiteSaldo = req.body.limiteSaldo;
    const interes = req.body.interes;
    const fechaPago = req.body.fechaPago;
    
    db.query(
        'INSERT INTO deudas(concepto, saldoActual, limiteSaldo, interes, fechaPago) VALUES(?,?,?,?,?)',
        [concepto, saldoActual, limiteSaldo, interes, fechaPago],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al crear la deuda");
                return;
            }
            res.status(201).send("Deuda creada exitosamente");
        }
    );
});

app.get("/deudas", (req, res) => {
    db.query('SELECT * FROM deudas', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las deudas");
            return;
        }
        res.send(result);
    });
});

app.put("/updateDeuda", (req, res) => {
    const idDeuda = req.body.idDeuda;
    const concepto = req.body.concepto;
    const saldoActual = req.body.saldoActual;
    const limiteSaldo = req.body.limiteSaldo;
    const interes = req.body.interes;
    const fechaPago = req.body.fechaPago;

    db.query(
        'UPDATE deudas SET concepto=?, saldoActual=?, limiteSaldo=?, interes=?, fechaPago=? WHERE idDeuda=?',
        [concepto, saldoActual, limiteSaldo, interes, fechaPago, idDeuda],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar la deuda");
                return;
            }
            res.send("Deuda actualizada exitosamente");
        }
    );
});

app.delete("/deleteDeuda/:idDeuda", (req, res) => {
    const idDeuda = req.params.idDeuda;

    db.query('DELETE FROM deudas WHERE idDeuda=?', [idDeuda], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar la deuda");
            return;
        }
        res.send("Deuda eliminada exitosamente");
    });
});

//Tarjetas Credito
app.post('/createTarjeta', (req, res) => {
    const { entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago } = req.body;
    const query = 'INSERT INTO Tarjetas (entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        res.send("Tarjeta creada exitosamente");
    });
  });

app.get("/tarjetas", (req, res) => {
    db.query('SELECT * FROM Tarjetas', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener las tarjetas de crédito");
            return;
        }
        res.send(result);
    });
});

app.put('/updateTarjeta', (req, res) => {
    const { idTarjeta, entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago } = req.body;

    db.query(
        'UPDATE Tarjetas SET entidadBancaria = ?, numeroTarjeta = ?, limiteCredito = ?, saldoActual = ?, tasaInteres = ?, fechaCorte = ?, fechaPago = ? WHERE idTarjeta = ?', 
        [entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago, idTarjeta], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
                return;
            }
            res.send("Tarjeta actualizada exitosamente");
        }
    );
});

app.delete('/deleteTarjeta/:idTarjeta', (req, res) => {
    const { idTarjeta } = req.params;
    const query = 'DELETE FROM Tarjetas WHERE idTarjeta = ?';
    db.query(query, [idTarjeta], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        } 
        res.send("Tarjeta eliminada exitosamente");
    });
  });

//Confirmacion de conexion
app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})