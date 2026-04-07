const escolas = {
jorge_prado: "1234",
ana_anjos: "1234",
ester_martins: "1234"
};

function login(){
const i = document.getElementById("instituicao").value;
const s = document.getElementById("senha").value.trim();
const erro = document.getElementById("erro-login");

erro.textContent = "";

if(!i || !s){
erro.textContent = "Preencha os campos";
return;
}

if(escolas[i] !== s){
erro.textContent = "Senha incorreta";
return;
}

localStorage.setItem("instituicaoLogada", i);
window.location.href = "index.html";
}