const chalk = require('chalk');
const wait = require('./utils/wait')

// Consumer
const consumeViaTempQueue = async (connection) => {
  if (!connection) throw new Error('connection not found')
  const exchangeName = 'logs';
  try {
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, 'fanout', {
      durable: false
    });
    // use nameless queue, rabbitmq will generate a random queue name for you
    const q = await channel.assertQueue('', { exclusive: true })
    console.log('q', chalk.yellow(JSON.stringify(q)))
    // Now we need to tell the exchange to send messages to our queue. 
    // That relationship between exchange and a queue is called a binding.
    await channel.bindQueue(q.queue, exchangeName, '');

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

module.exports = consumeViaTempQueue