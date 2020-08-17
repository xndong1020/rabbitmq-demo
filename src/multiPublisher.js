const getConnection = require('./connection');
const publish = require('./publish');

const init = async () => {
  const conn = await getConnection()
  let counter = 0
  // allow some time for message to be saved into queue
  setInterval(async () => {
    counter += 1
    await publish(conn, `Counter number is ${counter}`)
  }, 1000)
}

init()