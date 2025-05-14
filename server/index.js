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
    const tipo = req.body.tipo;
    
    db.query(
        'INSERT INTO ingresos(concepto,cantidad,tipo) VALUES(?,?,?)',
        [concepto,cantidad, tipo],
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
    const tipo = req.body.tipo;

    db.query(
        'UPDATE ingresos SET concepto = ?, cantidad = ?, tipo = ? WHERE idIngreso = ?',
        [concepto, cantidad, tipo, idIngreso],
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

app.put('/updateDeuda/:idDeuda', async (req, res) => {
    const { idDeuda } = req.params;
    const { nuevoLimiteSaldo } = req.body;
  
    if (!idDeuda || nuevoLimiteSaldo === undefined) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }
  
    try {
      if (nuevoLimiteSaldo <= 0) {
        // Eliminar la deuda si el saldo llega a 0 o menos
        const deleteQuery = 'DELETE FROM deudas WHERE idDeuda = ?';
        const [deleteResult] = await db.query(deleteQuery, [idDeuda]);
  
        if (deleteResult.affectedRows > 0) {
          return res.status(200).json({ message: 'Deuda eliminada automáticamente' });
        } else {
          return res.status(404).json({ error: 'No se encontró la deuda para eliminar' });
        }
      } else {
        // Actualizar la deuda con el nuevo saldo
        const updateQuery = 'UPDATE deudas SET limiteSaldo = ? WHERE idDeuda = ?';
        const [updateResult] = await db.query(updateQuery, [nuevoLimiteSaldo, idDeuda]); //Esta es la linea 229
        console.log('Resultado de la consulta:', updateResult);
  
        if (updateResult.affectedRows > 0) {
          return res.status(200).json({ message: 'Deuda actualizada correctamente' });
        } else {
          return res.status(404).json({ error: 'No se encontró la deuda para actualizar' });
        }
      }
    } catch (error) {
      console.error('Error en /updateDeuda:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
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

app.put('/updateTarjeta/:idTarjeta', async (req, res) => {
    const { idTarjeta } = req.params;
    const { nuevoLimiteSaldo } = req.body;
  
    if (!idTarjeta || nuevoLimiteSaldo === undefined) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }
  
    try {
      if (nuevoLimiteSaldo <= 0) {
        // Eliminar la deuda si el saldo llega a 0 o menos
        const deleteQuery = 'DELETE FROM tarjetas WHERE idTarjeta = ?';
        const [deleteResult] = await db.query(deleteQuery, [idTarjeta]);
  
        if (deleteResult.affectedRows > 0) {
          return res.status(200).json({ message: 'Tarjeta eliminada automáticamente' });
        } else {
          return res.status(404).json({ error: 'No se encontró la tarjeta para eliminar' });
        }
      } else {
        // Actualizar la deuda con el nuevo saldo
        const updateQuery = 'UPDATE tarjetas SET limiteCredito = ? WHERE idTarjeta = ?';
        const [updateResult] = await db.query(updateQuery, [nuevoLimiteSaldo, idTarjeta]);
        console.log('Resultado de la consulta:', updateResult);
  
        if (updateResult.affectedRows > 0) {
          return res.status(200).json({ message: 'Tarjeta actualizada correctamente' });
        } else {
          return res.status(404).json({ error: 'No se encontró la tarjeta para actualizar' });
        }
      }
    } catch (error) {
      console.error('Error en /updateTarjeta:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
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

//Ahorro
app.post("/createAhorro", (req, res) => {
    const concepto = req.body.concepto;
    const totalRequerido = req.body.totalRequerido;
    const totalAbonado = req.body.totalAbonado;

    db.query(
        'INSERT INTO Ahorros (concepto, totalRequerido, totalAbonado) VALUES (?, ?, ?)',
        [concepto, totalRequerido, totalAbonado],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al crear el ahorro");
                return;
            }
            res.status(201).send("Ahorro creado exitosamente");
        }
    );
});

app.get("/ahorros", (req, res) => {
    db.query('SELECT * FROM Ahorros', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los ahorros");
            return;
        }
        res.send(result);
    });
});

app.put("/updateAhorro", (req, res) => {
    const idAhorro = req.body.idAhorro;
    const concepto = req.body.concepto;
    const totalRequerido = req.body.totalRequerido;
    const totalAbonado = req.body.totalAbonado;

    db.query(
        'UPDATE Ahorros SET concepto=?, totalRequerido=?, totalAbonado=? WHERE idAhorro=?',
        [concepto, totalRequerido, totalAbonado, idAhorro],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el ahorro");
                return;
            }
            res.send("Ahorro actualizado exitosamente");
        }
    );
});

app.put('/updateAhorro/:idAhorro', async (req, res) => {
    const { idAhorro } = req.params;
    const { nuevoTotalRequerido } = req.body;

    if (!idAhorro || nuevoTotalRequerido === undefined) {
        return res.status(400).json({ error: 'Datos insuficientes en la solicitud' });
    }

    try {
        const query = 'UPDATE ahorros SET totalRequerido = ? WHERE idAhorro = ?';
        const [result] = await db.query(query, [nuevoTotalRequerido, idAhorro]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Ahorro actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'No se encontró el registro de ahorro' });
        }
    } catch (error) {
        console.error('Error en /updateAhorro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete("/deleteAhorro/:idAhorro", (req, res) => {
    const idAhorro = req.params.idAhorro;

    db.query('DELETE FROM Ahorros WHERE idAhorro=?', [idAhorro], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el ahorro");
            return;
        }
        res.send("Ahorro eliminado exitosamente");
    });
});


//Confirmacion de conexion
app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})