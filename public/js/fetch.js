const url = "http://localhost:3000"
const user = {}

fetch(url, {
    method: "Get",
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
})