/*
***************************
********Todos******
1. Profile picture
2. Better UI
***************************
*/

/*
***************************
********The headers are added with authorisation and JSON method******
***************************
*/
let myHeaders = new Headers();
myHeaders.append("ApeKey", "monkeytype-trial");
myHeaders.append('Accept', 'application/json');

/*
***************************
********This object is passed as options to the fetch call******
***************************
*/
let requestOptions = {
  'method': 'GET',
  'headers': myHeaders,
  'redirect': 'follow'
};

/*
***************************
********This function simply displays details directly to a <p> tag******
***************************
*/
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

function handleTableData(result) {
  let data = result;

  let userElem = document.getElementById("username-placeholder");
  console.log(data);
  userElem.innerText = data.data.name;

  let attributesArray = ['acc', 'wpm', 'difficulty', 'language'];
  let subOptionArray1 = ['30', '60', '120'];

  /*
  ***************************
  ********This fills the first table with bests of TIME mode******
  ***************************
  */
  for(let item of attributesArray) {
    for(let i = 0; i < 3; i++) {
      let selector = "table1-row" + (i+1);
      let rowElem = document.getElementById(selector);
      console.log(document.getElementById(selector));
      rowElem.innerHTML += `<td>${data.data.personalBests.time[subOptionArray1[i]]['0'][item]}</td>`;
    }
  }

  /*
  ***************************
  ********This fills the first table with bests of WORDS mode******
  ***************************
  */
  let subOptionArray2 = ['50', '100'];
  for(let item of attributesArray) {
    for(let i = 0; i < 2; i++) {
      let selector = "table2-row" + (i+1);
      let rowElem = document.getElementById(selector);
      console.log(document.getElementById(selector));
      rowElem.innerHTML += `<td>${data.data.personalBests.words[subOptionArray2[i]]['0'][item]}</td>`;
    }
  }

}

fetch("https://api.monkeytype.com/users/sheeeshtyper/profile", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    // handleData(result);
    handleTableData(result);
  })
  .catch(error => console.log('error', error));
