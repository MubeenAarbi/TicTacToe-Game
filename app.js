let boxes = document.querySelectorAll(".gamebtn");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
const winPattren = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
// reset btn
let resetGame = () => {
  turnO = true;
  enableBtn();
  msgcontainer.classList.add("hide");
};
// btn enable function
let enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
// btn disable function
let disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// show winner function
let showWinner = (winner) => {
  msg.innerText = ` Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
};
// winner checking function
const checkWinner = () => {
  for (let pattren of winPattren) {
    let pos1val = boxes[pattren[0]].innerText;
    let pos2val = boxes[pattren[1]].innerText;
    let pos3val = boxes[pattren[2]].innerText;
    if ((pos1val != "", pos2val != "", pos3val != "")) {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        disableBtn();
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
// web app
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => console.log("ServiceWorker registered"))
    .catch((err) => console.log("ServiceWorker registration failed:", err));
}
