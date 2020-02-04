const borrowButtons = document.querySelectorAll('.borrow')
const hiddenInputBrand = document.querySelector('.hiddenInputBrand')
const hiddenInputName = document.querySelector('.hiddenInputName')
borrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.name === '') {
      button.name === 'none'
    }
    if (button.value === '') {
      button.value = 'none'
    }
    hiddenInputName.value = button.name
    hiddenInputBrand.value = button.value
  })
})

/* const borrowButtons = document.querySelectorAll('.borrow')
borrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const amount = prompt('Kolik kusů zapůjčit?')
    if (amount != null) {
      if (event.srcElement.name === '') {
        event.srcElement.name = 'none'
      }
      if (event.srcElement.value === '') {
        event.srcElement.value = 'none'
      }
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
 */
