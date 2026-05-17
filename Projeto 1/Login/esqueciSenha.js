document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário
    const form = document.querySelector(".esqueciSenha-container form");

    // Seleciona os campos
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar");

    // Evento ao enviar o formulário
    form.addEventListener("submit", function (event) {
        // Impede o envio padrão do formulário
        event.preventDefault();

        const valorSenha = senha.value.trim();
        const valorConfirmar = confirmar.value.trim();

        // Verifica se os campos estão preenchidos
        if (valorSenha === "" || valorConfirmar === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se a senha possui ao menos 6 caracteres
        if (valorSenha.length < 6) {
            alert("A nova senha deve conter pelo menos 6 caracteres.");
            senha.focus();
            return;
        }

        // Verifica se as senhas são iguais
        if (valorSenha !== valorConfirmar) {
            alert("As senhas não coincidem.");
            confirmar.focus();
            return;
        }

        // Mensagem de sucesso
        alert("Senha alterada com sucesso!");

        // Redireciona para a página de login
        window.location.href = "login.html";
    });
});
