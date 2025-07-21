// Dados em memória (poderia vir de um backend)
let produtos = [];
let clientes = [];
let contadorProduto = 1;
let contadorCliente = 1;

// Alternar abas
function mostrarAba(aba) {
  document.querySelectorAll('.aba').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(aba).classList.remove('hidden');
}

// ---- PRODUTOS ----
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');

formProduto.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('produto-id').value;
  const nome = document.getElementById('produto-nome').value;
  const preco = parseFloat(document.getElementById('produto-preco').value);

  if (id) {
    // Alterar
    const produto = produtos.find(p => p.id == id);
    produto.nome = nome;
    produto.preco = preco;
  } else {
    // Cadastrar
    produtos.push({ id: contadorProduto++, nome, preco });
  }

  formProduto.reset();
  document.getElementById('produto-id').value = '';
  atualizarListaProdutos();
});

function atualizarListaProdutos() {
  listaProdutos.innerHTML = '';
  produtos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>R$ ${p.preco.toFixed(2)}</td>
      <td>
        <button class="acao" onclick="editarProduto(${p.id})">✏ Editar</button>
        <button class="acao" onclick="excluirProduto(${p.id})">🗑 Excluir</button>
      </td>
    `;
    listaProdutos.appendChild(tr);
  });
}

function editarProduto(id) {
  const produto = produtos.find(p => p.id == id);
  document.getElementById('produto-id').value = produto.id;
  document.getElementById('produto-nome').value = produto.nome;
  document.getElementById('produto-preco').value = produto.preco;
}

function excluirProduto(id) {
  produtos = produtos.filter(p => p.id !== id);
  atualizarListaProdutos();
}

// ---- CLIENTES ----
const formCliente = document.getElementById('form-cliente');
const listaClientes = document.getElementById('lista-clientes');

formCliente.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('cliente-id').value;
  const nome = document.getElementById('cliente-nome').value;
  const email = document.getElementById('cliente-email').value;

  if (id) {
    const cliente = clientes.find(c => c.id == id);
    cliente.nome = nome;
    cliente.email = email;
  } else {
    clientes.push({ id: contadorCliente++, nome, email });
  }

  formCliente.reset();
  document.getElementById('cliente-id').value = '';
  atualizarListaClientes();
});

function atualizarListaClientes() {
  listaClientes.innerHTML = '';
  clientes.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>
        <button class="acao" onclick="editarCliente(${c.id})">✏ Editar</button>
        <button class="acao" onclick="excluirCliente(${c.id})">🗑 Excluir</button>
      </td>
    `;
    listaClientes.appendChild(tr);
  });
}

function editarCliente(id) {
  const cliente = clientes.find(c => c.id == id);
  document.getElementById('cliente-id').value = cliente.id;
  document.getElementById('cliente-nome').value = cliente.nome;
  document.getElementById('cliente-email').value = cliente.email;
}

function excluirCliente(id) {
  clientes = clientes.filter(c => c.id !== id);
  atualizarListaClientes();
}

// Iniciar com a aba de produtos visível
mostrarAba('produtos');
