let myHeaders = new Headers();
myHeaders.append("ApeKey", "monkeytype-trial");
myHeaders.append('Accept', 'application/json');

let requestOptions = {
  'method': 'GET',
  'headers': myHeaders,
  'redirect': 'follow'
};

function handleData(result) {
  let data = result;
  let userElem = document.getElementById("username-placeholder");
  console.log(data);
  userElem.innerText = data.data.name;

  let contentElem = document.getElementById("content-placeholder");
  
  let optionArray = ["time", "words"];
  let subOptionArray1 = ['30', '60', '120'];
  let subOptionArray2 = ['50', '100'];
  let attributesArray = ['acc', 'wpm', 'difficulty', 'language'];

  for(let item of optionArray) {
    contentElem.innerText += `${item}\n`;
    let selectedArray;

    if(item == 'time') {
      selectedArray = subOptionArray1;
    } else {
      selectedArray = subOptionArray2;
    }

    for(let subItem of selectedArray) {
      contentElem.innerText += `${subItem}\n`;
      for(let attribute of attributesArray) {
        contentElem.innerText += `${attribute}: ${data.data.personalBests[item][subItem]['0'][attribute]}\n`;
        console.log(`${attribute}: ${data.data.personalBests[item][subItem]['0'][attribute]}\n`);
      }
      contentElem.innerText += `\n`;
    }

    contentElem.innerText += "\n";
  }
}

fetch("https://api.monkeytype.com/users/sheeeshtyper/profile", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    handleData(result);
  })
  .catch(error => console.log('error', error));
