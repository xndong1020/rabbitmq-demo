const getConnection = require('./connection');
const publish = require('./publish')
const consume = require('./consume')
const chalk = require('chalk');



const init = async () => {
  const conn = await getConnection();
  publish(conn, 'some magic message')
  const msg = await consume(conn)
  console.log('msg received', chalk.green(msg))
  process.exit(0)
}

init();
