// Quando o html carregar
document.addEventListener('DOMContentLoaded', function() {
	// inicia sem itens; o carrinho ficará vazio até adicionar a partir de Produtos
	let carrinhoItens = getCart();
	console.log(carrinhoItens);
	renderCart();
	setupCheckoutHandler();
	updateCheckoutButtonState();
});


// Funções utilitárias para LocalStorage
const STORAGE_KEY = 'petmi_carrinho';

function getCart() {
	const cart = localStorage.getItem(STORAGE_KEY);
	return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
	console.log('Salvando carrinho:', cart);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// =============================================
// ADICIONAR PRODUTO AO CARRINHO
// Chamado ao clicar nos botões de produtos favoritos
// =============================================
function adicionarAoCarrinho(nome, preco, imagem = '../Img/produto1.png'){
	// converte "129,90" -> 129.90
	const precoNum = typeof preco === 'string'
		? parseFloat(preco.replace(/\./g,'').replace(',','.'))
		: Number(preco);

	const cart = getCart();
	const idx = cart.findIndex(i => i.nome === nome);
	if(idx >= 0){
		cart[idx].qtd++;
	} else {
		cart.push({ nome, preco: precoNum, qtd: 1, imagem });
	}
	saveCart(cart);
	renderCart();
	updateCheckoutButtonState();
	showToast(`"${nome}" adicionado ao carrinho!`);
}

// Exemplo de estrutura de item do carrinho
// { nome: 'Ração Premium 10kg', qtd: 2, preco: 80, imagem: '../Img/Produto.jpg' }

// Renderiza o carrinho na tabela
function renderCart() {
    console.log('Renderizando carrinho...');
	const cart = getCart();
	const emptyMessage = document.querySelector('.empty-message');
	const addressBox = document.querySelector('.address-box');
	const cartTable = document.querySelector('.cart-table');
	const tbody = cartTable.querySelector('tbody');
	tbody.innerHTML = '';
	let total = 0;

	if (cart.length === 0) {
		emptyMessage.style.display = 'block';
		addressBox.style.display = 'none';
		document.getElementById('deliveryOptions').style.display = 'none';
		cartTable.style.display = 'none';
		document.querySelector('.cart-summary').style.display = 'none';
		document.querySelector('.checkout-btn').style.display = 'none';
		return;
	}

	emptyMessage.style.display = 'none';
	addressBox.style.display = 'block';
	cartTable.style.display = 'table';
	document.querySelector('.cart-summary').style.display = 'flex';
	document.querySelector('.checkout-btn').style.display = 'block';

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
    


	document.querySelector('.subtotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
	updateCartTotal(total);
}

// Atualiza o total com a taxa de entrega selecionada
function updateCartTotal(subtotal) {
	const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
	const deliveryPrice = selectedDelivery ? parseFloat(selectedDelivery.getAttribute('data-price')) : 0;
	const total = subtotal + deliveryPrice;
	
	document.querySelector('.delivery-cost').textContent = `R$ ${deliveryPrice.toFixed(2).replace('.', ',')}`;
	document.querySelector('.cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ==========================================
// CONTROLE DO BOTÃO 'FINALIZAR COMPRA'
// Habilita o botão somente quando o endereço
// estiver preenchido e uma forma de entrega
// estiver selecionada. Ao finalizar, mostra
// mensagem e limpa o carrinho.
// ==========================================

function isAddressValid() {
	const city = document.getElementById('city');
	const address = document.getElementById('address');
	const house = document.getElementById('houseNumber');
	return city && address && house &&
		city.value.trim() !== '' &&
		address.value.trim() !== '' &&
		house.value.trim() !== '';
}

function isDeliverySelected() {
	return !!document.querySelector('input[name="delivery"]:checked');
}

function updateCheckoutButtonState() {
	const btn = document.querySelector('.checkout-btn');
	if(!btn) return;
	btn.disabled = !(isAddressValid() && isDeliverySelected());
}

// Adiciona comportamento ao botão de finalizar
function setupCheckoutHandler(){
	const btn = document.querySelector('.checkout-btn');
	if(!btn) return;
	btn.addEventListener('click', function(){
		if(this.disabled) return;
		showToast('Compra Realizada');
		// limpa o carrinho após confirmação
		saveCart([]);
		renderCart();
		updateCheckoutButtonState();
	});
}

// NOTIFICAÇÃO (TOAST)
let toastTimer;
function showToast(msg, duration = 2800){
	let notif = document.querySelector('.notificacao');
	if(!notif){
		notif = document.createElement('div');
		notif.className = 'notificacao';
		document.body.appendChild(notif);
	}
	notif.textContent = msg;
	notif.classList.add('visivel');
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => notif.classList.remove('visivel'), duration);
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

// ======================================
// VALIDAÇÃO DE ENDEREÇO E ENTREGA
// ======================================

const cityInput = document.getElementById('city');
const addressInput = document.getElementById('address');
const houseNumberInput = document.getElementById('houseNumber');
const showDeliveryBtn = document.getElementById('showDeliveryBtn');
const deliveryOptions = document.getElementById('deliveryOptions');

function validateAddressForm() {
	const isValid = cityInput.value.trim() !== '' && 
				   addressInput.value.trim() !== '' && 
				   houseNumberInput.value.trim() !== '';
	showDeliveryBtn.disabled = !isValid;
	updateCheckoutButtonState();
}

// Validar ao digitar
cityInput.addEventListener('input', validateAddressForm);
addressInput.addEventListener('input', validateAddressForm);
houseNumberInput.addEventListener('input', validateAddressForm);

// Mostrar opções de entrega ao clicar no botão
showDeliveryBtn.addEventListener('click', function() {
	deliveryOptions.style.display = 'block';
	deliveryOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Atualiza o total sempre que a forma de entrega for escolhida
document.querySelectorAll('input[name="delivery"]').forEach(function(radio) {
	radio.addEventListener('change', function() {
		const subtotal = getCart().reduce(function(acc, item) {
			return acc + item.preco * item.qtd;
		}, 0);
		updateCartTotal(subtotal);
		updateCheckoutButtonState();
	});
});

