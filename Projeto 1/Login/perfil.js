const fotoPerfil = document.querySelector('.foto-perfil');
const inputFoto = document.getElementById('input-foto');
const previewFoto = document.getElementById('preview-foto');

fotoPerfil.addEventListener('click', () => {
    inputFoto.click();
});

inputFoto.addEventListener('change', () => {

    const arquivo = inputFoto.files[0];

    if (arquivo) {

        const leitor = new FileReader();

        leitor.onload = function(e) {

            previewFoto.src = e.target.result;

            previewFoto.style.display = 'block';

            fotoPerfil.classList.add('com-foto');
        }

        leitor.readAsDataURL(arquivo);
    }
});


// EDITAR PERFIL

const editarBtn = document.getElementById('editar-btn');

const inputs = document.querySelectorAll('.perfil-container input');

let editando = false;

editarBtn.addEventListener('click', () => {

    editando = !editando;

    inputs.forEach(input => {

        if (!input.classList.contains('email')) {

            input.disabled = !editando;
        }
    });

    if (editando) {

        editarBtn.textContent = 'Salvar';

    } else {

        editarBtn.textContent = 'Editar perfil';

        alert('Dados salvos!');
    }
});

