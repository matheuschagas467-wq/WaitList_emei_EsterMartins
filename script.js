let lista = JSON.parse(localStorage.getItem("lista")) || [];

function salvar() {
  localStorage.setItem("lista", JSON.stringify(lista));
}

function addRegistro() {
  const registro = {
    id: Date.now(),
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("nascimento").value,
    inscricao: document.getElementById("inscricao").value,
    responsavel: document.getElementById("responsavel").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    obs: document.getElementById("obs").value,
    status: document.getElementById("status").value
  };

  lista.push(registro);
  salvar();
  render();
}

function render(dados = lista) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  dados.sort((a,b)=> new Date(a.inscricao) - new Date(b.inscricao));

  dados.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.nascimento}</td>
        <td>${item.inscricao}</td>
        <td>${item.responsavel}</td>
        <td>${item.telefone}</td>
        <td>${item.status}</td>
        <td>${item.obs}</td>
        <td>
          <button onclick="editar(${item.id})">✏️</button>
          <button onclick="remover(${item.id})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

function remover(id) {
  lista = lista.filter(item => item.id !== id);
  salvar();
  render();
}

function editar(id) {
  const item = lista.find(i => i.id === id);

  document.getElementById("nome").value = item.nome;
  document.getElementById("nascimento").value = item.nascimento;
  document.getElementById("inscricao").value = item.inscricao;
  document.getElementById("responsavel").value = item.responsavel;
  document.getElementById("telefone").value = item.telefone;
  document.getElementById("endereco").value = item.endereco;
  document.getElementById("obs").value = item.obs;
  document.getElementById("status").value = item.status;

  remover(id);
}

function filtrar() {
  const data = document.getElementById("filtroNascimento").value;
  const ordem = document.getElementById("ordem").value;

  let filtrado = [...lista];

  if (data) {
    filtrado = filtrado.filter(i => i.nascimento === data);
  }

  filtrado.sort((a,b)=>{
    return ordem === "asc"
      ? new Date(a.inscricao) - new Date(b.inscricao)
      : new Date(b.inscricao) - new Date(a.inscricao);
  });

  render(filtrado);
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const dataHora = new Date().toLocaleString();

  doc.text("Lista de Espera - EMEI Ester Martins", 14, 10);
  doc.text(`Emitido em: ${dataHora}`, 14, 18);

  const tabela = lista.map(i => [
    i.nome,
    i.nascimento,
    i.inscricao,
    i.responsavel,
    i.telefone,
    i.status
  ]);

  doc.autoTable({
    head: [["Nome","Nascimento","Inscrição","Responsável","Telefone","Status"]],
    body: tabela,
    startY: 25
  });

  doc.save("lista-espera.pdf");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

render();
