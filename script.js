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
