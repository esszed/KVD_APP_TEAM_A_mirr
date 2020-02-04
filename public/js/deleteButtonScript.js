const deleteButtons = document.querySelectorAll('.delete')

// deleteButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const amount = prompt('Kolik kusů smazat?')
//     if (amount != null) {
//       if (event.srcElement.name === '') {
//         event.srcElement.name = 'none'
//       }
//       if (event.srcElement.value === '') {
//         event.srcElement.value = 'none'
//       }

//       fetch(
//         `/deleteitems/${event.srcElement.name}/${event.srcElement.value}/${amount}`,
//         { method: 'POST' }
//       )
//         .then(response => {
//           if (response.ok) {
//             window.location.href = '/crud'
//           }
//           throw new Error('Request failed.')
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     }
//   })
// })

const hiddenInputBrand = document.querySelector('.hiddenInputBrand')
const hiddenInputName = document.querySelector('.hiddenInputName')
deleteButtons.forEach(button => {
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

const changeButtons = document.querySelectorAll('.change')
const hiddenInput = document.querySelector('.hiddenInput')
const submitButton = document.querySelector('.sendChangeForm')
changeButtons.forEach(button => {
  button.addEventListener('click', () => {
    hiddenInput.value = button.name
    submitButton.value = button.value
  })
})

const requiredInputs = document.querySelectorAll('.required')
const addButton = document.querySelector('.addButton')
console.log(requiredInputs[0].value)
addButton.addEventListener('click', () => {
  if (requiredInputs[0].value == '' && requiredInputs[1].value == '') {
    // requiredInputs.forEach(input => {
    //   input.required = true
    // })
    alert('Značka nebo název musí být vyplněné')
  }
})
