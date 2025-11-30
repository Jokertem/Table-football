const HideAll = () => {
  document.querySelector(".gamePanel").style.display = "none";
  document.querySelector(".levels").style.display = "none";
  document.querySelector(".rooms").style.display = "none";
  document.querySelector("#game").style.display = "none";
};
export const ShowGame = () => {
  HideAll();
  document.querySelector("#game").style.display = "block";
  document.querySelector(".mobilePanel").style.display = "flex"
};
export const HidePanel = () => {
  document.querySelector(".gamePanel").style.display = "none";
};
export const ShowPanel = () => {
  HideAll();
  document.querySelector(".gamePanel").style.display = "flex";
};
export const LoadLevels = (levels, canvasSize, socket, unlockLevel) => {
  HideAll();
  const levelContainer = document.querySelector(".levels"); //Create Level Container
  levelContainer.style.display = "flex"; //Show Level Container
  levelContainer.innerHTML = ""; //Clear Level Container
  levels.forEach((level) => {
    // Render Levels
    const newLevel = document.createElement("div"); //Create New Level
    newLevel.innerText = level.lvl;
    if (level.lvl <= unlockLevel) {
      //Add Classes to Level
      newLevel.setAttribute("class", "unlock");
      newLevel.addEventListener("click", () => {
        ShowGame(); //Start Game
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
  const returnButton = document.createElement("button"); //Create Return Button
  returnButton.innerText = "Powrót";
  returnButton.addEventListener("click", () => {
    ShowPanel();
  });
  levelContainer.appendChild(returnButton);
};
export const LoadRooms = async (socket, canvasSize) => {
  HideAll();
  let rooms = [];
  const url = "http://192.168.0.111:4000/rooms"; //Request Adress
  const fetchPromise = fetch(url);
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((_rooms) => {
      rooms = _rooms; //Get Rooms
      const roomContainer = document.querySelector(".rooms"); //Create Rooms Container

      roomContainer.style.display = "flex"; //Show Rooms Container
      roomContainer.innerHTML = ""; //Clear Rooms Container

      rooms.forEach((room, index) => {
        //Render Rooms
        const newRoom = document.createElement("div"); //Create New Room
        newRoom.classList.add("room");
        roomContainer.appendChild(newRoom);
        newRoom.addEventListener("click", () => {
          //Join to room
          socket.emit("joinRoom", room.id, canvasSize);
        });
        const roomName = document.createElement("b");
        roomName.innerText = `Room ${index + 1}`;
        newRoom.appendChild(roomName);
        const roomPlayers = document.createElement("b");
        roomPlayers.innerText = `${room.players.length}/2`;
        newRoom.appendChild(roomPlayers);
      });

      const roomPanel = document.createElement("div"); //Create Room Panel
      roomPanel.classList.add("roomPanel"); //Add Class to Room Panel
      roomContainer.appendChild(roomPanel); //Add Room Panel
      const reloadButton = document.createElement("button"); //Create Reload Button
      reloadButton.innerText = "Odśwież";
      reloadButton.addEventListener("click", () => {
        LoadRooms(socket, canvasSize);
      });
      roomPanel.appendChild(reloadButton);
      const newRoomButton = document.createElement("button");
      newRoomButton.innerText = "Nowy Pokój";
      newRoomButton.addEventListener("click", () => {
        socket.emit("createRoom", canvasSize);
      });
      roomPanel.appendChild(newRoomButton);
      const returnButton = document.createElement("button"); //Create New Room Button
      returnButton.innerText = "Powrót";
      returnButton.addEventListener("click", () => {
        ShowPanel();
      });
      roomContainer.appendChild(returnButton);
    });
};
