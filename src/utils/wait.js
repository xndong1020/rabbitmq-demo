const wait = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Waited for ${sec} seconds...`)
      resolve()
    }, sec)
  })
}

module.exports = wait