const getConnection = require('./connection');
const consume = require('./consume')
const chalk = require('chalk');

const init = async () => {
  const conn = await getConnection()
  setInterval(async () => {
    const msg = await consume(conn)
    console.log('msg', chalk.green(msg))
  }, 8000);
}

init()