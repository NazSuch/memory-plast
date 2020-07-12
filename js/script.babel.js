'use strict';

var cardsArray = [{
  'name': 'sylno',
  'img': 'img/sylno.png'
}, {
  'name': 'oberezno',
  'img': 'img/oberezno.png'
}, {
  'name': 'krasno',
  'img': 'img/krasno.png'
}, {
  'name': 'bystro',
  'img': 'img/bystro.png'
}, {
  'name': 'drot',
  'img': 'img/drot.png'
}, {
  'name': 'orel',
  'img': 'img/orel.png'
}, {
  'name': 'lileya',
  'img': 'img/lileya.png'
}, {
  'name': 'skob',
  'img': 'img/skob.png'
}, {
  'name': 'strijxlop',
  'img': 'img/strijxlop.png'
}, {
  'name': 'strijdiv',
  'img': 'img/strijdiv.png'
}, {
  'name': 'vidznaka',
  'img': 'img/vidznaka.png'
}, {
  'name': 'yuriy',
  'img': 'img/yuriy.png'
}
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 2000;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });

  // Check if all matches have been made
  const all = document.querySelector('.grid').children;
  if(Array.from(all).every(child => child.classList.contains('match'))) {
    console.log("All children have the class match.");
    var card = document.createElement('div');
    card.classList.add('card-end');

    var end = document.createElement('img');
    end.classList.add('end');
    end.classList.add('fit');
    end.src = './img/final.png';

    game.insertBefore(card, grid);
    card.appendChild(end);
  } else {
    console.log('Not Finished');
  }
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');  
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);

      }
      setTimeout(resetGuesses, delay);

    }
    previousTarget = clicked;
  }
  
});

