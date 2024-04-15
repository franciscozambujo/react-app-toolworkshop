import connection from './database';

export const query = (sql: string, args?: any[]) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};