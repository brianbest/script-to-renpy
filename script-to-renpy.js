
const scriptDocument = "";
const speakers = findAllSpeakersInDocument(scriptDocument);
const lines = breakTextIntoLines(document.body.innerText);
const renpyOutput = generateRenpyScript(speakers, lines);

function breakTextIntoLines(text) {
    return text.split("\n");
}

function findAllSpeakersInDocument(doctxt) {
    var allText = doctxt;
    var allSpeakers = removeDuplicateSpeakers(allText.match(/^(.*?):/gm).map( (speaker) => {
        return speaker.replace(/:/g, "");
    }));
    
    return allSpeakers;
}

function removeDuplicateSpeakers(speakers) {
    return speakers.filter((speaker, index) => {
        return speakers.indexOf(speaker) === index;
    });
}

function generateRenpyScript(speakers, lines) {
    let renpyScript = "";
    speakers.forEach((speaker) => {
        renpyScript += `define ${speaker} = Character("${speaker}")\n`;
    }
    
}