// Redireciona botão Sacar para /sacar/index.html
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('button').forEach(btn => {
		const txt = btn.textContent.replace(/\s+/g, '').toLowerCase();
		if (txt === 'sacar') {
			btn.addEventListener('click', function(e) {
				e.preventDefault();
				window.location.href = 'index2.html';
			});
		}
	});
});
// Countdown para o bloco Expira em do HTML principal
document.addEventListener('DOMContentLoaded', function () {
	const minEl = document.getElementById('main-timer-min');
	const secEl = document.getElementById('main-timer-sec');
	const msEl = document.getElementById('main-timer-ms');
	let total = 5 * 60; // 5 minutos
	function updateMainCountdown() {
		if (!minEl || !secEl || !msEl) return;
		const min = String(Math.floor(total/60)).padStart(2,'0');
		const sec = String(Math.floor(total%60)).padStart(2,'0');
		const ms = String(Math.floor((total*1000)%1000/10)).padStart(2,'0');
		minEl.textContent = min;
		secEl.textContent = sec;
		msEl.textContent = ms;
		total -= 1/30;
		if (total > 0) setTimeout(updateMainCountdown, 33);
	}
	updateMainCountdown();
});
// Exibe a div de prêmio sobreposta com countdown e botão para fechar
function showPrizeModal(valor = 542.82, tempo = 300) {
	// tempo em segundos
	if (document.getElementById('prize-modal')) return;
	const modal = document.createElement('div');
	modal.id = 'prize-modal';
	modal.style.position = 'fixed';
	modal.style.top = '0';
	modal.style.left = '0';
	modal.style.width = '100vw';
	modal.style.height = '100vh';
	modal.style.zIndex = '99999';
	modal.style.display = 'flex';
	modal.style.alignItems = 'center';
	modal.style.justifyContent = 'center';
	modal.style.background = 'rgba(0,0,0,0.18)';
	modal.innerHTML = `
		<div class="relative w-full max-w-[300px]" style="opacity: 1; transform: none;">
			<div class="flex justify-center relative z-10 -mb-8" style="transform: none;">
				<img src="https://ofertasemanattk.ru/assets/gol-2-CQxqmPpW.png" alt="Gol de Prêmios" class="w-24 h-24 object-contain">
			</div>
			<div class="bg-gradient-to-b from-[#FFF9E6] to-white rounded-2xl pt-10 px-4 pb-4 shadow-xl">
				<h2 class="text-lg font-bold text-center text-black mb-1">Gol de Prêmios</h2>
				<p class="text-center text-gray-500 text-sm leading-snug mb-3 px-2">Parabéns! Como parte de uma campanha de recompensas exclusiva.</p>
				<div class="text-center mb-3"><span class="text-3xl font-bold text-black" id="prize-valor">R$ &nbsp;${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
				<div class="mb-3"><div class="flex items-center justify-center gap-1.5"><span class="text-xs text-gray-500">Expira em</span><div class="flex items-center gap-1"><div class="bg-[#F0F0F0] text-gray-700 text-xs font-semibold w-[30px] h-[30px] rounded-md flex items-center justify-center" id="prize-min">00</div><span class="text-gray-400 font-medium text-sm">:</span><div class="bg-[#F0F0F0] text-gray-700 text-xs font-semibold w-[30px] h-[30px] rounded-md flex items-center justify-center" id="prize-sec">00</div><span class="text-gray-400 font-medium text-sm">:</span><div class="bg-[#F0F0F0] text-gray-700 text-xs font-semibold w-[30px] h-[30px] rounded-md flex items-center justify-center" id="prize-ms">00</div></div></div></div>
				<div class="border-t border-dashed border-gray-300 my-3"></div>
				<button class="w-full bg-[#E94560] hover:bg-[#d63d56] text-white font-bold py-3 rounded-full text-base transition-colors" tabindex="0" id="prize-btn">Obrigado</button>
			</div>
		</div>
	`;
	document.body.appendChild(modal);

	// Countdown funcional
	let t = tempo;
	function updateCountdown() {
		if (t < 0) return;
		const min = String(Math.floor(t/60)).padStart(2,'0');
		const sec = String(Math.floor(t%60)).padStart(2,'0');
		const ms = String(Math.floor((t*1000)%1000/10)).padStart(2,'0');
		document.getElementById('prize-min').textContent = min;
		document.getElementById('prize-sec').textContent = sec;
		document.getElementById('prize-ms').textContent = ms;
		t -= 1/30;
		if (t > 0) setTimeout(updateCountdown, 33);
	}
	updateCountdown();

	// Botão para fechar
	document.getElementById('prize-btn').onclick = () => {
		modal.remove();
	};
}

// Exemplo: mostrar modal após 2s
setTimeout(() => {
	showPrizeModal();
	// Só dispara os fogos/confetes depois de fechar o modal
	const btn = document.getElementById('prize-btn');
	if (btn) {
		btn.addEventListener('click', () => {
			setTimeout(() => showConfetti(), 300);
		}, { once: true });
	}
}, 2000);
// Animação do saldo subindo
document.addEventListener('DOMContentLoaded', function () {
	const saldoEls = document.querySelectorAll('h1, h2');
	const valorFinal = 542.82; // Valor final do saldo
	const duracao = 2000; // ms
	saldoEls.forEach(el => {
		if (el.textContent.includes('R$')) {
			let start = 0;
			let startTime = null;
			function animateSaldo(ts) {
				if (!startTime) startTime = ts;
				const progress = Math.min((ts - startTime) / duracao, 1);
				const valor = (progress * valorFinal).toFixed(2);
				el.innerHTML = 'R$ &nbsp;' + valor.replace('.', ',');
				if (progress < 1) {
					requestAnimationFrame(animateSaldo);
				} else {
					el.innerHTML = 'R$ &nbsp;' + valorFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
					showConfetti();
				}
			}
			requestAnimationFrame(animateSaldo);
		}
	});

	// Efeito de confete animado e saldo brilhando
	function showConfetti() {
		const saldoEls = document.querySelectorAll('h1, h2');
		saldoEls.forEach(el => {
			if (el.textContent.includes('R$')) {
				el.classList.add('saldo-brilho');
				setTimeout(() => el.classList.remove('saldo-brilho'), 1200);
			}
		});
		for (let i = 0; i < 40; i++) {
			const conf = document.createElement('div');
			const size = 8 + Math.random()*12;
			const rot = Math.random()*360;
			const dur = 1000 + Math.random()*800;
			const left = Math.random() * 90 + 5;
			conf.style.position = 'fixed';
			conf.style.left = left + 'vw';
			conf.style.top = '100vh';
			conf.style.width = size + 'px';
			conf.style.height = size + 'px';
			conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
			conf.style.background = `hsl(${Math.random()*360},80%,60%)`;
			conf.style.zIndex = 9999;
			conf.style.opacity = 0.85;
			conf.style.transform = `rotate(${rot}deg)`;
			conf.style.transition = `top ${dur}ms cubic-bezier(.4,2,.6,1), opacity 1.2s, left ${dur}ms linear, transform ${dur}ms linear`;
			document.body.appendChild(conf);
			setTimeout(() => {
				conf.style.top = (20 + Math.random()*30) + 'vh';
				conf.style.left = (left + (Math.random()*60-30)) + 'vw';
				conf.style.opacity = 0;
				conf.style.transform = `rotate(${rot + 160}deg)`;
			}, 50);
			setTimeout(() => conf.remove(), dur+500);
		}
	}

// CSS para brilho/pulso no saldo
const style = document.createElement('style');
style.innerHTML = `
.saldo-brilho {
	animation: saldoPulse 1.2s cubic-bezier(.4,2,.6,1);
	box-shadow: 0 0 16px 4px #ff2d55, 0 0 32px 8px #fff1f5;
}
@keyframes saldoPulse {
	0% { box-shadow: 0 0 0 0 #ff2d55; }
	50% { box-shadow: 0 0 16px 4px #ff2d55, 0 0 32px 8px #fff1f5; }
	100% { box-shadow: 0 0 0 0 #ff2d55; }
}
`;
document.head.appendChild(style);
});
