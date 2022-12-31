const form = document.getElementById('form');
const playerNumEl = document.getElementById('player-num');
const spyNumEl = document.getElementById('spy-num');

let players;
let playersI;
let viewing = false;

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

   const restart = document.createElement('button');
   restart.innerHTML = 'Restart';
   restart.style.fontSize = '20px';
   restart.style.width = '100px';
   restart.style.height = '40px';
   restart.addEventListener('click', () => {
      window.location.reload();
   });
   document.body.appendChild(restart);
}

// createGame();

function createRoleBox(i) {
   const element = document.createElement('p');
   element.innerHTML = i + 1;
   element.style.height = '40px';
   element.style.paddingTop = '10px';
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

         viewing = false;
      } else if (!viewing) {
         element.setAttribute('viewed', 'true');

         element.classList.add('viewed');
         element.classList.remove('not-viewed');

         element.innerHTML = element.getAttribute('location');

         viewing = true;
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

console.log(window.location.href);