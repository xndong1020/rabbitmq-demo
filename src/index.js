const getConnection = require('./connection');
const publish = require('./publish')
const consume = require('./consume')



const init = async () => {
  const conn = await getConnection();
  publish(conn, 'some magic message')
  const msg = await consume(conn)
  console.log('msg received', msg)
  process.exit(0)
}

init();
