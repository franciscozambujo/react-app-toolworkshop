import connection from './dbConnection';

const consultarEmpregados = async () => {
  try {
    const query = 'SELECT * FROM db_oficina.empregados;';
    const result = await connection.query(query);

    console.log('Consulta à tabela empregados:');
    console.table(result);

  } catch (error) {
    console.error('Erro na consulta:', error);
  } finally {
    connection.end();
  }
};

consultarEmpregados();
