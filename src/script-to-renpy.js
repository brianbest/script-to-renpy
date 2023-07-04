
class ScriptToRenPy {
    constructor(script = "") {
        this.speakers = {};
        this.lines = [];
        this.renpyOutput = "";
        this.script = "";

        if (script !== "") {
            this.setScript(script);
        }
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
        this.renpyOutput = this.generateRenpyScript(Object.keys(this.speakers), this.lines);
        return this.renpyOutput;
    }


    breakTextIntoLines(text) {
        return text.split("\n");
    }
    
    findAllSpeakersInDocument(doctxt) {
        let speakers = {};
        doctxt.match(/^(.*?):/gm).forEach( (speaker) => {
            speaker = speaker.replace( ":", "");
            speakers[speaker] = speaker;
        });

        return speakers;
    }
    
    generateRenpyScript(speakers, lines) {
        let renpyScript = "";
        speakers.forEach((speaker) => {
            renpyScript += `define ${speaker} = Character("${speaker}")\n`;
        });
        renpyScript += "\nlabel start:\n";
    
        lines.forEach((line) => {
            renpyScript += this.printLineWithSpeaker(line);
        });
        renpyScript += "\n\treturn\n";
        return renpyScript;
    }
    
    printLineWithSpeaker(line) {
        let speaker = line.match(/^(.*?):/gm);
        if (speaker === null) {
            line = line.replace(/^"|"$/g, ''); // Remove quotes
            return `\t"${line}"\n`;
        } else {
            speaker = speaker[0].replace( ":", "");
            line = line.replace(speaker + ": ", "");
            line = line.replace(/^"|"$/g, ''); // Remove quotes
            return `\t ${this.speakers[speaker]} "${line}"\n`;
        }      
    }
};

module.exports = ScriptToRenPy;