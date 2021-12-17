function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    processText(formText);
}

function processText(formText) {
    fetch('http://localhost:8080/userData', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formText: formText })
    })
    .then(res => res.json())
    .then(function(res) {
        let result = document.getElementById('result');
        Client.updateResult (result, res);
    })
}

export { handleSubmit };
export { processText };
