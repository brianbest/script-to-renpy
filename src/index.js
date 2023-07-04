import ScriptToRenPy from "./script-to-renpy";

let scriptToRenPy = new ScriptToRenPy();

let getForm = document.getElementById("script-form");

getForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let script = document.getElementById("script").value;
    scriptToRenPy.setScript(script);
    document.getElementById("renpy-output").innerText = scriptToRenPy.getRenPyOutput();
});
