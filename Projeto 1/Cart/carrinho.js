// Quando o html carregar
document.addEventListener('DOMContentLoaded', function() {
	// Se o carrinho estiver vazio, adiciona exemplo
	if (getCart().length === 0) {
        console.log()
		saveCart([
			{ nome: 'Ração Premium 10kg', qtd: 2, preco: 80, imagem: '../Img/Produto.jpg' },
			{ nome: 'Brinquedo para Cachorro', qtd: 1, preco: 25, imagem: '../Img/Produto.jpg' },
            { nome: 'Cama para Gato', qtd: 1, preco: 150, imagem: '../Img/Produto.jpg' }
		]);
	}
    let carrinhoItens = getCart();
    console.log(carrinhoItens);
	renderCart();
});


// Funções utilitárias para LocalStorage
function getCart() {
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    console.log('Salvando carrinho:', cart);
	localStorage.setItem('cart', JSON.stringify(cart));
}

// Exemplo de estrutura de item do carrinho
// { nome: 'Ração Premium 10kg', qtd: 2, preco: 80, imagem: '../Img/Produto.jpg' }

// Renderiza o carrinho na tabela
function renderCart() {
    console.log('Renderizando carrinho...');
	const cart = getCart();
	const tbody = document.querySelector('.cart-table tbody');
	tbody.innerHTML = '';
	let total = 0;

	for (let idx = 0; idx < cart.length; idx++) { 
		const item = cart[idx];
		const tr = document.createElement('tr');

        console.log('Renderizando item:', item);

		tr.innerHTML = `
 			<td>
				<div class="product-info">
					<img src="${item.imagem}" alt="${item.nome}">
					<span>${item.nome}</span>
				</div>
			</td>
			<td class="quantity-cell">
				<button class="qty-btn qty-decrease" data-idx="${idx}" aria-label="Diminuir quantidade">-</button>
				<span class="qty-value">${item.qtd}</span>
				<button class="qty-btn qty-increase" data-idx="${idx}" aria-label="Aumentar quantidade">+</button>
			</td>
			<td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
			<td>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</td>
			<td><button class="remove-btn" data-idx="${idx}">Remover</button></td>
		`;
		tbody.appendChild(tr);
		total += item.preco * item.qtd;
	}
    


	document.querySelector('.cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Remove item do carrinho e ajusta quantidade
document.addEventListener('click', function(e) {
	if (e.target.classList.contains('remove-btn')) {
		const idx = parseInt(e.target.getAttribute('data-idx'), 10);
		const cart = getCart();
		if (!Number.isInteger(idx) || idx < 0 || idx >= cart.length) return;
		cart.splice(idx, 1);
		saveCart(cart);
		renderCart();
	}

	if (e.target.classList.contains('qty-increase') || e.target.classList.contains('qty-decrease')) {
		const idx = parseInt(e.target.getAttribute('data-idx'), 10);
		const cart = getCart();
		if (!Number.isInteger(idx) || idx < 0 || idx >= cart.length) return;
		if (e.target.classList.contains('qty-decrease')) {
			cart[idx].qtd = Math.max(1, cart[idx].qtd - 1);
		} else {
			cart[idx].qtd += 1;
		}
		saveCart(cart);
		renderCart();
	}
});

