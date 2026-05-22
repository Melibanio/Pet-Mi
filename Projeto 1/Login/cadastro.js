// cadastro.js
// Validação + registro de usuário no localStorage

document.addEventListener("DOMContentLoaded", function () {

    // Seleciona o formulário
    const form = document.querySelector(".cadastro-container form");

    // Seleciona os campos
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");

    // Evento ao enviar o formulário
    form.addEventListener("submit", function (event) {

        // Impede envio padrão
        event.preventDefault();

        // Remove espaços
        const valorNome = nome.value.trim();
        const valorEmail = email.value.trim();
        const valorSenha = senha.value.trim();
        const valorConfirmarSenha = confirmarSenha.value.trim();

        // VALIDAÇÕES

        if (
            valorNome === "" ||
            valorEmail === "" ||
            valorSenha === "" ||
            valorConfirmarSenha === ""
        ) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Nome válido
        if (valorNome.length < 3) {
            alert("Digite um nome válido.");
            nome.focus();
            return;
        }

        // Validação de e-mail
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        // Senha mínima
        if (valorSenha.length < 6) {
            alert("A senha deve conter pelo menos 6 caracteres.");
            senha.focus();
            return;
        }

        // Confirma senha
        if (valorSenha !== valorConfirmarSenha) {
            alert("As senhas não coincidem.");
            confirmarSenha.focus();
            return;
        }

        // REGISTRO NO LOCALSTORAGE

        const usuario = {
            nome: valorNome,
            email: valorEmail,
            senha: valorSenha
        };

        // Salva usuário
        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Cadastro realizado com sucesso!");

        // Redireciona
        window.location.href = "login.html";

    });

});
