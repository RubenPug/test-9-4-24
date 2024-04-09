const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("my_db.db");
const express = require("express");
const app = express();
const port = 3333;
let usc;
let entri;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//andiamo a generare un biglietto
app.post('/ticket', (req, res) => {
    //generiamo l'id
    const id= Math.random().toString().replace("0."," ");
    console.log(id);
    //inseriamo l'orario di entrata
     entri=Date.now();
    console.log(entri);
    db.run(`INSERT INTO ticket (id,ingresso) VALUES (?,?)`, [id,entri], (error, rows) => {
        if(error){
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,

            "id": id
        }
        res.status(200).send(response);
    });
});




//andiamo a visualizzare l'orario di entrata d'uscita ed il prezzo
app.get('/ticket/:id', (req, res) => {
    db.all(`SELECT * FROM ticket WHERE id = (?)`, req.params.id, (error, rows) => {
        if(error){
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});

//andiamo ad aggiornare lo stato del biglietto
app.put('/ticket/:id', (req, res) => {
    usc=Date.now();
    console.log(usc);
    //calcoliamo il prezzo 
    const pr=((usc- entri)/1000/60)*0.01;
    db.run(`UPDATE ticket SET uscita = (?) ,prezzo =(?) WHERE id = (?)`,[usc,pr,req.params.id] , (error, rows) => {
        if(error){
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            
        }
        res.status(201).send(response);
    });
});
//andiamo ad eliminare il biglietto creato 
app.delete('/ticket/:id', (req, res) => {
    db.run(`DELETE FROM ticket WHERE id = (?)`, req.params.id, (error, rows) => {
        if(error){
            console.error(error.message);
            response = {
                "code": -1,
                "data": error.message
            }
            res.status(500).send(response);
        }
        response = {
            "code": 1,
            "data": rows
        }
        res.status(200).send(response);
    });
});










