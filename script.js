let form = document.getElementById('form');
let playerNumEl = document.getElementById('player-num');
let spyNumEl = document.getElementById('spy-num');

let players;
let playersI;

form.addEventListener('submit', (event) => {
   event.preventDefault();

   createGame();
});

function createGame() {
   const playerNum = +playerNumEl.value || 5;
   const spyNum = +spyNumEl.value || 1;

   let locations = getLocationArr();
   const location = locations[randInt(0, locations.length)];

   players = new Array(playerNum).fill(location);
   playersI = [...Array(players.length).keys()];

   for (let i = 0; i < spyNum; i++) {
      const index = playersI[randInt(0, playersI.length)];
      players[index] = 'Spy';
      playersI.splice(index, 1);
   }

   document.body.innerHTML = '';
   for (let i = 0; i < playerNum; i++) {
      createRoleBox(i);
   }
}

// createGame();

function createRoleBox(i) {
   const element = document.createElement('p');
   element.innerHTML = i + 1;
   element.classList.add('prevent-select');

   element.setAttribute('location', players[i]);
   element.setAttribute('viewed', 'false');

   element.addEventListener('click', clickedRole);

   function clickedRole() {
      if (element.getAttribute('viewed') == 'true') {
         element.setAttribute('viewed', 'false');

         element.classList.add('not-viewed');
         element.classList.remove('viewed');

         element.innerHTML = i + 1;
      } else {
         element.setAttribute('viewed', 'true');

         element.classList.add('viewed');
         element.classList.remove('not-viewed');

         element.innerHTML = element.getAttribute('location');
      }
   }

   document.body.appendChild(element);
}

function getLocationArr() {
   const req = new XMLHttpRequest();
   req.open('GET', window.location.protocol + '//' + window.location.host + '/locations.txt', false);
   req.send();

   return req.responseText.split(/[\n\r]+/);
}

function randInt(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}
