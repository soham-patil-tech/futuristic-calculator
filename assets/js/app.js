const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const themeBtn = document.getElementById("themeToggle");

let expression = "";

/* INPUT HANDLER */
function handleInput(value) {
  if (value === "AC") {
    expression = "";
  } 
  else if (value === "DEL") {
    expression = expression.slice(0, -1);
  }
  else if (value === "=") {
    try {
      expression = evaluate(expression).toString();
    } catch {
      expression = "Error";
    }
  }
  else {
    if (expression === "Error") expression = "";
    expression += value;
  }
  display.value = expression;
}

/* SAFE EVALUATOR */
function evaluate(exp) {
  if (!/^[0-9+\-*/%.]+$/.test(exp)) throw Error();
  return Function(`return (${exp})`)();
}

/* BUTTON EVENTS */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    handleInput(btn.dataset.key);
  });
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", e => {
  const map = {
    Enter: "=",
    Backspace: "DEL",
    Escape: "AC"
  };
  if (map[e.key]) handleInput(map[e.key]);
  else if ("0123456789+-*/.%".includes(e.key)) handleInput(e.key);
});

/* THEME TOGGLE */
themeBtn.onclick = () => {
  document.body.classList.toggle("theme-dark");
};
