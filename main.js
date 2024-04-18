const submitBtn = document.getElementById('submit')
const messages = document.getElementById('messages')
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let username = document.getElementById('username').value
    if(username == ""){
        console.log("Wrong username")
        return
    }  
    fetch('/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username: username})
    }).then(async (res) => {
        const response = await res.json()
        messages.innerHTML += (response?.message)
    }).catch(err => console.log(err))
})