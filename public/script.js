const borrowButtons = document.querySelectorAll('.borrow')
borrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const amount = prompt('Kolik zapůjčit')
    fetch(`/borrow/${event.srcElement.name}/${event.srcElement.value}/${amount}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          window.location.href = '/catalog' // not sure about this
          return
        }
        throw new Error('Request failed.')
      })
      .catch(error => {
        console.log(error)
      })
  })
})

const returnButtons = document.querySelectorAll('.return')
returnButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Hello')
    fetch(`/return/${event.srcElement.name}/${event.srcElement.value}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          window.location.href = '/mylibrary' // not sure about this
          return
        }
        throw new Error('Request failed.')
      })
      .catch(error => {
        console.log(error)
      })
  })
})
