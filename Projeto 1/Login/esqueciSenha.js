document.addEventListener("DOMContentLoaded", function () {

    // Seleciona o formulário
    const form = document.querySelector(".esqueciSenha-container form");

    // Campos
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");

    // Evento submit
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Valores
        const valorEmail = email.value.trim();
        const valorSenha = senha.value.trim();
        const valorConfirmar = confirmar.value.trim();

        // VERIFICA SE EXISTE CADASTRO
    
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            alert("Sem cadastro. Faça uma conta primeiro.");
            return;
        }

        // VALIDAÇÕES

        if (
            valorEmail === "" ||
            valorSenha === "" ||
            valorConfirmar === ""
        ) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Validação email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        // Verifica email cadastrado
        if (valorEmail !== usuarioSalvo.email) {
            alert("E-mail não cadastrado.");
            return;
        }

        // Senha mínima
        if (valorSenha.length < 6) {
            alert("A nova senha deve conter pelo menos 6 caracteres.");
            senha.focus();
            return;
        }

        // Senhas iguais
        if (valorSenha !== valorConfirmar) {
            alert("As senhas não coincidem.");
            confirmar.focus();
            return;
        }

        if (valorSenha === usuarioSalvo.senha) {
            alert("A nova senha não pode ser igual à senha antiga.");
            senha.focus();
            return;
        }


        // ATUALIZA SENHA

        usuarioSalvo.senha = valorSenha;

        localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));


        alert("Senha alterada com sucesso!");

        window.location.href = "login.html";

    });

});
