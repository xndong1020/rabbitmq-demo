const wait = (sec) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Wating for ${sec} seconds...`)
      resolve
    }, sec)
  })
}

module.exports = wait