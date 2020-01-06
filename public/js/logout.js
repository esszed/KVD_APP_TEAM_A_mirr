const logoutBtn = document.querySelector('.logout')

logoutBtn.addEventListener('click', function () {
  fetch('http://localhost:3000/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  document.cookie =
    'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.replace('http://localhost:3000/')
})
