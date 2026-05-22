document.addEventListener("DOMContentLoaded", function () {

    // Formulário
    const form = document.querySelector(".login-container form");

    // Campos
    const email = document.getElementById("user");
    const senha = document.getElementById("senha");

    // Evento submit
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Valores digitados
        const valorEmail = email.value.trim();
        const valorSenha = senha.value.trim();

        // ===============================
        // VALIDAÇÕES
        // ===============================

        if (valorEmail === "" || valorSenha === "") {
            alert("Preencha todos os campos.");
            return;
        }

        // ===============================
        // PEGA USUÁRIO SALVO
        // ===============================

        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        // Verifica se existe cadastro
        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado.");
            return;
        }

        // Verifica o tipo de login

        if (
            valorEmail === usuarioSalvo.email &&
            valorSenha === usuarioSalvo.senha
        ) {

            alert("Login realizado com sucesso!");

            // pega parte antes do @
            const prefixo = valorEmail.split("@")[0];

            // regra de ADM
            if (
                prefixo.startsWith("adm") ||
                prefixo.startsWith("dev")
            ) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "home.html";
            }

        } else {

            alert("E-mail ou senha incorretos.");
        }
    });

});
