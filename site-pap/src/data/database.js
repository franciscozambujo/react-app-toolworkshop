import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'db_oficina'
}).promise();

export async function getEmployees(){
  const [rows] = await pool.query("SELECT * FROM empregados");
  return rows;
}

const employees = await getEmployees();
console.log(employees);

