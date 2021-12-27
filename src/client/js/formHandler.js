const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key='
 const key =  '5f2feb96836600d45fc293c3c98c36c0';

 const getTextInfo = async(baseUrl, key) => {
    const searchUrl = document.getElementById('name').value;
    console.log ('!');
    const response = await fetch(`${baseUrl}${key}&url=${searchUrl}&lang=en`);
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return(data);
    } catch (error) {
        console.log("error", error);
    }
}


function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    getTextInfo(baseUrl, key)
    .then(function(newData){
        console.log(newData);
        processText("/postData", {agreement: newData.agreement, confidence: newData.confidence, score: newData.score_tag})
        .then(updateUI());
    })
    
}

const processText = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const req = await fetch('/all');
    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp+'C';
        document.getElementById('content').innerHTML = allData.feelings;
    }catch(error){
        console.log("failed to update UI", error);
    }
}
export { updateUI};
export { handleSubmit };
export { processText };
export {getTextInfo};
