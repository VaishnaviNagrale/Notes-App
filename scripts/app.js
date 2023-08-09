async function postData(url = '',data = {}){
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }) 
}

const user = JSON.parse(localStorage.getItem('user'))
// if (!user &&  !user.token) {
//     window.location = '/login'
// }
const notes = postData('getnotes',{token: user.token})

notes.then(()=>{
    console.log('Notes')
})

//click listener for submit
let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    let title = document.getElementById('title').value
    let desc = document.getElementById('desc').value
    console.log('submitting data',title,desc)
})