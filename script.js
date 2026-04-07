const inst = localStorage.getItem("instituicaoLogada");
const key = "lista_"+inst;

let dados = JSON.parse(localStorage.getItem(key))||[];
let edit=null;

const lista=document.getElementById("lista");
const form=document.getElementById("form");

form.onsubmit=e=>{
e.preventDefault();
const r={
crianca:crianca.value,
nascimento:nascimento.value,
inscricao:inscricao.value,
responsavel:responsavel.value
};

edit===null?dados.push(r):dados[edit]=r;
edit=null;

localStorage.setItem(key,JSON.stringify(dados));
form.reset();
render();
};

function render(){
lista.innerHTML="";
dados.forEach((d,i)=>{
lista.innerHTML+=`
<tr>
<td>${i+1}</td>
<td>${d.crianca}</td>
<td>${new Date(d.nascimento).toLocaleDateString()}</td>
<td>${new Date(d.inscricao).toLocaleDateString()}</td>
<td>${d.responsavel}</td>
<td>
<button onclick="editar(${i})">✏️</button>
<button onclick="remover(${i})">🗑️</button>
</td>
</tr>`;
});
}

function editar(i){
const d=dados[i];
crianca.value=d.crianca;
nascimento.value=d.nascimento;
inscricao.value=d.inscricao;
responsavel.value=d.responsavel;
edit=i;
}

function remover(i){
dados.splice(i,1);
localStorage.setItem(key,JSON.stringify(dados));
render();
}

function gerarPDF(){
const {jsPDF}=window.jspdf;
const pdf=new jsPDF();
pdf.text("Lista",10,10);
pdf.save("lista.pdf");
}

render();