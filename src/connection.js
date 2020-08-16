const getConnection = async () => {
  const conn = await require('amqplib').connect('amqp://localhost');
  return conn;
}


module.exports = getConnection;