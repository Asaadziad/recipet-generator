const submitBtn = document.getElementById('submit')
const messages = document.getElementById('messages')

const sendData = async (values) => {
    try {
        const res = await fetch('/add', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
        })
        const msg = await res.json()
        return msg
    } catch(error) {
       messages.innerHTML = "Error: Couldn't send data, try again."
       console.log(error) 
    }
}


submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    let username = document.getElementById('workername').value
    let site = document.getElementById('site').value
    let workhours = document.getElementById('workhours').value
    if(username == "" || site == "" || workhours == ""){
        messages.innerHTML += "All fields are required username"
        return
    }  
   const response = await sendData({
    username: username,
    workhours: workhours,
    site: site
   })
   messages.innerHTML = response.message
})