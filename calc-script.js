window.onload = function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.className = savedTheme;
    }
};

const display = document.getElementById("result");

/* Web Audio API click sound (NO MP3) */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClick() {
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

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

/* Button handler */
function press(value) 

    playClick();

    if (value === "AC") {
        typeText("");
    }
    else if (value === "DEL") {
        typeText(display.value.slice(0, -1));
    }
    else if (value === "=") {
        try {
            typeText(eval(display.value).toString());
        } catch {
            typeText("Error");
        }
    }
    else {
        typeText(display.value + value);
    }
}

/* Typing animation */
function typeText(text) {
    display.value = "";
    let i = 0;

    const typing = setInterval(() => {
        display.value += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(typing);
    }, 25);
}

/* Theme toggle */
function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("cyber");
}

/* Keyboard support */
document.addEventListener("keydown", e => {
    if ("0123456789+-*/.%".includes(e.key)) press(e.key);
    if (e.key === "Enter") press("=");
    if (e.key === "Backspace") press("DEL");
    if (e.key === "Escape") press("AC");
});
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        press(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        press(key);
    } else if (key === "Enter") {
        press("=");
    } else if (key === "Backspace") {
        press("DEL");
    } else if (key.toLowerCase() === "c") {
        press("AC");
    }
});




