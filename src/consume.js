const chalk = require('chalk');

// Consumer
const consume = async (connection, queueName = 'tasks') => {
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    // by default doesn't look at the number of unacknowledged messages for a consumer. 
    // It just blindly dispatches every n-th message to the n-th consumer.
    // channel.prefetch(1) tells RabbitMQ not to give more than one message to a worker at a time. 
    // Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one. 
    // Instead, it will dispatch it to the next worker that is not still busy.
    channel.prefetch(1)
    const message = await channel.get(queueName)
    if (message) {
      channel.ack(message)
      return message.content.toString()
    }
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

module.exports = consume