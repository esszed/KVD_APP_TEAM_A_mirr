if (document.getElementById('filter_row') !== null) {
  document.getElementById('filter_row').style.display = 'none'

  const toggleFilter = () => {
    const btn = document.querySelector('#filterBtn')
    const submitBtn = document.querySelector('#submit')
    const filterTab = document.querySelector('.filter_row')

    btn.addEventListener('click', () => {
      if (filterTab.style.display == 'none') {
        filterTab.style.display = 'block'
        submitBtn.style.pointerEvents = 'auto'
      } else {
        filterTab.style.display = 'none'
        submitBtn.style.pointerEvents = 'none'
      }
    })
  }

  toggleFilter()
}
