
class ScriptToRenPy {
    constructor() {
        this.speakers = [];
        this.lines = [];
        this.renpyOutput = "";
        this.script = "";
    }

    setScript(script) {
        this.script = script;
    }

    getRenPyOutput(forceGenerate = false) {
        if (this.script === "") {
            return "";
        }
        if (this.renpyOutput !== "" && !forceGenerate) {
            return this.renpyOutput;
        }
        
        this.lines = this.breakTextIntoLines(this.script);
        this.speakers = this.findAllSpeakersInDocument(this.script);
        this.renpyOutput = this.generateRenpyScript(this.speakers, this.lines);
        return this.renpyOutput;
    }


    breakTextIntoLines(text) {
        return text.split("\n");
    }
    
    findAllSpeakersInDocument(doctxt) {
        var allText = doctxt;
        var allSpeakers = removeDuplicateSpeakers(allText.match(/^(.*?):/gm).map( (speaker) => {
            return speaker.replace(/:/g, "");
        }));
        
        return allSpeakers;
    }
    
    removeDuplicateSpeakers(speakers) {
        return speakers.filter((speaker, index) => {
            return speakers.indexOf(speaker) === index;
        });
    }
    
    generateRenpyScript(speakers, lines) {
        let renpyScript = "";
        speakers.forEach((speaker) => {
            renpyScript += `define ${speaker} = Character("${speaker}")\n`;
        });
        renpyScript += "\n label start:\n";
    
        lines.forEach((line) => {
            renpyScript += printLineWithSpeaker(line, speakers);
        });
    
        return renpyScript;
    }
    
    printLineWithSpeaker(line, speakers) {
        let speaker = "";
        speakers.forEach((speaker) => {
            if (line.startsWith(speaker)) {
                line = line.replace(speaker, "");
                speaker = speaker;
            }
        });
        return `${speaker} "${line}"\n`;
    }
};

module.exports = ScriptToRenPy;