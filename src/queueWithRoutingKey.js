const chalk = require('chalk');
// const { v4: uuidv4 } = require('uuid');
const wait = require('./utils/wait')

// Consumer
const consumeViaQueueWithRoutingKey = async (connection, routingKeys) => {
  if (!connection) throw new Error('connection not found')
  const exchangeName = 'direct_logs';
  try {
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'direct', {
      durable: false
    });
    // use nameless queue, rabbitmq will generate a random queue name for you
    const q = await channel.assertQueue(`queue for ${routingKeys.join(',')}`, { exclusive: true })
    console.log('q', chalk.yellow(JSON.stringify(q)))

    // a queue can bind to multiple routing keys.
    for (routingKey of routingKeys) await channel.bindQueue(q.queue, exchangeName, routingKey);

    // wait one second to see message appended into the queue
    await wait(1000);

    const message = await channel.get(q.queue)
    /**
     * 
     *  {"fields":{"deliveryTag":1,"redelivered":false,"exchange":"logs","routingKey":"","messageCount":0},"properties":{"headers":{}},"content":{"type":"Buffer","data":[somme binary]}}
     * 
     */
    console.log('message', chalk.yellow(JSON.stringify(message)))
    if (message) {
      channel.ack(message)
      return message.content.toString()
    }
  } catch (error) {
    console.warn(chalk.red(error))
  }
}

module.exports = consumeViaQueueWithRoutingKey