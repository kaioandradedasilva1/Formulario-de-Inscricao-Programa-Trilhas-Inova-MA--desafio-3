const entradaUsuario = document.querySelector('#id-usuario');
const entradaSenha = document.querySelector('#senha');
const entradaExibirSenha = document.querySelector('#exibir-senha');
const usuarioArmazenado = localStorage.getItem('id-usuario');
const senhaArmazenada = localStorage.getItem('senha');
const botaoFazerLogin = document.querySelector('#botao-login');
const inscricaoStatus = localStorage.getItem('confirmacao-inscricao');

// Validação de usuário
entradaUsuario.addEventListener('input', () => {
    if (usuarioArmazenado == entradaUsuario.value && inscricaoStatus == 'Confirmado') {
        alertaStyle(true, 'id-usuario', ' Usuário encontrado');
        entradaSenha.disabled = false;
    } else {
        alertaStyle(false, 'id-usuario', 'Usuário não encontrado');
        entradaSenha.disabled = true;
        entradaSenha.value = null;
    };
});

//Ativação e desativação do botao "Login"
entradaSenha.addEventListener('input', ()=> {
    const alerta = document.querySelector(`#alerta-senha`);
    if (entradaSenha.value) {
        botaoFazerLogin.disabled = false;
        botaoFazerLogin.classList.remove('button_disabled');
        alerta.innerHTML = null;
    } else {
        botaoFazerLogin.disabled = true;
        botaoFazerLogin.classList.add('button_disabled');
    }; 
}); 

//Mostra/Exibe a senha
entradaExibirSenha.addEventListener('click', ()=> {
    entradaSenha.type = entradaExibirSenha.checked? 'text' : 'password';
});

// Exibe o mensagem sobre nome de usuario e senha
function alertaStyle(valor, id,  mensagem) {
    const icoErro = '<img src="./assets/icone_erro.png">';
    const icoCerto = '<img src="./assets/icone_certo.png">';
    const entrada = document.querySelector(`#${id}`);
    const alerta = document.querySelector(`#alerta-${id}`);
    if (valor) {
        alerta.innerHTML = icoCerto + mensagem;
        alerta.style.color = 'green';
        entrada.style.border = '2px solid green';
    } else {
        alerta.innerHTML = icoErro + mensagem;
        alerta.style.color = 'red';
        entrada.style.border = '2px solid red';
    };
};

// Cancela o login
function cancelar() {
    const cancelar = confirm('Deseja cancelar o login?');
    if (cancelar) {
        window.location.href = 'index.html';
    }  else {
        return;
    };
};

// Valida a senha e faz o login 
function fazerLogin () {
    if (senhaArmazenada == entradaSenha.value) {
        alertaStyle(true, 'senha', 'Senha válida');
        setTimeout(function() {
            alert('Login efetuado com sucesso!')
            window.location.href = 'inscricao.html';
        }, 500);
    } else { 
        alertaStyle(false, 'senha', 'Senha inválida');
        entradaSenha.value = null;
    };
};