const chalk = require('chalk');

// Publisher
const publish = async (connection, message, queueName = 'tasks') => {
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    console.log('publishing params', chalk.green(message), chalk.green(queueName))
    const result = await channel.sendToQueue(queueName, Buffer.from(message), { persistent: true })
    console.log('publishing result', chalk.green(result))
    return result
  } catch (error) {
    console.warn(chalk.red(error))
  }
}


module.exports = publish