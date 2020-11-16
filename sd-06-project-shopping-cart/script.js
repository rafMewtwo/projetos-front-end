// price
let save = 0;
let total = 0;
function sumPrice(price) {
  total += price;
  totalText = document.querySelector('.total-price');
  totalText.innerHTML = total;
}
// função de erro, caso de erro
const handleError = (errorMessage) => {
  window.alert(errorMessage);
};
// salva storage, todos da lista
const localStorageSave = () => {
  const cartItem = document.querySelector('.cart__items');
  localStorage.setItem('items', cartItem.innerHTML);
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener() {
  // coloque seu código aqui
  const string = event.target.innerText;
  const xprice = string.split('$');
  // console.log(xprice);
  event.target.remove();
  localStorage.clear(); // limpa o storage
  localStorageSave();
  // subprice
  if (save === xprice[1]) {
    save = 0;
  } else {
    save = xprice[1];
    total -= parseFloat(xprice[1]);
    totalText = document.querySelector('.total-price');
    totalText.innerHTML = total;
  }
}
// carrega storage
const localStorageLoad = () => {
  const saveItem = document.querySelector('.cart__items');
  saveItem.innerHTML = localStorage.getItem('items');
  saveItem.addEventListener('click', cartItemClickListener);
};

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// add
const fetchProductId = (id) => {
  const urlId = `https://api.mercadolibre.com/items/${id}`;
  // console.log(urlId)
  fetch(urlId)
    .then(response => response.json())
    .then((object) => {
      // console.log(object);
      if (object.error) {
        throw new Error(object.error);
      } else {
        // price
        sumPrice(object.price);
        // console.log(object.price);
        document.querySelector('.cart__items').appendChild(createCartItemElement(object));
        localStorageSave(); // load tem que ficar aqui p/ pegar o primeiro append
      }
    })
    .catch(error => handleError(error));
};

// tirar duvida do obj distruct
function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', () => {
    fetchProductId(id);
  });

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function loadText() {
  const loadingText = document.createElement('h1');
  loadingText.innerHTML = 'loading...';
  loadingText.className = 'loading';
  const father = document.querySelector('.items');
  father.appendChild(loadingText);
}

function delText() {
  const loadingText = document.querySelector('.loading');
  loadingText.remove();
}

// construção da api url
const apiInfo = {
  api: 'https://api.mercadolibre.com/sites/MLB/search?q=$',
  endpoint: 'computador',
};

const url = `${apiInfo.api}${apiInfo.endpoint}`;

// função fetch para pegar o obj do api do mercado livre
const fetchMain = () => {
  loadText();
  fetch(url)
    .then(response => response.json())
    .then((object) => {
      // console.log(object);
      if (object.error) {
        throw new Error(object.error);
      } else {
        delText();
        // console.log(object.results);
        // caminha na array object.results
        object.results.forEach((item) => {
          // seleciona a section com id items e vai add p/ cada elemento da array
          // (cont) o return da função createProductItemElement.
          // o parametro item é o objeto gerado pela array object.results
          document.querySelector('.items')
          // tirar duvida do obj distruct
          .appendChild(createProductItemElement(item));
        });
      }
    })
    .catch(error => handleError(error));
};

function clearAll() {
  document.querySelector('.cart__items').innerHTML = '';
  // price
  total = 0;
  totalText = document.querySelector('.total-price');
  totalText.innerHTML = total;
  // localStorage.clear();
}

function methodClearList() {
  const buttonClearAll = document.querySelector('.empty-cart');
  buttonClearAll.addEventListener('click', clearAll);
}

window.onload = function onload() {
  fetchMain();
  localStorageLoad(); // carrega lista qndo inicia
  methodClearList();
};
