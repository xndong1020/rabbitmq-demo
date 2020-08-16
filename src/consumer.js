const getConnection = require('./connection');
const consume = require('./consume')

const init = async () => {
  const conn = await getConnection()
  setInterval(async () => {
    const msg = await consume(conn)
    console.log('msg', msg)
  }, 5000);
}

init()