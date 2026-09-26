# PET&MI

> Loja virtual de produtos para pets, com catálogo por categoria, carrinho de compras e painel administrativo — feita em HTML, CSS e JavaScript puro.

![Banner](Projeto%201/Img/menu.jpg)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## Índice

[#índice](#índice)

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Páginas da aplicação](#páginas-da-aplicação)
- [Limitações conhecidas](#limitações-conhecidas)
- [Autores](#autores)
- [Licença](#licença)

## Sobre o projeto

[#sobre-o-projeto](#sobre-o-projeto)

O **PET&MI** é uma loja virtual de produtos para pets (cães, gatos, coelhos, aves, peixes e roedores), desenvolvida em HTML, CSS e JavaScript puro para a disciplina de Programação Web do Senac. Esta é a **Parte I** do projeto — a versão original em JavaScript puro, mais tarde reescrita em Angular no projeto [MusicCircus](https://github.com/Melibanio/MusicCircus) (com um catálogo diferente, de instrumentos musicais), reaproveitando a mesma estrutura de páginas, carrinho e painel administrativo.

Toda a aplicação roda direto no navegador, sem back-end: o catálogo de produtos vive em arrays JavaScript, e o carrinho, o usuário cadastrado e as alterações feitas pelo painel administrativo são persistidos em `localStorage`.

### Objetivo

- Praticar HTML semântico, CSS (variáveis, layout responsivo) e JavaScript puro (manipulação de DOM, eventos, `localStorage`);
- Estruturar uma aplicação multi-página com catálogo organizado por categoria e subcategoria;
- Implementar um fluxo completo de e-commerce — catálogo, carrinho e checkout — sem depender de um back-end;
- Simular autenticação e um painel administrativo com CRUD usando `localStorage` como camada de persistência.

## Funcionalidades

[#funcionalidades](#funcionalidades)

### Loja (área do cliente)

- [x] Página inicial com banner, categorias em destaque e produtos mais vendidos
- [x] Catálogo com 6 categorias (Cachorros, Gatos, Coelhos, Aves, Peixes, Roedores) e subcategorias (ração, brinquedos, higiene, etc.)
- [x] Carrinho de compras persistido em `localStorage`, com contador no cabeçalho
- [x] Checkout com validação de endereço e seleção de forma de entrega
- [x] Cadastro, login e recuperação de senha (usuário salvo em `localStorage`)
- [x] Perfil do usuário com edição de dados e upload de foto (preview local)
- [x] Página "Sobre Nós" com perguntas frequentes e informações da loja

### Administração

- [x] Painel administrativo protegido — acesso liberado só para o usuário cadastrado com e-mail iniciado em "adm" ou "dev"
- [x] Listagem de produtos com filtro por categoria, subcategoria e busca por nome
- [x] Cadastro, edição e exclusão de produtos, com modal de confirmação
- [x] Alterações refletidas automaticamente no catálogo da loja (via `localStorage`)
- [x] Notificações (toast) para cada operação

## Tecnologias

[#tecnologias](#tecnologias)

- **HTML5**
- **CSS3** — variáveis de cor e layout responsivo
- **JavaScript (ES6+)** — sem frameworks
- **Bootstrap 5.3** — via CDN, usado na página inicial
- **Remix Icon** e **Font Awesome** — ícones, via CDN
- **`localStorage`** — persistência de carrinho, usuário e catálogo administrado

## Estrutura do projeto

[#estrutura-do-projeto](#estrutura-do-projeto)

```
Projeto 1/
├── Home/         # Página inicial (menu.html/css/js)
├── Produtos/     # Catálogo: base de dados dos produtos, imagens e filtros
├── Cart/         # Carrinho de compras e checkout
├── Login/        # Login, cadastro, recuperação de senha e perfil
├── ADM/          # Painel administrativo (CRUD de produtos)
├── About/        # Página "Sobre Nós"
├── Img/          # Imagens usadas nas páginas
├── header.html   # Modelo de cabeçalho reaproveitado manualmente em cada página
└── cores.css     # Paleta de cores compartilhada (variáveis CSS)
```

## Como executar

[#como-executar](#como-executar)

1. Clone o repositório:
   ```bash
   git clone https://github.com/Melibanio/Pet-Mi.git
   ```
2. Abra `Projeto 1/Home/menu.html` em um servidor local (recomendado, pois as páginas usam caminhos absolutos a partir da raiz do site):
   - No VS Code, instale a extensão **Live Server** e clique com o botão direito em `menu.html` → "Open with Live Server"; ou
   - Com Node.js instalado: `npx serve "Projeto 1"`
3. Para acessar o painel administrativo, cadastre um usuário em `/Login/cadastro.html` com um e-mail iniciado em "adm" ou "dev" (ex.: `adm@petmi.com`) e faça login em `/Login/login.html`.

## Páginas da aplicação

[#páginas-da-aplicação](#páginas-da-aplicação)

| Página           | Caminho                     |
| ---------------- | ---------------------------- |
| Início           | `/Home/menu.html`            |
| Produtos         | `/Produtos/produtos.html`    |
| Carrinho         | `/Cart/carrinho.html`        |
| Login            | `/Login/login.html`          |
| Cadastro         | `/Login/cadastro.html`       |
| Recuperar senha  | `/Login/esqueciSenha.html`   |
| Perfil           | `/Login/perfil.html`         |
| Administração    | `/ADM/adm.html`              |
| Sobre nós        | `/About/sobrenos.html`       |

## Limitações conhecidas

[#limitações-conhecidas](#limitações-conhecidas)

- Não há back-end nem banco de dados: o cadastro de usuário e o catálogo administrado ficam salvos apenas no `localStorage` do navegador (somem se os dados do site forem limpos);
- A senha do usuário é salva em texto simples no `localStorage` — adequado para fins didáticos, mas não deve servir de referência para autenticação em produção;
- As páginas usam caminhos absolutos (ex.: `/Home/menu.html`), então o projeto funciona melhor servido por um servidor local do que aberto direto do sistema de arquivos.

## Autores

[#autores](#autores)

Projeto acadêmico (Senac — Programação Web), desenvolvido em equipe por [Melissa](https://github.com/Melibanio), [Laura](https://github.com/lauradmelo), [Marcos](https://github.com/elMarcola667) e [Murilo](https://github.com/Murilo328).

## Licença

[#licença](#licença)

Projeto acadêmico / de portfólio, sem licença formal definida até o momento.
