#!/usr/bin/env node

const getConnection = require('./connection');
const consumeViaTempQueue = require('./tempraryQueue')
const chalk = require('chalk');

const init = async () => {
  const conn = await getConnection()
  setInterval(async () => {
    const msg = await consumeViaTempQueue(conn)
    console.log('msg', chalk.green(msg))
  }, 1000);
}

init()