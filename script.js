let form = document.getElementById('form');
let playerNumEl = document.getElementById('player-num');
let spyNumEl = document.getElementById('spy-num');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   createGame();
});

function createGame() {
   const playerNum = +playerNumEl.value || 5;
   const spyNum = +spyNumEl.value || 1;

   let locations = locationArr();
   const location = locations[randInt(0, locations.length - 1)];

   const players = new Array(playerNum).fill(location);
   const playersI = [...Array(players.length).keys()];

   for (let i = 0; i < spyNum; i++) {
      const index = playersI[randInt(0, playersI.length - 1)];
      players[index] = 'Spy';
      playersI.splice(index, 1);
   }

   document.body.innerHTML = '';
   for (let i = 0; i < playerNum; i++) {
      const player = document.createElement('p');
      player.innerText = players[i];
      document.body.appendChild(player);
   }

   const element = document.querySelector('p');
   element.paddingTop = '20px';
}

function locationArr() {
   const req = new XMLHttpRequest();
   req.open('GET', window.location.protocol + '//' + window.location.host + '/locations.txt', false);
   req.send();

   return req.responseText.split(/[\n\r]+/);
}

function randInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}
