const chalk = require('chalk');
const randomSeverity = require('./utils/randomSeverity')

// exchange
const publishViaExchangeWithRouting = async (connection, message) => {
  const exchangeName = 'direct_logs';
  // generate random routing key.`info`, `error`, `debug` or `warning`
  const severity = randomSeverity();
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    // assertExchange(exchange, type, [options])
    // this will create a exchange of tyoe `direct`
    await channel.assertExchange(exchangeName, 'direct', {
      durable: false
    });
    console.log('publishing params', chalk.green(message), chalk.yellow(severity))


    // #publish(exchange, routingKey, content, [options])
    // use severity 'error', 'info', 'warning' or 'debug' as routing key
    const result = await channel.publish(exchangeName, severity, Buffer.from(message))
    console.log(' [x] Sent %s', chalk.green(result)) // result will be true/false
    return result
  } catch (error) {
    console.warn(chalk.red(error))
  }
}


module.exports = publishViaExchangeWithRouting