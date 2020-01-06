const borrowButtons = document.querySelectorAll('.borrow')
borrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const amount = prompt('Kolik zapůjčit')
    if (amount != null) {
      fetch(
        `/borrow/${event.srcElement.name}/${event.srcElement.value}/${amount}`,
        { method: 'POST' }
      )
        .then(response => {
          if (response.ok) {
            window.location.href = '/knihovna'
          }
          throw new Error('Request failed.')
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
})
