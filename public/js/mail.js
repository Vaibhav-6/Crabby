let namee = document.getElementById("name")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
let date = document.getElementById("date")
let time = document.getElementById("time")
let loc = document.getElementById("timee")
let guestno = document.getElementById("number-guests")
let message = document.getElementById("message")
let submit = document.getElementById("form-submit")
submit.addEventListener('click',async ()=>{
    if(namee.value==''||email.value==''||phone.value==''||date.value==''||time.value==''|| loc.value==''){
        console.log('fill')
    }
    else{
        let body= encodeQuery({
            name:namee.value,
            email:email.value,
            phone:phone.value,
            date:date.value,
            time:time.value,
            loc:loc.value,
            guestno:guestno.value,
            message:message.value
        })
        function encodeQuery(data){
            let query = ""
            for (let d in data)
                 query += encodeURIComponent(d) + '=' 
                          + encodeURIComponent(data[d]) + '&'
            return query.slice(0, -1)
        }
        // console.log(`https://idyllic-sopapillas-de5e9c.netlify.app/post/?${body}`)
        const res = await fetch(`/post/?${body}`)
        const resData = await res.json()
        console.log(resData)
    }
})
