// script.js
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userEmail = document.getElementById("userEmail");
const loginModal = document.getElementById("loginModal");
const submitLogin = document.getElementById("submitLogin");

loginBtn.onclick = () => loginModal.style.display = "flex";

submitLogin.onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      loginModal.style.display = "none";
      loginBtn.style.display = "none";
      userEmail.style.display = "inline";
      logoutBtn.style.display = "inline";
      userEmail.textContent = userCredential.user.email;
    })
    .catch((error) => {
      alert("Erro no login: " + error.message);
    });
};

logoutBtn.onclick = () => {
  firebase.auth().signOut().then(() => {
    userEmail.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline";
  });
};

 import { initializeApp } from "https://orikai-produto-e-clientes-default-rtdb.firebaseio.com/:null";

 //VOCÊ DEVE SUBSTITUIR OS CÓDIGOS ABAIXOS CÓDIGOS DO SEU PROJETO NO FIREBASE (FIREBASE CONFIGURATION)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzFTTUqOlJy7YrC2en-jsHMZIhQ1EuecE",
  authDomain: "orikai-produto-e-clientes.firebaseapp.com",
  projectId: "orikai-produto-e-clientes",
  storageBucket: "orikai-produto-e-clientes.firebasestorage.app",
  messagingSenderId: "731596279385",
  appId: "1:731596279385:web:3d605c71286a5b6eb6ab48",
  measurementId: "G-91S4TJP737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 //VOCÊ DEVE SUBSTITUIR AO FINAL DA URL AS PALAVRAS FIREBASE-APP POR FIREBASE-DATABASE
 import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


 const db = getDatabase();

//  CAMPOS DE ENTRADAS DOS VALORES DO CADASTRO DE PRODUTOS
 let codigo = document.getElementById('codigo');
 let produto =document.getElementById('produto');
 let categoria =document.getElementById('categoria');
 let quantidade =document.getElementById('quantidade');
 let valor =document.getElementById('valor');

//CAMPO DE PESQUISA E ATUALIZAÇÃO DOS PRODUTOS
 let idProduto = document.getElementById('idProduto');

//RESULTADOS DAS PESQUISAS
 let dadoProduto = document.getElementById('dadoProduto');
 let dadoCategoria = document.getElementById('dadoCategoria');
 let dadoQuantidade = document.getElementById('dadoQuantidade');
 let dadoValor = document.getElementById('dadoValor');

//BOTÕES DOS CAMPOS DE PESQUISA
 let cadastrarProduto = document.getElementById('cadastrarProduto');
 let buscarProduto = document.getElementById('buscarProduto');
 let atualizarProduto = document.getElementById('atualizarProduto');
 let deletarProduto = document.getElementById('deletarProduto');

//ADICIONAR PRODUTO
 function AddProduto(){
    set(ref(db,'Produto/'+codigo.value),{
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(()=>{
        codigo.value = ''
        produto.value=''
        categoria.value=''
        quantidade.value=''
        valor.value=''
        alert("Produto Cadastrado!");
    }).catch((error)=>{
        console.log(error);
        alert('Produto Não Cadastrado!');
    })

 }

 //FUNCÃO PARA PESQUISA DE PRODUTOS COM BASE NO CÓDIGO DO PRODUTO => idProduto
 function PesquisarProduto(){
    const dbRef = ref(db);
    get(child(dbRef,'Produto/'+idProduto.value)).then((snapshot)=>{
        if(snapshot.exists()){
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = ('R$ ')+parseFloat (snapshot.val().valor).toFixed(2);
            alert('Produto Localizado!')
        }else{
            alert("O produto não existe");
        }
    }).then(()=>{
        alert('Leitura Realizada!')
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
 }

 //FUNÇÃO PARA ATUALIZAÇÃO DAS INFORMAÇÕES ACERCA DO PRODUTO
function AtualizarProdutos(){
    update(ref(db,'Produto/'+idProduto.value),{
        produto:dadoProduto.value,
        categoria:dadoCategoria.value,
        quantidade:dadoQuantidade.value,
        valor:dadoValor.value
    }).then(()=>{
        alert('Produto Atualizado!');
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
}

//FUNÇÃO PARA DELETAR PRODUTO
function DeletarProdutos(){
    remove(ref(db,'Produto/'+idProduto.value)).
    then(()=>{
        idProduto.value=''
        dadoProduto.value=''
        dadoCategoria.value=''
        dadoQuantidade.value=''
        dadoValor.value=''
        alert('Produto Deletado!')
    })
}

//MÉTODOS PARA UTILIZAÇÃO DAS FUNÇÕES COM BASE NAS AÇÕES DOS BOTÕES
cadastrarProduto.addEventListener('click',AddProduto);
buscarProduto.addEventListener('click',PesquisarProduto);
atualizarProduto.addEventListener('click',AtualizarProdutos);
deletarProduto.addEventListener('click',DeletarProdutos);


