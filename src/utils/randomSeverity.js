const randomSeverity = () => {
  const severityList = ['error', 'info', 'warning', 'debug']
  const idx = Math.floor(Math.random() * severityList.length)
  return severityList[idx]
}

module.exports = randomSeverity