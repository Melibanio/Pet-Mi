// ======================================

// ELEMENTOS DA PÁGINA

// ======================================

const categorias = document.querySelectorAll(".categorias li");

const titulo = document.querySelector(".produtos h1");

const subcategorias = document.querySelector(".subcategorias");

const listaProdutos = document.querySelector(".lista-produtos");



// ======================================

// BASE DE DADOS REALISTA

// ======================================

const dados = {



    Cachorros: {



        "Ração": [

            ["Golden Fórmula Adultos", "Carne e arroz 15kg", "129,90"],

            ["Premier Raças Médias", "Nutrição premium 12kg", "149,90"],

            ["Pedigree Carne e Vegetais", "Uso diário 10kg", "99,90"],

            ["Magnus Todo Porte", "Boa digestão 15kg", "94,90"],

            ["Biofresh Adultos", "Ingredientes naturais", "179,90"],

            ["GranPlus Choice", "Alta aceitação", "139,90"],

            ["Special Dog Premium", "Sabor carne", "89,90"],

            ["Fórmula Natural Fresh Meat", "Linha premium", "199,90"],

            ["Dog Chow Adultos", "Energia diária", "119,90"]

        ],



        "Coleiras": [

            ["Coleira Zee.Dog Gotham P", "Modelo pescoço", "69,90"],

            ["Coleira Zee.Dog Gotham M", "Porte médio", "74,90"],

            ["Coleira Zee.Dog Gotham G", "Porte grande", "79,90"],

            ["Peitoral Antipuxão Furacão Pet", "Confortável", "89,90"],

            ["Guia Retrátil Chalesco 5m", "Passeio seguro", "99,90"]

        ],



        "Brinquedos": [

            ["Mordedor Kong Classic", "Alta durabilidade", "89,90"],

            ["Bola Chalesco Cravo", "Interativa", "24,90"],

            ["Corda Dental Pet Games", "Ajuda limpeza", "29,90"],

            ["Frisbee Flex", "Parque e quintal", "22,90"],

            ["Pelúcia Sapo Pet", "Macio", "39,90"],

            ["Osso Nylon Ferplast", "Mastigação", "34,90"]

        ],



        "Caminhas": [

            ["Cama Baw Waw P", "Macia", "99,90"],

            ["Cama Baw Waw M", "Confortável", "129,90"],

            ["Cama Baw Waw G", "Grande porte", "169,90"],

            ["Cama Luxo Pet", "Espuma reforçada", "189,90"]

        ],



        "Petiscos": [

            ["Bifinho Keldog", "Sabor carne", "12,90"],

            ["Dentalife Purina", "Saúde bucal", "19,90"],

            ["Snack Premier Cookie", "Premium", "24,90"],

            ["Osso Nó Natural", "Diversão", "14,90"],

            ["Petisco Dog Chow", "Treinamento", "13,90"]

        ],



        "Higiene & Saúde": [

            ["Shampoo Sanol Dog Neutro", "Pelos macios", "29,90"],

            ["Tapete Higiênico Procão", "30 unidades", "39,90"],

            ["Frontline Antipulgas", "Proteção mensal", "89,90"],

            ["Escova Furminator", "Remove pelos", "119,90"],

            ["Perfume Pet Society", "Cheiro suave", "34,90"]

        ]



    },



    Gatos: {



        "Ração": [

            ["Golden Gatos Castrados", "Frango 10kg", "119,90"],

            ["Whiskas Carne Adultos", "10kg", "89,90"],

            ["Premier Ambientes Internos", "Premium", "149,90"],

            ["GranPlus Gourmet", "Alta aceitação", "129,90"],

            ["Biofresh Gatos", "Natural", "169,90"],

            ["Friskies Mix", "Uso diário", "79,90"],

            ["Special Cat Premium", "Nutrição completa", "94,90"]

        ],



        "Areia": [

            ["Pipicat Classic 12kg", "Controle odor", "34,90"],

            ["Katbom Granulado", "Alta absorção", "29,90"],

            ["Viva Verde Natural", "Biodegradável", "39,90"],

            ["Pipicat Sílica", "Maior duração", "44,90"],

            ["Areia Chalesco Premium", "Grãos finos", "37,90"]

        ],



        "Coleiras": [

            ["Coleira Chalesco com Sino", "Ajustável", "24,90"],

            ["Coleira Zee.Cat P", "Design moderno", "39,90"],

            ["Peitoral Furacão Pet Cat", "Confortável", "54,90"],

            ["Guia para Gato", "Passeio seguro", "44,90"]

        ],



        "Brinquedos": [

            ["Ratinho Catnip Chalesco", "Diversão", "19,90"],

            ["Varinha com Pena", "Interativo", "24,90"],

            ["Laser Cat Toy", "Estimula caça", "29,90"],

            ["Bolinha Sonora", "Leve", "17,90"],

            ["Túnel Dobrável", "Esconderijo", "69,90"]

        ],



        "Arranhadores": [

            ["Arranhador Poste Sisal", "Compacto", "89,90"],

            ["Arranhador Torre", "Completo", "189,90"],

            ["Mini Arranhador", "Pequeno espaço", "59,90"],

            ["Arranhador Casa", "2 em 1", "229,90"]

        ],



        "Higiene & Saúde": [

            ["Shampoo Gatos Cat Zone", "Banho suave", "32,90"],

            ["Antipulgas Advocate", "Proteção", "94,90"],

            ["Escova Removedora", "Pelos soltos", "49,90"],

            ["Lenço Umedecido Pet", "Limpeza rápida", "18,90"]

        ]



    },



    Coelhos: {



        "Ração": [

            ["Nutrópica Coelhos", "Completa", "44,90"],

            ["Alcon Club Coelhos", "Vitaminada", "39,90"],

            ["MegaZoo Rabbit", "Premium", "49,90"],

            ["Zootekna Bunny", "Diária", "36,90"]

        ],



        "Feno": [

            ["Feno Tifton Natural", "Fibra ideal", "24,90"],

            ["Feno Coast Cross", "Premium", "29,90"],

            ["Feno Bunny Hay", "Selecionado", "32,90"]

        ],



        "Coleiras": [

            ["Peitoral Coelho P", "Passeio leve", "39,90"],

            ["Peitoral Coelho M", "Ajustável", "44,90"],

            ["Kit Guia Bunny", "Seguro", "49,90"]

        ],



        "Brinquedos": [

            ["Bola Natural Coelho", "Mastigável", "19,90"],

            ["Túnel Coelho", "Diversão", "49,90"],

            ["Madeira Mordedor", "Desgaste dental", "22,90"]

        ],



        "Tocas": [

            ["Toca Coelho Madeira", "Charmosa", "89,90"],

            ["Cabana Soft Bunny", "Confortável", "99,90"],

            ["Casa Mini Rabbit", "Compacta", "74,90"]

        ],



        "Higiene & Saúde": [

            ["Granulado Higiênico", "Absorvente", "29,90"],

            ["Escova Bunny Care", "Pelos", "34,90"],

            ["Spray Higienizador", "Limpeza", "27,90"]

        ]



    },



    Aves: {



        "Ração": [

            ["Nutrópica Calopsita", "Premium", "29,90"],

            ["Megazoo Canários", "Natural", "24,90"],

            ["Alcon Club Aves", "Completa", "34,90"],

            ["Ração Papagaio Nutrópica", "Especial", "39,90"]

        ],



        "Gaiolas": [

            ["Gaiola Chalesco Média", "Prática", "149,90"],

            ["Gaiola Monaco Grande", "Espaçosa", "229,90"],

            ["Gaiola Luxo Premium", "Completa", "299,90"]

        ],



        "Poleiros": [

            ["Poleiro Madeira P", "Natural", "19,90"],

            ["Poleiro Médio", "Confortável", "24,90"],

            ["Poleiro Corda Flex", "Diferente", "34,90"]

        ],



        "Sementes": [

            ["Mix Girassol", "Selecionado", "19,90"],

            ["Painço Premium", "Natural", "14,90"],

            ["Mix Tropical Seeds", "Variado", "22,90"]

        ],



        "Ninhos": [

            ["Ninho Madeira", "Confortável", "34,90"],

            ["Ninho Fibra Natural", "Leve", "29,90"],

            ["Ninho Calopsita", "Especial", "39,90"]

        ],



        "Higiene & Saúde": [

            ["Vita Bird Complexo", "Vitaminas", "24,90"],

            ["Higienizador Gaiola", "Limpeza", "19,90"],

            ["Banheira para Aves", "Banho diário", "29,90"]

        ]



    },



    Peixes: {



        "Ração": [

            ["Alcon Basic Flocos", "Nutritiva", "19,90"],

            ["TetraMin Tropical", "Premium", "29,90"],

            ["Poytara Goldfish", "Especial", "24,90"],

            ["Betta Biofood", "Para bettas", "18,90"]

        ],



        "Aquários": [

            ["Aquário Boyu 40L", "Vidro reforçado", "299,90"],

            ["Aquário Sunsun 60L", "Completo", "399,90"],

            ["Aquário Nano Cube", "Compacto", "219,90"]

        ],



        "Filtros": [

            ["Filtro Sunsun HBL-301", "Silencioso", "119,90"],

            ["Filtro Ocean Tech HF-0100", "Boa vazão", "139,90"],

            ["Filtro Atman HF-0400", "Confiável", "159,90"]

        ],



        "Decoração": [

            ["Castelo Aquário", "Resina", "39,90"],

            ["Planta Artificial", "Visual bonito", "19,90"],

            ["Pedra Decorativa", "Natural", "24,90"]

        ],



        "Iluminação": [

            ["Luminária LED Aquário", "Brilho ideal", "79,90"],

            ["Barra LED 50cm", "Econômica", "99,90"],

            ["Luz Azul Noturna", "Efeito bonito", "49,90"]

        ],



        "Higiene & Saúde": [

            ["Condicionador Labcon", "Trata água", "24,90"],

            ["Anti Cloro Alcon", "Proteção", "19,90"],

            ["Sifão Limpeza", "Troca de água", "39,90"]

        ]



    },



    Roedores: {



        "Ração": [

            ["Nutrópica Hamster", "Completa", "24,90"],

            ["Alcon Club Roedores", "Natural", "22,90"],

            ["MegaZoo Porquinho Índia", "Premium", "29,90"]

        ],



        "Casinhas": [

            ["Casa Hamster Plástica", "Confortável", "49,90"],

            ["Casa Madeira Roedor", "Natural", "59,90"],

            ["Casa Túnel", "Divertida", "54,90"]

        ],



        "Brinquedos": [

            ["Roda Exercício", "Saudável", "39,90"],

            ["Ponte Madeira", "Natural", "27,90"],

            ["Bola Rolante", "Diversão", "22,90"]

        ],



        "Rodas": [

            ["Roda P", "Silenciosa", "29,90"],

            ["Roda M", "Resistente", "39,90"],

            ["Roda G", "Premium", "49,90"]

        ],



        "Serragem": [

            ["Serragem Higiênica Pipi Dog", "Absorvente", "16,90"],

            ["Granulado Madeira", "Sem odor", "22,90"],

            ["Forração Premium", "Confortável", "24,90"]

        ],



        "Higiene & Saúde": [

            ["Spray Limpeza Habitat", "Higiene", "24,90"],

            ["Escova Pequenos Pets", "Pelos", "19,90"],

            ["Vitaminas Roedores", "Saúde geral", "29,90"]

        ]



    }



};



// ======================================

// MOSTRAR SUBCATEGORIAS + QUANTIDADE

// ======================================

function mostrarSubcategorias(nome) {



    let html = "";

    const chaves = Object.keys(dados[nome]);



    chaves.forEach((item, index) => {



        const total = dados[nome][item].length;



        html += `

<button class="${index === 0 ? "ativo-sub" : ""}">

${item} (${total})

</button>

`;



    });



    subcategorias.innerHTML = html;



    ativarSubcategorias(nome);

    mostrarProdutos(nome, chaves[0]);

}



// ======================================

// ESTRELAS ALEATÓRIAS

// ======================================

function estrelas() {

    const notas = ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐☆", "⭐⭐⭐⭐½", "⭐⭐⭐☆"];

    return notas[Math.floor(Math.random() * notas.length)];

}



// ======================================

// MOSTRAR PRODUTOS

// ======================================

function mostrarProdutos(cat, sub) {



    sub = sub.replace(/\(\d+\)/g, "").trim();



    const produtos = dados[cat][sub];



    let html = "";



    produtos.forEach((item, index) => {



        const qtd = Math.floor(Math.random() * 20) + 1;



        html += `

<div class="card">

 

<div class="imagem-produto">

<img src="/img/produto1.png" alt="">

</div>

 

<h3>${item[0]}</h3>

<p>${item[1]}</p>

 

<div class="avaliacao">${estrelas()}</div>

 

<div class="quantidade">

${qtd} disponíveis

</div>

 

<div class="info">

<span>R$ ${item[2]}</span>

<button>🛒</button>

</div>

 

</div>

`;



    });



    listaProdutos.innerHTML = html;

}



// ======================================

// CLICAR SUBCATEGORIAS

// ======================================

function ativarSubcategorias(nome) {



    const botoes = document.querySelectorAll(".subcategorias button");



    botoes.forEach(botao => {



        botao.addEventListener("click", function () {



            botoes.forEach(btn => btn.classList.remove("ativo-sub"));

            this.classList.add("ativo-sub");



            mostrarProdutos(nome, this.textContent.trim());



        });



    });



}



// ======================================

// CLICAR CATEGORIAS

// ======================================

categorias.forEach(item => {



    item.addEventListener("click", function () {



        categorias.forEach(li => li.classList.remove("ativo"));

        this.classList.add("ativo");



        const nome = this.textContent.trim();



        titulo.textContent = "Tudo para seu " + nome.slice(0, -1);



        mostrarSubcategorias(nome);



    });



});



// ======================================

// INICIAR

// ======================================

mostrarSubcategorias("Cachorros");

