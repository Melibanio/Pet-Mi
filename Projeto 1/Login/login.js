
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário
    const form = document.querySelector(".login-container form");

    // Seleciona os campos
    const email = document.getElementById("user");
    const senha = document.getElementById("senha");

    // Evento ao enviar o formulário
    form.addEventListener("submit", function (event) {
        // Remove espaços extras
        const valorEmail = email.value.trim();
        const valorSenha = senha.value.trim();

        // Verifica se os campos estão preenchidos
        if (valorEmail === "" || valorSenha === "") {
            event.preventDefault();
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Validação simples de e-mail
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valorEmail)) {
            event.preventDefault();
            alert("Digite um e-mail válido.");
            email.focus();
            return;
        }

        // Verifica tamanho mínimo da senha
        if (valorSenha.length < 6) {
            event.preventDefault();
            alert("A senha deve ter pelo menos 6 caracteres.");
            senha.focus();
            return;
        }

        // Mensagem opcional antes do envio
        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    });
});
