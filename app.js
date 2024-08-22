const API_KEY = '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';
const submitButton= document.querySelector("#submit");
const output = document.querySelector("#output");
const input = document.querySelector("input");
const history = document.querySelector(".history");
const button = document.querySelector("button");

function changeInput(value){
    const inputElement=document.querySelector('input');
    inputElement.value = '';
}

async function getmessage(){
    const options = {
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${API_KEY}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input.value}],
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json();
        console.log(data);
        output.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content){
            const pElement = document.createElement('p');
            pElement.textContent = input.value;
            pElement.addEventListener('click',() => changeInput(pElement.textContent))
            history.append(pElement);
        }
    } catch (error) {
         alert(error)
    }
}

submitButton.addEventListener('click',getmessage);

function clearInput(){
    input.value='';
}

button.addEventListener('click',clearInput);