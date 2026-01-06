const display = document.getElementById("result");

/* Load saved theme */
window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.className = savedTheme;
    }
};

/* Click sound (Web Audio API – no mp3) */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = 900;
    gain.gain.value = 0.05;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
}

/* Button logic */
function press(value) {
    playClick();

    if (value === "AC") {
        display.value = "";
    } 
    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    } 
    else if (value === "=") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    } 
    else {
        display.value += value;
    }
}

/* Theme toggle */
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("cyber");
    localStorage.setItem("theme", document.body.className);
}

/* Keyboard support (SINGLE listener – no double input) */
document.addEventListener("keydown", (e) => {
    if ("0123456789+-*/.%".includes(e.key)) press(e.key);
    else if (e.key === "Enter") press("=");
    else if (e.key === "Backspace") press("DEL");
    else if (e.key === "Escape") press("AC");
});
