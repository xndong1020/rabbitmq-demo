// Publisher
const publish = async (connection, message, queueName = 'tasks') => {
  if (!connection) throw new Error('connection not found')
  try {
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)
    console.log('publishing params', message, queueName)
    const result = await channel.sendToQueue(queueName, Buffer.from(message))
    console.log('publishing result', result)
    return result
  } catch (error) {
    console.warn(error)
  }
}


module.exports = publish