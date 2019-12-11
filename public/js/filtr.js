const toggleFilter = () => {
    const btn = document.querySelector("#filterBtn")
    const submitBtn = document.querySelector("#submit")
    const filterTab = document.querySelector(".filter_row")

    btn.addEventListener("click", () => {
        if (filterTab.style.opacity == "1") {
            filterTab.style.opacity = "0"
            filterTab.style.height = "0px"
            filterTab.style.padding = "0px"
            submitBtn.style.pointerEvents = "none"
        } else {
            filterTab.style.opacity = "1"
            filterTab.style.height = "80px"
            filterTab.style.padding = "10px"
            submitBtn.style.pointerEvents = "auto"
        }
    })
}
toggleFilter()

