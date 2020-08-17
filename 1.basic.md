#### to run rabbitmq locally (with management console)

```
docker run -d --hostname my-rabbit --name some-rabbit -p 80:15672 -p 5672:5672 rabbitmq:3.8-management

```

connection 

```js
const getConnection = async () => {
  const conn = await require('amqplib').connect('amqp://localhost');
  return conn;
}


module.exports = getConnection;
```

publish function

```js
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
```

and a publisher function which will take message from command line

```js
const getConnection = require('./connection');
const publish = require('./publish');

const init = async () => {
  const msg = process.argv[2]
  console.log('msg', msg)
  const conn = await getConnection()
  await publish(conn, msg)
  // allow some time for message to be saved into queue
  setTimeout(() => {
    process.exit(0)
  }, 1000)
}

init()
```

comsume function

```js
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
```

and a consumer which will continously be listening

consumer.js

```js
const getConnection = require('./connection');
const consume = require('./consume')

const init = async () => {
  const conn = await getConnection()
  setInterval(async () => {
    const msg = await consume(conn)
    console.log('msg', msg)
  }, 5000);
}

init()
```