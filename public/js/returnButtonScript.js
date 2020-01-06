const returnButtons = document.querySelectorAll('.return')
returnButtons.forEach(button => {
  button.addEventListener('click', () => {
    fetch(`/return/${event.srcElement.name}/${event.srcElement.value}`, {
      method: 'POST'
    })
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
