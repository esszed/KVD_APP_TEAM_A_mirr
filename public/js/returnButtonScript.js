const returnButtons = document.querySelectorAll('.return')
const modalReturnButton = document.querySelector('.modalReturnButton')
returnButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (event.srcElement.name === '') {
      event.srcElement.name = 'none'
    }
    if (event.srcElement.value === '') {
      event.srcElement.value = 'none'
    }
    let originalEvent = event
    modalReturnButton.addEventListener('click', () => {
      fetch(
        `/return/${originalEvent.srcElement.name}/${originalEvent.srcElement.value}`,
        {
          method: 'POST'
        }
      )
        .then(response => {
          if (response.ok) {
            window.location.href = '/knihovna'
            return
          }
          throw new Error('Request failed.')
        })
        .catch(error => {
          console.log(error)
        })
    })
  })
})
