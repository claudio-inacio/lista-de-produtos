const buttonFullItens = document.getElementById('buttonFullItens');
const buttonHortifruti = document.getElementById('buttonHortifruti');
const buttonLaticinio = document.getElementById('buttonLaticinio');


const products = [
  {
    id: 1,
    nome: 'Banana',
    preco: '2.00',
    secao: 'Hortifruti',
    categoria: 'fruta',
    img: './src/img/banana.png',
    promocao: true,
    precoPromocao: '1.00',
    componentes: ['Potássio', 'Vitamina B6', 'Vitamina C', 'Folatos'],
  },
  {
    id: 2,
    nome: 'Morango',
    preco: '2.00',
    secao: 'Hortifruti',
    categoria: 'fruta',
    img: './src/img/morango.png',
    promocao: false,
    precoPromocao: '0',
    componentes: ['Fibras', 'Vitamina C', 'Cálcio', 'Ferro'],
  },
  {
    id: 3,
    nome: 'Maçã',
    preco: '2.00',
    secao: 'Hortifruti',
    categoria: 'fruta',
    img: './src/img/maca.png',
    promocao: true,
    precoPromocao: '1.50',
    componentes: ['Potássio', 'Vitamina A', 'Vitamina E', 'Vitamina C'],
  },
  {
    id: 4,
    nome: 'Pão',
    preco: '4.00',
    secao: 'Panificadora',
    categoria: 'Pães',
    img: './src/img/pao.png',
    promocao: true,
    precoPromocao: '2.50',
    componentes: ['Cálcio', 'Sódio', 'Fibra Alimentar', 'Proteínas'],
  },
  {
    id: 5,
    nome: 'Leite',
    preco: '5.00',
    secao: 'Laticinio',
    categoria: 'Leite',
    img: './src/img/leite.png',
    promocao: false,
    precoPromocao: '1.00',
    componentes: ['Carboidratos', 'Proteínas', 'Gorduras totais'],
  },
];

const listaCarrinho = document.querySelector('.listproductsCart');
const listaDeProdutos = document.getElementById('productList');
const carrinho = [];

function addCarrinho(produto) {
  const itemExistente = carrinho.find((item) => item.id === produto.id);

  if (itemExistente) {
    const qtdDesktop = document.querySelector(`#cartItem-${produto.id} .item-quantity`);
    const qtdMobile = document.querySelector(`#cartItemModal-${produto.id} .item-quantity`);

    qtdDesktop.innerText = parseInt(qtdDesktop.innerText) + 1;
    qtdMobile.innerText = parseInt(qtdMobile.innerText) + 1;

    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
    listarCarrinho(produto);
  }

  total(carrinho);


  const cartButton = document.querySelector('.cartButton');
  if (window.innerWidth <= 640 && cartButton) {
    cartButton.classList.add('flash');
    setTimeout(() => {
      cartButton.classList.remove('flash');
    }, 600);
  }
}



function listarCarrinho(produto) {
  const li = document.createElement('li');
  li.classList.add('listProductCartItem');
  li.id = `cartItem-${produto.id}`;

  li.innerHTML = `
    <div id="deletItemCart">
      <i class="trashIcon" data-lucide="trash-2"></i>
    </div>
    <div class="cartItem">
    <div class="item-info">
         <img class="item-thumb" src="${produto.img}" alt="${produto.nome}">
         <div class="itemDetail">
        <div class="item-name">${produto.nome}</div>
        <div class="item-meta">R$ ${produto.preco}</div>
        </div>
      </div>
      <div id="incrementItemComponent">
        <button class="btn-menos">-</button>
        <p class="item-quantity">1</p>
        <button class="btn-mais">+</button>
      </div>
    </div>
  `;
  listaCarrinho.appendChild(li);

  const listaCarrinhoModal = document.querySelector('.listproductsCartModal');
  const liModal = document.createElement('li');
  liModal.classList.add('listProductCartItemModal');
  liModal.id = `cartItemModal-${produto.id}`;

  liModal.innerHTML = `
    <div id="deletItemCart">
      <i class="trashIcon" data-lucide="trash-2"></i>
    </div>
    <div class="cartItemModal">
      <div class="itemInfoModal">
        <img class="item-thumb" src="${produto.img}" alt="${produto.nome}" />
        <div class="itemDetailModal">
          <div class="item-name">${produto.nome}</div>
          <div class="item-meta">R$ ${produto.preco}</div>
        </div>
      </div>
      <div id="incrementItemComponent">
        <button class="btn-menos">-</button>
        <p class="item-quantity">1</p>
        <button class="btn-mais">+</button>
      </div>
    </div>
  `;
  listaCarrinhoModal.appendChild(liModal);

  lucide.createIcons();

  const qtdDesktop = li.querySelector('.item-quantity');
  const qtdMobile = liModal.querySelector('.item-quantity');
  const btnMaisDesktop = li.querySelector('.btn-mais');
  const btnMenosDesktop = li.querySelector('.btn-menos');
  const btnMaisMobile = liModal.querySelector('.btn-mais');
  const btnMenosMobile = liModal.querySelector('.btn-menos');

  function atualizarQuantidade(incremento) {
    const novaQtd = parseInt(qtdDesktop.innerText) + incremento;
    if (novaQtd >= 1) {
      qtdDesktop.innerText = novaQtd;
      qtdMobile.innerText = novaQtd;

      const itemCarrinho = carrinho.find((item) => item.id === produto.id);
      if (itemCarrinho) itemCarrinho.quantidade = novaQtd;

      total(carrinho);
    }
  }

  btnMaisDesktop.addEventListener('click', () => atualizarQuantidade(1));
  btnMenosDesktop.addEventListener('click', () => atualizarQuantidade(-1));
  btnMaisMobile.addEventListener('click', () => atualizarQuantidade(1));
  btnMenosMobile.addEventListener('click', () => atualizarQuantidade(-1));

  const deleteDesktop = li.querySelector('#deletItemCart');
  const deleteMobile = liModal.querySelector('#deletItemCart');

  function removerItem() {
    li.remove();
    liModal.remove();
    const index = carrinho.findIndex((item) => item.id === produto.id);
    if (index > -1) carrinho.splice(index, 1);
    total(carrinho);
  }

  deleteDesktop.addEventListener('click', removerItem);
  deleteMobile.addEventListener('click', removerItem);
}

function listarProdutos(produtos) {
  listaDeProdutos.innerHTML = '';
  produtos.forEach((produto) => {
    const novoProduto = document.createElement('li');
    novoProduto.classList.add('productItem');
    novoProduto.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <h5>${produto.secao}</h5>
      <p>R$ ${produto.preco}</p>
      <ul class="benefits">
        ${produto.componentes.map((c) => `<li>${c}</li>`).join('')}
      </ul>
      <button class="addItemCar" id="addItemCar-${
        produto.id
      }">Add Carrinho</button>
    `;

    novoProduto
      .querySelector('button')
      .addEventListener('click', () => addCarrinho(produto));
    listaDeProdutos.appendChild(novoProduto);
  });
}

function total(lProdutos) {
  const soma = lProdutos.reduce((acumulador, item) => {
    const preco =
      parseFloat(item.preco.replace(',', '.')) * (item.quantidade || 1);
    return acumulador + preco;
  }, 0);

  const valorFormatado = soma.toFixed(2).replace('.', ',');

  const totalDiv = document.querySelector('.total');
  if (totalDiv) totalDiv.innerText = `Total: R$ ${valorFormatado}`;

  const spanTotal = document.getElementById('precoTotal');
  if (spanTotal) spanTotal.innerText = valorFormatado;
  atualizarBadge();
}

function atualizarBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;

  const totalItens = carrinho.reduce(
    (soma, item) => soma + (item.quantidade || 1),
    0
  );
  badge.innerText = totalItens;

}

const modalListProdutctMobile = document.querySelector('.modalContainer');
const buttonOpenModal = document.getElementById('ButtonOpenProdcutsCart');
const buttonCloseModal = document.getElementById('closeModal');
const buttonContinue = document.getElementById('continueShopping');

buttonOpenModal.addEventListener('click', () => {
  modalListProdutctMobile.style.display = 'flex';
});

buttonCloseModal.addEventListener('click', () => {
  modalListProdutctMobile.style.display = 'none';
});
buttonContinue.addEventListener('click', () => {
  modalListProdutctMobile.style.display = 'none';
});


buttonFullItens.addEventListener('click', () => {
  buttonHortifruti.classList.remove('active');
  buttonLaticinio.classList.remove('active');
  buttonFullItens.classList.add('active');
  listarProdutos(products);
});

buttonHortifruti.addEventListener('click', () => {
  buttonFullItens.classList.remove('active');
  buttonLaticinio.classList.remove('active');
  buttonHortifruti.classList.add('active');
  listarProdutos(products.filter((p) => p.secao === 'Hortifruti'));
});

buttonLaticinio.addEventListener('click', () => {
  buttonFullItens.classList.remove('active');
  buttonHortifruti.classList.remove('active');
  buttonLaticinio.classList.add('active');
  listarProdutos(products.filter((p) => p.secao === 'Laticinio'));
});

// ======== Inicializa ========
listarProdutos(products);
