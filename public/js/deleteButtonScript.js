const borrowButtons = document.querySelectorAll('.delete')
borrowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const amount = prompt('Kolik smazat')
    if (amount != null) {
      fetch(
        `/deleteitems/${event.srcElement.name}/${event.srcElement.value}/${amount}`,
        { method: 'POST' }
      )
        .then(response => {
          if (response.ok) {
            window.location.href = '/crud'
          }
          throw new Error('Request failed.')
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
})
