const entradaNome = document.querySelector('#nome');
const entradaDataDeNascimento = document.querySelector('#data-nascimento');
const entradaCpf = document.querySelector('#cpf')
const entradaSexo = document.querySelector('#sexo');
const entradaEmail = document.querySelector('#email');
const entradaTelefone = document.querySelector('#telefone');
const entradaDocumentoDeIdentificacao = document.querySelector('#doc-identidade');
const entradaCep = document.querySelector('#cep');
const entradaRua = document.querySelector('#rua');
const entradaNumero = document.querySelector('#numero');
const entradaCidade = document.querySelector('#cidade');
const entradaEstado = document.querySelector('#estado');
const entradaComprovantedeResidencia = document.querySelector('#comp-residencia');
const entradaTrilhas = document.querySelectorAll('input[name="trilha"]');
const entradaUsuario = document.querySelector('#id-usuario');
const entradaSenha = document.querySelector('#senha');
const entradaRepetirSenha = document.querySelector('#repetir-senha');
const entradaExibirSenha = document.querySelector('#exibir-senha');
const entradaAceite = document.querySelector('#aceite');

let trilhaSelecionada = 'Nenhuma';
let validacaoDeEntradas = [];  

// Cria uma lista de validação com 18 elementos falsos - Cada elemento na lista reprentada o estado de validação de cada entrada
let statusInfomacoesSalvas = false;
for (let i = 0; i < 18 ; i++) {
    validacaoDeEntradas.push(false)
}; 

// Define a entrada de CPF no formato 123.456.789-00
entradaCpf.addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                          .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                          .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
});

// Define a entrada de telefone no formato (00) 12345-6789
entradaTelefone.addEventListener('input', function(e) {
    var value = e.target.value;
    var telefonePattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona dois parantese entre os dois primeiros numeros (ddd)
                          .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após setimo dígito
                          .replace(/(-\d{4})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = telefonePattern;
});

// Define a entrada de CEP no formato 12345-678
entradaCep.addEventListener('input', function(e) {
    var value = e.target.value;
    var cepPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após quinto dígito
                          .replace(/(-\d{3})\d+?$/, '$1'); // Impede entrada de mais de 8 dígitos
    e.target.value = cepPattern;
});


// Dinâmica da seleção de arquivo.
const listaEntradaArquivo = document.querySelectorAll('input[type="file"]');
listaEntradaArquivo[0].addEventListener('click', function() {
    const idArquivo1 = listaEntradaArquivo[0].id;
    selecionarArquivo(idArquivo1);
});
listaEntradaArquivo[1].addEventListener('click', function() {
    const idArquivo2 = listaEntradaArquivo[1].id;
    selecionarArquivo(idArquivo2);
});
function selecionarArquivo(idArquivo) {
    const arquivo = document.getElementById(idArquivo);
    const label = document.getElementById(`label-${idArquivo}`);
    const nomeArquivo = document.getElementById(`nome-do-arquivo-${idArquivo}`);
    const selecaoArquivo = document.getElementById(`selecionar-${idArquivo}`);
    const selecionadoArquivo= document.getElementById(`selecionado-${idArquivo}`);
    arquivo.addEventListener("change", function() {
                if (arquivo.files.length > 0) {
                    selecaoArquivo.style.display = 'none';
                    selecionadoArquivo.style.display = 'flex';
                    label.style.backgroundColor = '#d5e6d3';
                    label.style.border = '1px solid green';
                    nomeArquivo.textContent = arquivo.files[0].name;
                } else {
                    selecionadoArquivo.style.display = 'none';
                    selecaoArquivo.style.display = 'flex';
                    label.style.backgroundColor = '#FEE7D6'
                    label.style.border = '2px solid red';
                };
    });
};

// Validação Instatânea de entradas
entradaNome.addEventListener('input', () => {
    const nome = entradaNome.value;
    const validacao = verificarEntrada(nome, 'nome');
    validacaoDeEntradas.splice(0, 1, validacao);
    mensagemDeStatus(entradaNome.id, validacao, 'Nome inválido');
});

entradaDataDeNascimento.addEventListener('input', () => {
    const dataDeNascimento = entradaDataDeNascimento.value; 
    const validacao = verificarEntrada(dataDeNascimento, 'data');
    validacaoDeEntradas.splice(1, 1, validacao);
    mensagemDeStatus(entradaDataDeNascimento.id, validacao, 'Data de nascimento inválida');
});

entradaCpf.addEventListener('input', () => {
    const validacao = entradaCpf.value.replace(/\D/g, '').length == 11;
    validacaoDeEntradas.splice(2, 1, validacao);
    mensagemDeStatus(entradaCpf.id, validacao, 'Número de CPF inválido');
});

entradaSexo.addEventListener('click', () => {
    const validacao = entradaSexo.value != 'selecione';
    validacaoDeEntradas.splice(3, 1, validacao);
    mensagemDeStatus(entradaSexo.id, validacao, 'Selecione um sexo');
});

entradaEmail.addEventListener('input', () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validacao = regex.test(entradaEmail.value);
    validacaoDeEntradas.splice(4, 1, validacao);
    mensagemDeStatus(entradaEmail.id, validacao, 'E-mail inválido');
});

entradaTelefone.addEventListener('input', () => {
    const validacao = entradaTelefone.value.replace(/\D/g, '').length == 11;
    validacaoDeEntradas.splice(5, 1, validacao);
    mensagemDeStatus(entradaTelefone.id, validacao, 'Número de telenone inválido');
})

entradaDocumentoDeIdentificacao.addEventListener('input', () => {
    const validacao = entradaDocumentoDeIdentificacao.files.length > 0;
    validacaoDeEntradas.splice(6, 1, validacao);
    mensagemDeStatus(entradaDocumentoDeIdentificacao.id, validacao, 'Anexe um documento de identificação');
});

entradaCep.addEventListener('input', () => {
    const validacao = entradaCep.value.replace(/\D/g, '').length == 8;
    validacaoDeEntradas.splice(7, 1, validacao);
    mensagemDeStatus(entradaCep.id, validacao, 'Código de CEP inválido');
});

entradaRua.addEventListener('input', () => {
    const rua = entradaRua.value;
    const validacao = verificarEntrada(rua, 'texto');
    validacaoDeEntradas.splice(8, 1, validacao);
    mensagemDeStatus(entradaRua.id, validacao, 'Nome de rua inválido');
});

entradaNumero.addEventListener('input', () => {
    const numero = entradaNumero.value;
    const validacao = verificarEntrada(numero, 'texto');
    validacaoDeEntradas.splice(9, 1, validacao);
    mensagemDeStatus(entradaNumero.id, validacao, 'Número de residência inválido');
});

entradaCidade.addEventListener('input', () => {
    const cidade = entradaCidade.value;
    const validacao = verificarEntrada(cidade, 'texto');
    validacaoDeEntradas.splice(10, 1, validacao);
    mensagemDeStatus(entradaCidade.id, validacao, 'Nome de cidade inválido');
});

entradaEstado.addEventListener('input', () => {
    const estado = entradaEstado.value;
    const validacao = verificarEntrada(estado, 'texto');
    validacaoDeEntradas.splice(11, 1, validacao);
    mensagemDeStatus(entradaEstado.id, validacao, 'Selecione um estado');
});

entradaComprovantedeResidencia.addEventListener('input', () => {
    const validacao = entradaComprovantedeResidencia.files.length > 0;
    validacaoDeEntradas.splice(12, 1, validacao);
    mensagemDeStatus(entradaComprovantedeResidencia.id, validacao, 'Anexe um comprovante de residência');
});

entradaTrilhas.forEach((trilha) => {
  trilha.addEventListener('change', () => {
    stautusTrilha();
    trilhaSelecionada = trilha.value;
    validacaoDeEntradas.splice(13, 1, true)
  });
});

entradaUsuario.addEventListener('input', ()=> {
    const usuario = entradaUsuario.value;
    const validacao = verificarEntrada(usuario, 'texto');
    validacaoDeEntradas.splice(14, 1, validacao);
    mensagemDeStatus(entradaUsuario.id, validacao, 'Id de usuário inválido')
})

entradaSenha.addEventListener('input', () => {
    const validacao = entradaSenha.value.length >= 6;
    entradaRepetirSenha.disabled = validacao? false : true; 
    entradaRepetirSenha.value = '';
    validacaoDeEntradas.splice(15, 1, validacao);
    mensagemDeStatus(entradaSenha.id, validacao, 'A senha deve ter no mínimo 6 dígitos')
});

entradaRepetirSenha.addEventListener('input', () => {
    const validacao = entradaRepetirSenha.value == entradaSenha.value;
    validacaoDeEntradas.splice(16, 1, validacao);
    mensagemDeStatus(entradaRepetirSenha.id, validacao, 'Esta senha deve ser igual à anterior');
});

entradaAceite.addEventListener('click', () => {
    const validacao = entradaAceite.checked;
    validacaoDeEntradas.splice(17, 1, validacao);
    aceite = validacao? 'Aceito' : 'Não Aceito';
    mensagemDeStatus(entradaAceite.id, validacao, 'Aceite o item acima para prosseguir com a inscrição');
});

// Exibe a senha quando o usuario marca em "Exibir senha"
entradaExibirSenha.addEventListener('click', ()=> {
    entradaSenha.type = entradaExibirSenha.checked? 'text' : 'password';
    entradaRepetirSenha.type = entradaExibirSenha.checked? 'text' : 'password';
});

// Função de entradas mais complexas 
function verificarEntrada(entrada, tipo){
    if (tipo == 'nome'){
        const partes = entrada.split(" ");
        return partes.length >= 2 && partes.every(p => p.length > 1);
    };
    if (tipo == 'data') {
        const data = new Date(entrada);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataMinima = new Date('1900-01-01');
        return entrada && data < hoje && data >= dataMinima;
    }; 
    if (tipo == 'texto'){
        const partes = entrada.split(" ");
        return partes.length >= 1 && partes.every(p => p.length > 0);
    };
};

// Função de exibição de erro/acerto de entrada
function mensagemDeStatus (id, valor, mensagem) {
    const icoErro = '<img src="./assets/icone_erro.png">';
    const icoCerto = '<img src="./assets/icone_certo.png">';
    const entrada = document.querySelector(`#${id}`);
    const mensagemStatus = document.querySelector(`#status-${id}`);
    if (valor) {
        mensagemStatus.style.color = 'green'
        mensagemStatus.innerHTML = icoCerto + 'Tudo certo';
        entrada.style.border = '1px solid green';
        entrada.style.backgroundColor = '#d5e6d3';
    } else {
        mensagemStatus.style.color = 'red';
        mensagemStatus.innerHTML = icoErro + mensagem;
        entrada.style.border = '2px solid #F3541C';
        entrada.style.backgroundColor = '#FEE7D6';
    };
};

// Função de Verificação de seleção de trilha
function stautusTrilha () {
    const icoCerto = '<img src="./assets/icone_certo.png">';
    const mensagemStatus = document.querySelector('#status-trilha');
    mensagemStatus.style.color = 'green';
    mensagemStatus.innerHTML = icoCerto + 'Tudo certo';
};

// Função que salva as infomações preechidas no LocalStorage 
function salvarInfo(){
    statusInfomacoesSalvas = validacaoDeEntradas.includes(false)? false : true 
    const listaEntradas = document.querySelectorAll('.entrada');
    listaEntradas.forEach((entrada) => {
        localStorage.setItem(entrada.id, entrada.value); 
    });
    localStorage.setItem('trilha', trilhaSelecionada);
    localStorage.setItem('confirmacao-inscricao', 'Não Confirmado');
    alert('Informações salvas com sucesso!');
};

// Função de enviar o formulario
function enviar() {
    if (!validacaoDeEntradas.includes(false) && statusInfomacoesSalvas) {
        localStorage.setItem('confirmacao-inscricao', 'Confirmado');
        alert('Inscrição efetuada com sucesso!');
        window.location.href = 'end.html';
    } else {
        const erro = validacaoDeEntradas.includes(false)? 'Erro! Faltam informações no formulário' : 'Erro! Salve as informações antes de finalizar a inscrição';
        alert(erro);
    };
};

// Função de cancelar a inscrição
function cancelar() {
    const cancelar = confirm('Deseja realmente cancelar sua inscrição?');
    if (cancelar) {
        localStorage.clear();
        window.location.href = 'index.html';
    }  else {
        return;
    };
};