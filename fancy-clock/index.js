var prefix = "fancy-clock/";

// dynamic JS loader
function importScript(path) {
    var tag = document.createElement("script");
    tag.src = path;
    document.head.appendChild(tag);
}

importScript(prefix + "clock-component.js");
importScript(prefix + "clock-number.js");
importScript(prefix + "fancy-clock.js");