let fs = require('fs');
let origin = JSON.parse(fs.readFileSync('./txt/barthelmeunique.json', 'utf8'));

// Youtube
var youtubedl = require('youtube-dl');

// Sentiment Analysis
var natural = require('natural');
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn")

senAnalysis();

function senAnalysis() {
    // Analysing one array with all unique words
    const alluniqueords = [].concat(...origin);
    console.log(alluniqueords.length);
    console.log(analyzer.getSentiment(alluniqueords));

    //-0.04233900814211695
}

function getVideo() {
    var video = youtubedl('https://www.youtube.com/watch?v=Qitfndf_ImM',
        ['--format=18'], {
            cwd: __dirname
        });

    let url = 'https://www.youtube.com/watch?v=Qitfndf_ImM';
    let options = {
        auto: true,
        lang: 'en',
        cwd: __dirname,
    };
    video.pipe(fs.createWriteStream('little_city.mp4'));

    youtubedl.getSubs(url, options, function (err, files) {
        if (err) throw err;

        console.log('subtitle files downloaded:', files);
    });

    video.on('info', function (info) {
        console.log('Download started');
        console.log('filename: ' + info.filename);
        console.log('size: ' + info.size);
    });

}

//getVideo();