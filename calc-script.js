/* =========================
   DOM ELEMENTS
========================= */
const display = document.getElementById("result");
const calculator = document.querySelector(".calculator");
const themeBtn = document.getElementById("themeBtn");

/* =========================
   LOAD SAVED THEME
========================= */
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.className = savedTheme;
});

/* =========================
   WEB AUDIO CLICK SOUND
========================= */
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

/* =========================
   HELPER FUNCTIONS
========================= */
function isOperator(value) {
    return "+-*/.%".includes(value);
}

function calculate(expression) {
    if (!/^[0-9+\-*/.%() ]+$/.test(expression)) {
        throw new Error("Invalid Expression");
    }
    return Function(`"use strict"; return (${expression})`)();
}

function showError() {
    calculator.classList.add("error");
    setTimeout(() => calculator.classList.remove("error"), 300);
}

/* =========================
   MAIN BUTTON LOGIC
========================= */
function press(value) {
    playClick();

    // Auto clear after error
    if (display.value === "Error") {
        display.value = "";
    }

    const lastChar = display.value.slice(-1);

    if (value === "AC") {
        display.value = "";
        return;
    }

    if (value === "DEL") {
        display.value = display.value.slice(0, -1);
        return;
    }

    if (value === "=") {
        try {
            display.value = calculate(display.value);
        } catch {
            display.value = "Error";
            showError();
        }
        return;
    }

    // Prevent double operators
    if (isOperator(value) && isOperator(lastChar)) return;

    display.value += value;
}

/* =========================
   THEME TOGGLE
========================= */
function toggleTheme() {
    const newTheme = document.body.classList.contains("dark")
        ? "cyber"
        : "dark";

    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
}

/* =========================
   KEYBOARD SUPPORT
========================= */
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    // PREVENT browser behavior for calculator keys
    if (
        "0123456789+-*/.%ad".includes(key) ||
        key === "enter" ||
        key === "escape" ||
        key === "backspace"
    ) {
        e.preventDefault();
    }

    // Numbers & operators
    if ("0123456789+-*/.%".includes(key)) {
        press(key);
        return;
    }

    // Shortcuts
    if (key === "a" || key === "escape") {
        press("AC");
        return;
    }

    if (key === "d" || key === "backspace") {
        press("DEL");
        return;
    }

    if (key === "enter") {
        press("=");
        return;
    }
});
;



