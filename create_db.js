const sqlite3= require("sqlite3").verbose();
const db=new sqlite3.Database("my_db.db");

db.serialize(()=>{
    db.run(`
    CREATE TABLE IF NOT EXISTS ticket(
    id TEXT PRIMARY KEY,
    ingresso INTEGER,
    uscita INTEGER,
    prezzo INTEGER
    )
    
    `);
});