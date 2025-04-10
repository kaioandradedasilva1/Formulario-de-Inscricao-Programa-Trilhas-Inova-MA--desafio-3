const listaIdsEntrada = document.querySelectorAll('.informacao_dado');
const mostrarSenha = document.querySelector('#mostrar-senha');
const alterarUsuarioSenha = document.querySelector('#alterar-usuario-senha');
const entradaSenha = document.querySelector('#senha');
const entradaUsuario = document.querySelector('#id-usuario');

// Recupera dados do LocalStorage
listaIdsEntrada.forEach((entrada) => {
    if (entrada.id == 'senha' || entrada.id == 'id-usuario') {
        entrada.value = localStorage.getItem(entrada.id);
    } else {
        entrada.textContent = localStorage.getItem(entrada.id);
    };
}); 

// Exibe-mostra senha; 
mostrarSenha.addEventListener('click', () => {
    entradaSenha.type = entradaSenha.type == 'password'? 'text' : 'password';
    mostrarSenha.textContent = mostrarSenha.textContent == 'Mostrar senha'? 'Ocultar senha' : 'Mostrar senha';
});

// Possibilita a alteração de id do usuário e senha 
alterarUsuarioSenha.addEventListener('click', () => {
    let alterarUS = alterarUsuarioSenha;
    if (alterarUS.textContent == 'Confirmar alteração') {
        entradaUsuario.disabled = true;
        entradaSenha.disabled = true;
        localStorage.setItem('id-usuario', entradaUsuario.value);
        localStorage.setItem('senha', entradaSenha.value);   
        alterarUS.textContent = 'Alterar usuário/senha';
        alert('Id de usuário e senha alterados com sucesso!')
    } else {
        entradaUsuario.disabled = false;
        entradaSenha.disabled = false; 
        console.log( entradaUsuario.value + entradaSenha.value);
        alterarUS.textContent = 'Confirmar alteração';
    };
});

// Sai do ficha de inscrição
function fazerLogOut () {
    const logout = confirm('Deseja sair e retornar ao menu de login?');
    if (logout) {
        window.location.href = 'login.html';
    } else {
        return;
    };
};

