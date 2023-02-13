let myHeaders = new Headers();
myHeaders.append("ApeKey", "monkeytype-trial");
myHeaders.append('Accept', 'application/json');

let requestOptions = {
  'method': 'GET',
  'headers': myHeaders,
  'redirect': 'follow'
};

let data;

fetch("https://api.monkeytype.com/users/sheeeshtyper/profile", requestOptions)
  .then(response => response.json())
  .then(result => {
    data = result;
    let userElem = document.getElementById("username-placeholder");
    console.log(data);
    userElem.innerText = data.data.name;

    let bestElem = document.getElementById("personal-best-placeholder");
    console.log(data.data.personalBests);
    bestElem.innerText = data.data.personalBests.time["60"]["0"].wpm + "wpm";
  })
  .catch(error => console.log('error', error));
