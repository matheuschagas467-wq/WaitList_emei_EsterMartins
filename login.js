const escolas = {
  jorge_prado: "1234",
  ana_anjos: "1234",
  ester_martins: "1234"
};

function login() {
  const instituicao = document.getElementById("instituicao").value;
  const senha = document.getElementById("senha").value.trim(); // 🔴 CORREÇÃO
  const erro = document.getElementById("erro-login");

  erro.textContent = "";

  if (!instituicao || !senha) {
    erro.textContent = "Preencha todos os campos.";
    return;
  }

  if (!escolas[instituicao]) {
    erro.textContent = "Instituição não encontrada.";
    return;
  }

  if (escolas[instituicao] !== senha) {
    erro.textContent = "Senha incorreta.";
    return;
  }

  localStorage.setItem("instituicaoLogada", instituicao);
  window.location.href = "index.html";
}
