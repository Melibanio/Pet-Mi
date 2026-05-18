// =============================================
// ELEMENTOS DA PÁGINA
// Captura as partes do HTML que o JavaScript
// vai controlar. Não altere estes nomes.
// =============================================
const categorias    = document.querySelectorAll(".categorias li");
const tituloPag     = document.querySelector(".titulo-categoria");
const subcategorias = document.querySelector(".subcategorias");
const listaProdutos = document.querySelector(".lista-produtos");
const badgeCount    = document.getElementById("badge-count");


// =============================================
// LOCAL STORAGE — SALVAR O CARRINHO
// Os produtos adicionados ficam salvos no
// navegador mesmo após fechar a página.
// A chave "petmi_carrinho" é o nome do dado
// salvo. Não altere se não souber o que faz.
// =============================================
const STORAGE_KEY = "petmi_carrinho";

// Carrega o carrinho salvo ou inicia vazio
let carrinho = carregarCarrinho();

// Lê o carrinho salvo no navegador
function carregarCarrinho(){
    try {
        const salvo = localStorage.getItem(STORAGE_KEY);
        return salvo ? JSON.parse(salvo) : [];
    } catch(e) {
        return [];
    }
}

// Salva o carrinho atualizado no navegador
function salvarCarrinho(){
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    } catch(e) {
        console.warn("Não foi possível salvar o carrinho.");
    }
}

// =============================================
// BADGE DO CARRINHO (NÚMERO NO BOTÃO)
// Atualiza o número de itens exibido
// no botão do carrinho no cabeçalho.
// =============================================
function atualizarBadge(){
    const total = carrinho.reduce((s, i) => s + i.qtd, 0);
    badgeCount.textContent = total;
}

// =============================================
// ADICIONAR PRODUTO AO CARRINHO
// Chamado ao clicar no botão verde do card.
// Salva no localStorage e atualiza o badge.
// =============================================
function adicionarAoCarrinho(nome, preco){
    // aceita preço no formato string "129,90" ou número
    const precoNum = typeof preco === 'string'
        ? parseFloat(preco.replace(/\./g,'').replace(',','.'))
        : Number(preco);

    const idx = carrinho.findIndex(i => i.nome === nome);
    if(idx >= 0){
        carrinho[idx].qtd++;
    } else {
        carrinho.push({ nome, preco: precoNum, qtd: 1, imagem: '../Img/produto1.png' });
    }
    salvarCarrinho();
    atualizarBadge();
    mostrarNotificacao(`\"${nome}\" adicionado ao carrinho!`);
}


// =============================================
// NOTIFICAÇÃO FLUTUANTE (TOAST)
// Mensagem que aparece na base da tela
// ao adicionar um produto.
// Para mudar o tempo de exibição, altere
// o valor 2800 (em milissegundos).
// =============================================
let timerNotif;

function mostrarNotificacao(msg){
    let notif = document.querySelector(".notificacao");
    if(!notif){
        notif = document.createElement("div");
        notif.className = "notificacao";
        document.body.appendChild(notif);
    }
    notif.textContent = msg;
    notif.classList.add("visivel");
    clearTimeout(timerNotif);
    timerNotif = setTimeout(() => notif.classList.remove("visivel"), 2800);
}


// =============================================
// BASE DE DADOS DOS PRODUTOS
//
// COMO ADICIONAR UM PRODUTO:
// Encontre a categoria e subcategoria desejada
// e adicione uma nova linha no formato:
// ["Nome do Produto", "Descrição", "Preço"],
//
// COMO ADICIONAR UMA SUBCATEGORIA:
// Adicione um novo bloco no formato:
// "Nome da Subcategoria": [
//     ["Produto 1", "Descrição", "00,00"],
// ],
//
// COMO ADICIONAR UMA CATEGORIA:
// 1. Adicione um bloco novo aqui seguindo
//    o padrão das categorias existentes
// 2. Adicione o <li> correspondente no HTML
// 3. Adicione o nome no ternário da função
//    de clique das categorias (mais abaixo)
// =============================================
const dados = {

    // -----------------------------------------
    // CATEGORIA: CACHORROS
    // -----------------------------------------
    Cachorros:{

        // Subcategoria: Ração
        "Ração":[
            ["Golden Fórmula Adultos",    "Carne e arroz 15kg",              "129,90"],
            ["Premier Raças Médias",       "Nutrição premium 12kg",           "149,90"],
            ["Pedigree Carne e Vegetais",  "Uso diário 10kg",                 "99,90"],
            ["Magnus Todo Porte",          "Boa digestão 15kg",               "94,90"],
            ["Biofresh Adultos",           "Ingredientes naturais 12kg",      "179,90"],
            ["GranPlus Choice",            "Alta aceitação 15kg",             "139,90"],
            ["Special Dog Premium",        "Sabor carne 10kg",                "89,90"],
            ["Fórmula Natural Fresh Meat", "Linha premium 12kg",              "199,90"],
            ["Dog Chow Adultos",           "Energia diária 15kg",             "119,90"],
            ["Purina Pro Plan Adultos",    "Alto desempenho 15kg",            "219,90"],
            ["Alpo Frango e Arroz",        "Boa digestão 10kg",               "79,90"],
            ["Guabi Natural Adultos",      "Ingredientes selecionados 12kg",  "159,90"]
        ],

        // Subcategoria: Coleiras
        "Coleiras":[
            ["Coleira Zee.Dog Gotham P",       "Pescoço até 36cm",         "69,90"],
            ["Coleira Zee.Dog Gotham M",       "Pescoço até 46cm",         "74,90"],
            ["Coleira Zee.Dog Gotham G",       "Pescoço até 56cm",         "79,90"],
            ["Peitoral Antipuxão Furacão Pet", "Confortável e seguro",     "89,90"],
            ["Guia Retrátil Chalesco 5m",      "Passeio seguro",           "99,90"],
            ["Peitoral Mesh Neon G",           "Leve e ventilado",         "79,90"],
            ["Coleira Couro Natural M",        "Resistente e elegante",    "109,90"]
        ],

        // Subcategoria: Brinquedos
        "Brinquedos":[
            ["Mordedor Kong Classic",    "Alta durabilidade",           "89,90"],
            ["Bola Chalesco Cravo",      "Interativa e resistente",     "24,90"],
            ["Corda Dental Pet Games",   "Ajuda na limpeza dental",     "29,90"],
            ["Frisbee Flex",             "Ideal para parques",          "22,90"],
            ["Pelúcia Sapo Pet",         "Macio e fofo",                "39,90"],
            ["Osso Nylon Ferplast",      "Para mastigação intensa",     "34,90"],
            ["Brinquedo IQ Ball",        "Estimula o raciocínio",       "49,90"],
            ["Cama de Balanço Pet",      "Relaxamento e diversão",      "69,90"]
        ],

        // Subcategoria: Caminhas
        "Caminhas":[
            ["Cama Baw Waw P",        "Macia e confortável",        "99,90"],
            ["Cama Baw Waw M",        "Espuma de qualidade",        "129,90"],
            ["Cama Baw Waw G",        "Para raças grandes",         "169,90"],
            ["Cama Luxo Pet",         "Espuma reforçada premium",   "189,90"],
            ["Cama Redonda Pelúcia",  "Estilo donuts fofo",         "119,90"],
            ["Cama Ortopédica M",     "Indicada para cães idosos",  "219,90"]
        ],

        // Subcategoria: Petiscos
        "Petiscos":[
            ["Bifinho Keldog",       "Sabor carne",              "12,90"],
            ["Dentalife Purina",     "Saúde bucal diária",       "19,90"],
            ["Snack Premier Cookie", "Petisco premium",          "24,90"],
            ["Osso Nó Natural",      "Diversão garantida",       "14,90"],
            ["Petisco Dog Chow",     "Para treinamento",         "13,90"],
            ["Carne Seca Keldog",    "Alto valor proteico",      "18,90"],
            ["Biscoito Vegetal Pet", "Sem corantes artificiais", "16,90"]
        ],

        // Subcategoria: Higiene & Saúde
        "Higiene & Saúde":[
            ["Shampoo Sanol Dog Neutro", "Pelos macios e brilhantes",  "29,90"],
            ["Tapete Higiênico Procão",  "30 unidades",                "39,90"],
            ["Frontline Antipulgas",     "Proteção mensal",             "89,90"],
            ["Escova Furminator",        "Remove pelos soltos",         "119,90"],
            ["Perfume Pet Society",      "Cheiro suave e duradouro",    "34,90"],
            ["Condicionador Sanol",      "Hidratação profunda",         "27,90"],
            ["Cortador de Unhas Pet",    "Aço inoxidável",              "44,90"]
        ]
    },

    // -----------------------------------------
    // CATEGORIA: GATOS
    // -----------------------------------------
    Gatos:{

        "Ração":[
            ["Golden Gatos Castrados",      "Frango 10kg",               "119,90"],
            ["Whiskas Carne Adultos",        "Sabor carne 10kg",          "89,90"],
            ["Premier Ambientes Internos",   "Premium 7,5kg",             "149,90"],
            ["GranPlus Gourmet",             "Alta aceitação 10kg",       "129,90"],
            ["Biofresh Gatos",               "Ingredientes naturais",     "169,90"],
            ["Friskies Mix",                 "Uso diário 10kg",           "79,90"],
            ["Special Cat Premium",          "Nutrição completa 10kg",    "94,90"],
            ["Hills Science Diet",           "Raças exóticas 4kg",        "189,90"],
            ["Royal Canin Indoor",           "Gatos de interior 4kg",     "199,90"]
        ],

        "Areia":[
            ["Pipicat Classic 12kg",         "Controle de odor",      "34,90"],
            ["Katbom Granulado",             "Alta absorção",          "29,90"],
            ["Viva Verde Natural",           "Biodegradável",          "39,90"],
            ["Pipicat Sílica",               "Maior duração",          "44,90"],
            ["Areia Chalesco Premium",       "Grãos ultrafinos",       "37,90"],
            ["Areia Biodegradável Bambu",    "Ecológica e natural",    "49,90"]
        ],

        "Coleiras":[
            ["Coleira Chalesco com Sino",    "Ajustável e segura",              "24,90"],
            ["Coleira Zee.Cat P",            "Design moderno",                  "39,90"],
            ["Peitoral Furacão Pet Cat",     "Confortável e resistente",        "54,90"],
            ["Guia para Gato",               "Passeio seguro ao ar livre",      "44,90"],
            ["Coleira Antipulgas Gato",      "Proteção por 8 meses",            "59,90"]
        ],

        "Brinquedos":[
            ["Ratinho Catnip Chalesco",  "Com erva-gato",                   "19,90"],
            ["Varinha com Pena",         "Interativo e estimulante",         "24,90"],
            ["Laser Cat Toy",            "Estimula o instinto de caça",      "29,90"],
            ["Bolinha Sonora",           "Leve e divertida",                 "17,90"],
            ["Túnel Dobrável",           "Esconderijo e brincadeira",        "69,90"],
            ["Arranhador com Mola",      "Brinquedo interativo",             "44,90"]
        ],

        "Arranhadores":[
            ["Arranhador Poste Sisal",   "Compacto e resistente",           "89,90"],
            ["Arranhador Torre",         "Completo com plataformas",         "189,90"],
            ["Mini Arranhador",          "Ideal para espaços pequenos",      "59,90"],
            ["Arranhador Casa",          "2 em 1: descanso e arranhador",    "229,90"],
            ["Arranhador Horizontal",    "Para gatos que preferem o chão",   "74,90"]
        ],

        "Higiene & Saúde":[
            ["Shampoo Gatos Cat Zone",   "Banho suave e seguro",            "32,90"],
            ["Antipulgas Advocate",      "Proteção completa",                "94,90"],
            ["Escova Removedora",        "Remove pelos soltos",              "49,90"],
            ["Lenço Umedecido Pet",      "Limpeza rápida entre banhos",      "18,90"],
            ["Pasta Dental Gatos",       "Higiene bucal diária",             "29,90"]
        ]
    },

    // -----------------------------------------
    // CATEGORIA: COELHOS
    // -----------------------------------------
    Coelhos:{

        "Ração":[
            ["Nutrópica Coelhos",        "Completa e balanceada",    "44,90"],
            ["Alcon Club Coelhos",       "Vitaminada e saborosa",    "39,90"],
            ["MegaZoo Rabbit",           "Linha premium",            "49,90"],
            ["Zootekna Bunny",           "Uso diário",               "36,90"],
            ["Cunipic Alfa Pro Bunny",   "Importada premium",        "69,90"]
        ],

        "Feno":[
            ["Feno Tifton Natural",      "Fibra ideal para coelhos",     "24,90"],
            ["Feno Coast Cross",         "Premium selecionado",           "29,90"],
            ["Feno Bunny Hay",           "Cuidadosamente selecionado",    "32,90"],
            ["Feno Timothy Premium",     "Alto teor de fibras",           "39,90"]
        ],

        "Coleiras":[
            ["Peitoral Coelho P",    "Passeio leve e seguro",        "39,90"],
            ["Peitoral Coelho M",    "Ajustável e confortável",      "44,90"],
            ["Kit Guia Bunny",       "Guia + peitoral inclusos",     "49,90"]
        ],

        "Brinquedos":[
            ["Bola Natural Coelho",          "Mastigável e divertida",       "19,90"],
            ["Túnel Coelho",                 "Diversão e exercício",         "49,90"],
            ["Madeira Mordedor",             "Desgaste dental natural",      "22,90"],
            ["Brinquedo Atividade Bunny",    "Estimula o raciocínio",        "39,90"]
        ],

        "Tocas":[
            ["Toca Coelho Madeira",      "Charmosa e resistente",        "89,90"],
            ["Cabana Soft Bunny",        "Confortável e lavável",        "99,90"],
            ["Casa Mini Rabbit",         "Compacta e aconchegante",      "74,90"],
            ["Toca Dupla Andares",       "Espaçosa e divertida",         "139,90"]
        ],

        "Higiene & Saúde":[
            ["Granulado Higiênico",      "Super absorvente",             "29,90"],
            ["Escova Bunny Care",        "Remove pelos soltos",          "34,90"],
            ["Spray Higienizador",       "Limpeza sem estresse",         "27,90"],
            ["Vitamina C Coelhos",       "Suplementação essencial",      "24,90"]
        ]
    },

    // -----------------------------------------
    // CATEGORIA: AVES
    // -----------------------------------------
    Aves:{

        "Ração":[
            ["Nutrópica Calopsita",          "Premium balanceado",               "29,90"],
            ["Megazoo Canários",             "Ingredientes naturais",            "24,90"],
            ["Alcon Club Aves",              "Completa e saborosa",              "34,90"],
            ["Ração Papagaio Nutrópica",     "Especial para papagaios",          "39,90"],
            ["Ração Periquito Alcon",        "Enriquecida com vitaminas",        "27,90"]
        ],

        "Gaiolas":[
            ["Gaiola Chalesco Média",    "Prática e resistente",          "149,90"],
            ["Gaiola Monaco Grande",     "Espaçosa e elegante",           "229,90"],
            ["Gaiola Luxo Premium",      "Completa com acessórios",       "299,90"],
            ["Gaiola Dupla Andares",     "Máximo espaço para as aves",    "349,90"]
        ],

        "Poleiros":[
            ["Poleiro Madeira P",        "Natural e seguro",              "19,90"],
            ["Poleiro Médio",            "Confortável para as patas",     "24,90"],
            ["Poleiro Corda Flex",       "Diferente e divertido",         "34,90"],
            ["Poleiro Sisal",            "Natural e resistente",          "29,90"]
        ],

        "Sementes":[
            ["Mix Girassol",             "Selecionado e fresco",          "19,90"],
            ["Painço Premium",           "Natural e saudável",            "14,90"],
            ["Mix Tropical Seeds",       "Variedade tropical",            "22,90"],
            ["Alpiste Selecionado",      "Especial para canários",        "16,90"]
        ],

        "Ninhos":[
            ["Ninho Madeira",            "Confortável e natural",         "34,90"],
            ["Ninho Fibra Natural",      "Leve e ecológico",              "29,90"],
            ["Ninho Calopsita",          "Especial para calopsitas",      "39,90"],
            ["Ninho Pelúcia",            "Macio e aconchegante",          "44,90"]
        ],

        "Higiene & Saúde":[
            ["Vita Bird Complexo",       "Vitaminas essenciais",          "24,90"],
            ["Higienizador Gaiola",      "Limpeza e desinfecção",         "19,90"],
            ["Banheira para Aves",       "Banho diário higiênico",        "29,90"],
            ["Suplemento Cálcio Aves",   "Ossos e bico saudáveis",        "22,90"]
        ]
    },

    // -----------------------------------------
    // CATEGORIA: PEIXES
    // -----------------------------------------
    Peixes:{

        "Ração":[
            ["Alcon Basic Flocos",       "Nutritiva e palatável",             "19,90"],
            ["TetraMin Tropical",        "Linha premium importada",           "29,90"],
            ["Poytara Goldfish",         "Especial para carpas",              "24,90"],
            ["Betta Biofood",            "Para bettas combatentes",           "18,90"],
            ["Alcon Color",              "Realça a coloração dos peixes",     "22,90"],
            ["Ração Disco Alcon",        "Especial para peixes disco",        "34,90"]
        ],

        "Aquários":[
            ["Aquário Boyu 40L",         "Vidro reforçado completo",          "299,90"],
            ["Aquário Sunsun 60L",       "Completo com bomba e luz",          "399,90"],
            ["Aquário Nano Cube 20L",    "Compacto e elegante",               "219,90"],
            ["Aquário Panorâmico 80L",   "Visual deslumbrante",               "499,90"]
        ],

        "Filtros":[
            ["Filtro Sunsun HBL-301",        "Silencioso e eficiente",    "119,90"],
            ["Filtro Ocean Tech HF-0100",    "Boa vazão e durável",        "139,90"],
            ["Filtro Atman HF-0400",         "Confiável e potente",        "159,90"],
            ["Filtro Canister 600L/h",       "Alta capacidade",            "349,90"]
        ],

        "Decoração":[
            ["Castelo Aquário",          "Resina atóxica",                "39,90"],
            ["Planta Artificial",        "Visual natural bonito",         "19,90"],
            ["Pedra Decorativa",         "Natural e segura",              "24,90"],
            ["Coral Artificial",         "Visual tropical",               "34,90"],
            ["Areia Fina Branca",        "Substrato decorativo",          "29,90"]
        ],

        "Iluminação":[
            ["Luminária LED Aquário",    "Espectro completo de luz",      "79,90"],
            ["Barra LED 50cm",           "Econômica e durável",           "99,90"],
            ["Luz Azul Noturna",         "Efeito visual noturno",         "49,90"],
            ["LED RGB Colorido",         "Várias cores programáveis",     "139,90"]
        ],

        "Higiene & Saúde":[
            ["Condicionador Labcon",         "Trata a água na hora",          "24,90"],
            ["Anti Cloro Alcon",             "Proteção para os peixes",       "19,90"],
            ["Sifão de Limpeza",             "Troca de água fácil",           "39,90"],
            ["Sal Marinho Instantâneo",      "Para aquários marinhos",        "49,90"]
        ]
    },

    // -----------------------------------------
    // CATEGORIA: ROEDORES
    // -----------------------------------------
    Roedores:{

        "Ração":[
            ["Nutrópica Hamster",            "Completa e equilibrada",    "24,90"],
            ["Alcon Club Roedores",          "Natural e saborosa",        "22,90"],
            ["MegaZoo Porquinho-da-Índia",   "Linha premium",             "29,90"],
            ["Nutrópica Chinchila",          "Especial para chinchilas",  "34,90"],
            ["Alcon Club Gerbil",            "Ideal para gerbilos",       "26,90"]
        ],

        "Casinhas":[
            ["Casa Hamster Plástica",    "Confortável e segura",          "49,90"],
            ["Casa Madeira Roedor",      "Natural e resistente",          "59,90"],
            ["Casa Túnel",               "Divertida e estimulante",       "54,90"],
            ["Caverna Cerâmica",         "Mantém a temperatura ideal",    "69,90"]
        ],

        "Brinquedos":[
            ["Roda de Exercício",        "Saudável e silenciosa",         "39,90"],
            ["Ponte Madeira Natural",    "Segura e natural",              "27,90"],
            ["Bola Rolante",             "Diversão garantida",            "22,90"],
            ["Escada Madeira",           "Exercício e diversão",          "32,90"]
        ],

        "Rodas":[
            ["Roda P Silenciosa",        "Ideal para hamsters anões",     "29,90"],
            ["Roda M Resistente",        "Para hamsters sírios",          "39,90"],
            ["Roda G Premium",           "Para roedores maiores",         "49,90"],
            ["Roda Voadora LED",         "Ilumina enquanto gira",         "59,90"]
        ],

        "Serragem":[
            ["Serragem Higiênica Pipi Dog",  "Absorvente e macia",        "16,90"],
            ["Granulado Madeira",            "Sem odor e econômico",      "22,90"],
            ["Forração Premium",             "Confortável e natural",     "24,90"],
            ["Feno de Trigo",                "Cama natural e macia",      "19,90"]
        ],

        "Higiene & Saúde":[
            ["Spray Limpeza Habitat",    "Higiene sem estresse",          "24,90"],
            ["Escova Pequenos Pets",     "Pelos macios e limpos",         "19,90"],
            ["Vitaminas para Roedores",  "Saúde e vitalidade",            "29,90"],
            ["Areia de Banho Chinchila", "Limpeza natural",               "34,90"]
        ]
    }

}; // fim da base de dados


// =============================================
// ÍCONE SVG DO BOTÃO DE CARRINHO
// Ícone vetorial exibido no botão verde
// de cada card de produto.
// =============================================
const svgCarrinho = `
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
     fill="none" stroke="white" stroke-width="2.5"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="21" r="1"/>
  <circle cx="20" cy="21" r="1"/>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>`;


// =============================================
// MOSTRAR BOTÕES DE SUBCATEGORIA
// Gera os botões (ex: Ração, Coleiras...)
// com base na categoria selecionada.
// A quantidade foi removida dos botões.
// =============================================
function mostrarSubcategorias(nome){
    let html = "";
    const chaves = Object.keys(dados[nome]);

    chaves.forEach((item, index) => {
        html += `<button class="${index === 0 ? "ativo-sub" : ""}">${item}</button>`;
    });

    subcategorias.innerHTML = html;
    ativarSubcategorias(nome);
    mostrarProdutos(nome, chaves[0]);
}


// =============================================
// MOSTRAR CARDS DE PRODUTOS
// Gera os cards com nome, descrição, preço
// e botão de adicionar ao carrinho.
// Estrelas de avaliação foram removidas.
// =============================================
function mostrarProdutos(cat, sub){
    // Remove o "(número)" do nome da subcategoria caso ainda venha com ele
    sub = sub.replace(/\s*\(\d+\)/g, "").trim();

    const produtos = dados[cat][sub];
    let html = "";

    produtos.forEach((item) => {
        html += `
        <div class="card">

            <!-- Imagem do produto -->
            <div class="imagem-produto">
                <img src="../Img/produto1.png" alt="${item[0]}">
            </div>

            <!-- Nome do produto -->
            <h3>${item[0]}</h3>

            <!-- Descrição do produto -->
            <p>${item[1]}</p>

            <!-- Preço e botão do carrinho -->
            <div class="info">
                <span>R$ ${item[2]}</span>
                <button
                    onclick="adicionarAoCarrinho('${item[0].replace(/'/g,"\\'")}','${item[2]}','../Img/produto1.png')"
                    title="Adicionar ao carrinho">
                    ${svgCarrinho}
                </button>
            </div>

        </div>`;
    });

    listaProdutos.innerHTML = html;
}


// =============================================
// ATIVAR CLIQUE NOS BOTÕES DE SUBCATEGORIA
// Controla qual botão fica ativo e
// carrega os produtos correspondentes.
// =============================================
function ativarSubcategorias(nome){
    const botoes = document.querySelectorAll(".subcategorias button");
    botoes.forEach(botao => {
        botao.addEventListener("click", function(){
            botoes.forEach(btn => btn.classList.remove("ativo-sub"));
            this.classList.add("ativo-sub");
            mostrarProdutos(nome, this.textContent.trim());
        });
    });
}


// =============================================
// CLICAR NAS CATEGORIAS DO MENU LATERAL
// Ao clicar em uma categoria, atualiza
// o título, subcategorias e produtos.
// =============================================
categorias.forEach(item => {
    item.addEventListener("click", function(){

        // Remove destaque de todas as categorias
        categorias.forEach(li => li.classList.remove("ativo"));

        // Destaca a categoria clicada
        this.classList.add("ativo");

        // Lê o nome da categoria pelo atributo data-cat
        const nome = this.dataset.cat;

        // Nome no singular para o título da página
        const nomeExibido = nome === "Cachorros" ? "Cachorro"
            : nome === "Gatos"    ? "Gato"
            : nome === "Coelhos"  ? "Coelho"
            : nome === "Aves"     ? "Ave"
            : nome === "Peixes"   ? "Peixe"
            : "Roedor";

        // Atualiza o título da seção
        tituloPag.textContent = "Tudo para seu " + nomeExibido;

        // Carrega subcategorias e produtos da categoria
        mostrarSubcategorias(nome);
    });
});


// =============================================
// INICIALIZAÇÃO DA PÁGINA
// Executa ao carregar o site:
// — Mostra Cachorros como categoria padrão
// — Atualiza o badge com itens já salvos
// =============================================
mostrarSubcategorias("Cachorros");
atualizarBadge();
