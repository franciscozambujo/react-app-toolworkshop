import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db_oficina'
}).promise()

export async function getInvoices(){
    const [rows] = await pool.query("SELECT * FROM faturas")
    return rows
}

export async function getInvoiceByID(id){
    const [rows] = await pool.query("SELECT * FROM faturas WHERE id =?", [id])
    return rows
}