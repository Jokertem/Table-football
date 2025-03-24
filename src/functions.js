const HideAll = () => {
  document.querySelector(".gamePanel").style.display = "none";
  document.querySelector(".levels").style.display = "none";
  document.querySelector("#game").style.display = "none";
};
const ShowGame = () => {
  HideAll();
  document.querySelector("#game").style.display = "block";
};
export const HidePanel = () => {
  document.querySelector(".gamePanel").style.display = "none";
};
export const ShowPanel = () => {
  HideAll();
  document.querySelector(".gamePanel").style.display = "flex";
};
export const LoadLevels = (levels, canvasSize, socket) => {
  HideAll();
  let unlockLevels = localStorage.getItem("level");
  if (!unlockLevels) {
    unlockLevels = 1;
  }
  const unlockLevel = Number(unlockLevels);
  const levelContainer = document.querySelector(".levels");
  levelContainer.style.display = "flex";
  levelContainer.innerHTML = "";
  levels.forEach((level) => {
    const newLevel = document.createElement("div");
    newLevel.innerText = level.lvl;
    if (level.lvl <= unlockLevel) {
      newLevel.setAttribute("class", "unlock");
      newLevel.addEventListener("click", () => {
        ShowGame();
        socket.emit(
          "joinSingle",
          canvasSize,
          levels[level.lvl - 1].oponentSpeed
        );
      });
    } else {
      newLevel.setAttribute("class", "lock");
    }

    levelContainer.appendChild(newLevel);
  });
  const returnButton = document.createElement("button");
  returnButton.innerText = "Powrót";
  returnButton.addEventListener("click", () => {
    ShowPanel();
  });
  levelContainer.appendChild(returnButton);
};
