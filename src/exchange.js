const chalk = require('chalk');

// exchange
const publishViaExchange = async (connection, message) => {
  const exchangeName = 'logs';
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    // assertExchange(exchange, type, [options])
    // this will create a exchange of tyoe `fanout`
    await channel.assertExchange(exchangeName, 'fanout', {
      durable: false
    });
    console.log('publishing params', chalk.green(message))
    // The messages will be lost if no queue is bound to the exchange yet, but that's okay for us; 
    // if no consumer is listening yet we can safely discard the message.

    // #publish(exchange, routingKey, content, [options])
    const result = await channel.publish(exchangeName, '', Buffer.from(message))
    console.log(' [x] Sent %s', chalk.green(result)) // result will be true/false
    return result
  } catch (error) {
    console.warn(chalk.red(error))
  }
}


module.exports = publishViaExchange