// Consumer
const consume = async (connection, queueName = 'tasks') => {
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)
    const message = await channel.get(queueName)
    if (message) {
      channel.ack(message)
      return message.content.toString()
    }
  } catch (error) {
    console.warn(error)
  }
}

module.exports = consume