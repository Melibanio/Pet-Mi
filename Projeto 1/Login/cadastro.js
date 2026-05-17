// cadastro.js
// Validação do formulário de cadastro
// Após cadastrar com sucesso, redireciona para a página de login.

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
        // Impede o envio padrão do formulário
        event.preventDefault();

        // Remove espaços extras
        const valorNome = nome.value.trim();
        const valorEmail = email.value.trim();
        const valorSenha = senha.value.trim();
        const valorConfirmarSenha = confirmarSenha.value.trim();

        // Verifica se todos os campos foram preenchidos
        if (
            valorNome === "" ||
            valorEmail === "" ||
            valorSenha === "" ||
            valorConfirmarSenha === ""
        ) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se o nome possui pelo menos 3 caracteres
        if (valorNome.length < 3) {
            alert("Digite um nome válido.");
            nome.focus();
            return;
        }

        // Validação simples de e-mail
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        // Verifica se a senha possui pelo menos 6 caracteres
        if (valorSenha.length < 6) {
            alert("A senha deve conter pelo menos 6 caracteres.");
            senha.focus();
            return;
        }

        // Verifica se as senhas são iguais
        if (valorSenha !== valorConfirmarSenha) {
            alert("As senhas não coincidem.");
            confirmarSenha.focus();
            return;
        }

        // Mensagem de sucesso
        alert("Cadastro realizado com sucesso!");

        // Redireciona para a página de login
        window.location.href = "login.html";
    });
});
