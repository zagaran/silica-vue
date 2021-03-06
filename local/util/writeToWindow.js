export function writeToWindow(id, content) {
    // writes content as a json object tagged with id
    if (!document.getElementById(id)) {
        const script = document.createElement("script");
        script.id = id;
        script.innerHTML = JSON.stringify(content);
        document.body.appendChild(script);
    }
}