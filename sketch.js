const puppeteer = require('puppeteer')

const fs = require('fs');
const util = require('util');

const siteUrl = `http://jessamyn.com/barth/`
const txtnames = ['Critique', 'Rebecca', 'Glassmountain', 'Kingofjazz', 'Languish', 'Theparty', 'Kennedy', 'Phantom', 'Cortes', 'Daumier', 'Lear', 'Depart', 'Dolt', 'Baby', 'Greathug', 'letter', 'Mandible', 'Capitalism', 'Gold', 'Colby'];

showalltxt();

function showalltxt() {
    gettxt()
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

var namex = 0;
const storyArray = [];
const allwords = [];
const uniqueArray = [];

async function gettxt() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Step 1: Iterate through story urls
    for (let i = namex; i < txtnames.length; i++) {
        const txturl = `${txtnames[i]}`
        const fullurl = siteUrl + txturl.toLowerCase() + '.html';
        await page.goto(fullurl);

        //Step 2:  Get txt
        const storytxt = await page.evaluate(() => {
            let title = document.querySelector('b').innerText;
            let alltxt = document.querySelector('p').innerText;
            return {
                title,
                alltxt
            }
        });

        // Step 3: create an Array of all stories
        await storyArray.push(storytxt);
        await writetxt(storyArray);

        // Step 4: create an Array of words from all stories
        await allwords.push(storyArray[namex].alltxt.toLowerCase().replace(/(~|`|\n|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "").split(' ').sort());

        // Step 5: Array of unique words from all stories
        let unique = await [...new Set(allwords[namex])];
        await uniqueArray.push(unique);
        await writeunique(uniqueArray);

        namex++;
    }

    await browser.close();
    console.log('done');
}

// Writing the original stories to a JSON file
function writetxt(storyArray) {
    let txt = JSON.stringify(storyArray, null, 2);
    fs.writeFileSync('./txt/barthelmealltxt.txt', txt, finished);
    fs.writeFileSync('./txt/barthelmetxt.json', txt, finished);

    function finished(err) {
        console.log('json is ready');
    }
};

// Writing the unique values to a JSON file
function writeunique(uniqueArray) {
    let txt = JSON.stringify(uniqueArray, null, 2);
    fs.writeFileSync('./txt/barthelmeunique.json', txt, finished);

    function finished(err) {
        console.log('unique is ready');
    }
};