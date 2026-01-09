<?php
// --- CONFIGURAÇÃO (Seus Links) ---
$linkBrasil = "inicio.html";
$linkGringa = "https://camargobusiness.github.io/engajamento2026/";
// ---------------------------------

// Funçãozinha pra pegar o IP real do cara (mesmo se usar proxy/Cloudflare)
function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return $_SERVER['HTTP_X_FORWARDED_FOR'];
    return $_SERVER['REMOTE_ADDR'];
}

$user_ip = getUserIP();
$destino = $linkGringa; // Por padrão, considera gringo (segurança)

// --- LÓGICA DO GEOIP (Rastreio) ---
// Vamos consultar a API pra ver de onde esse IP é
// Coloquei um timeout de 2s pra não travar seu site se a API cair
$ctx = stream_context_create(array('http'=>
    array(
        'timeout' => 2 // Espera max 2 segundos
    )
));

// Faz a consulta (retorna JSON)
$apiUrl = "http://ip-api.com/json/{$user_ip}?fields=countryCode";
$json = @file_get_contents($apiUrl, false, $ctx);
$data = json_decode($json, true);

// Lógica Principal: Se a API respondeu e disse que é BR
if ($data && isset($data['countryCode'])) {
    if ($data['countryCode'] == 'BR') {
        $destino = $linkBrasil;
    } else {
        $destino = $linkGringa;
    }
} 
// --- PLANO B (Fallback do Idioma) ---
// Se a API falhou (deu null), vamos pelo idioma do navegador pra não perder o cliente
else {
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    if ($lang == 'pt') {
        $destino = $linkBrasil;
    } else {
        $destino = $linkGringa;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carregando...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0d0d0d;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: 'Courier New', Courier, monospace;
            overflow: hidden;
        }

        .loader {
            border: 4px solid #333;
            border-top: 4px solid #00ff88; /* Verde Hacker */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 0.8s linear infinite;
            margin-bottom: 25px;
            box-shadow: 0 0 20px #00ff8855;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .status-text {
            font-size: 1.1rem;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #00ff88;
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; text-shadow: 0 0 10px #00ff88; }
            100% { opacity: 0.6; }
        }
    </style>
</head>
<body>

    <div class="loader"></div>
    <div class="status-text">Carregando...</div>

    <script>
        // Pega a URL definida pelo PHP
        var urlDestino = "<?php echo $destino; ?>";

        // Delay maroto de 1.5s pro cara ver a animação e achar chique
        setTimeout(function() {
            window.location.href = urlDestino;
        }, 1500);
    </script>

</body>
</html>