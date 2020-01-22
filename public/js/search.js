let searchItem = document.querySelector('.searchItem')
let searchItemAndType = document.querySelector('.searchItemAndType')
let searchItemAndName = document.querySelector('.searchItemAndName')
let table = document.querySelector('.catalogTable')
let tr = table.getElementsByTagName('tr')

if (searchItemAndName) {
  searchItemAndName.addEventListener('keyup', () => {
    let filter = searchItemAndName.value.toUpperCase()
    Array.from(tr).forEach(tr => {
      let td1 = tr.getElementsByTagName('td')[0]
      let td2 = tr.getElementsByTagName('td')[4]
      if (td1) {
        let txtValue1 = td1.textContent || td1.innerText
        let txtValue2 = td2.textContent || td2.innerText
        if (
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1
        ) {
          tr.style.display = ''
        } else {
          tr.style.display = 'none'
        }
      }
    })
  })
}

if (searchItem) {
  searchItem.addEventListener('keyup', () => {
    let filter = searchItem.value.toUpperCase()
    Array.from(tr).forEach(tr => {
      let td = tr.getElementsByTagName('td')[0]
      if (td) {
        let txtValue = td.textContent || td.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = ''
        } else {
          tr.style.display = 'none'
        }
      }
    })
  })
}

if (searchItemAndType) {
  searchItemAndType.addEventListener('keyup', () => {
    let filter = searchItemAndType.value.toUpperCase()
    Array.from(tr).forEach(tr => {
      let td1 = tr.getElementsByTagName('td')[0]
      let td2 = tr.getElementsByTagName('td')[1]
      if (td1) {
        let txtValue1 = td1.textContent || td1.innerText
        let txtValue2 = td2.textContent || td2.innerText
        if (
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1
        ) {
          tr.style.display = ''
        } else {
          tr.style.display = 'none'
        }
      }
    })
  })
}
