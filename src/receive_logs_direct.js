#!/usr/bin/env node

const getConnection = require('./connection');
const consumeViaQueueWithRoutingKey = require('./queueWithRoutingKey')
const chalk = require('chalk');

const routingKeys = process.argv.slice(2)

const init = async () => {
  const conn = await getConnection()
  setInterval(async () => {
    const msg = await consumeViaQueueWithRoutingKey(conn, routingKeys)
    console.log('msg', chalk.green(msg))
  }, 1000);
}

init()