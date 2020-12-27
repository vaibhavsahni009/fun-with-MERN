console.log('Client side js loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then(data=>{
//         console.log(data)
//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    message1.textContent='Loading'
    message2.textContent=''
    fetch(`./weather?city=${location}`).then((response)=>{
        response.json().then(data=>{
            if (data.error)return message1.textContent=data.error
            message1.textContent=data.city
            message2.textContent=data.forecast
        })
    })
    
})