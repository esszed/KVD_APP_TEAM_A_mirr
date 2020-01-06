const countArrayofObjects = arrayOfObjects => {
  const resultArray = []
  arrayOfObjects.map(item => {
    if (
      resultArray.find(object => {
        if (
          object.brand === item.brand &&
          object.name === item.name &&
          object.type === item.type &&
          object.state === item.state
        ) {
          object.times++
          return true
        } else {
          return false
        }
      })
    ) {
    } else {
      item.times = 1
      resultArray.push(item)
    }
  })
  return resultArray
}

module.exports = {
  countArrayofObjects: countArrayofObjects
}