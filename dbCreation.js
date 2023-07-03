let btn = document.getElementById('btnAddScore');
btn.addEventListener('click', addBestWPM);

function getBestWPM() {
    let bestWPM = document.getElementById('bestWPMtime60');
    console.log(bestWPM.innerText);
}

let db;

function addBestWPM() {
    let request = indexedDB.open('scoreboard', 1);

    request.addEventListener('upgradeneeded', function(e) {
        let db = e.target.result;

        let timeScore = db.createObjectStore('timeScore', {
            keyPath: 'id',
            autoIncrement: true
        });
        let wordsScore = db.createObjectStore('wordsScore', {
            keyPath: 'id',
            autoIncrement: true
        });

        console.log("created database");
    });

    request.addEventListener('success', function(e) {
        let db = e.target.result;

        let bestWPM = document.getElementById('bestWPMtime60');
        console.log('here');

        let obj = {
            date: new Date(),
            text: bestWPM.innerText
        };

        let tx = db.transaction('timeScore', "readwrite");
        let objStore = tx.objectStore('timeScore');
        let requestHandle = objStore.add(obj);

        requestHandle.addEventListener('success', () => {
            console.log("Score added successfully");
        });

        requestHandle.addEventListener('error', () => {
            console.log("Error in adding to the database");
        })
    });
}