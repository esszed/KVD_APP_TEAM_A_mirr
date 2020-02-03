(() => {
    const newPass = document.querySelector("#newPass")
    const newPassAgain = document.querySelector("#newPassAgain")
    const subBtn = document.querySelector(".submitBtn")
    const passHelp = document.querySelector("#passHelp")

    newPassAgain.addEventListener("keyup", () => {
        if (newPass.value === newPassAgain.value) {
            subBtn.disabled = false
            passHelp.textContent = ""
        }
        else {
            subBtn.disabled = true
            passHelp.textContent = "Hesla se musejí shodovat!"
        }
    })
})();


