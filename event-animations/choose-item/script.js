const Colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'darkblue',
  'purple'
];

let cur = 0;

const createCard = () => {
  cur++;

  const colorSize = Colors.length;
  const randomizeColorIdx = Math.round(Math.random() * (colorSize - 1));

  /** @type {HTMLDivElement} */
  const card = document.createElement('div');
  card.classList.add('card');
  
  card.style.backgroundColor = Colors[randomizeColorIdx];
  // card.innerText = cur;
  card.dataset.content = String(cur);

  document.querySelector('#line').appendChild(card);
}

document.querySelector('#chooseBtn').addEventListener('click', () => {
  document.querySelector('#line').classList.add('move');
});
document.querySelector('#addBtn').addEventListener('click', () => {
  createCard();
});