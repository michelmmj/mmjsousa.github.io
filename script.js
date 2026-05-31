/**
 * Função para obter localização do usuário e gerar rota para o estabelecimento
 */
function obterLocalizacao() {
    const statusElement = document.getElementById('status');
    const endereco = 'Rua+Jaracatiá+859+São+Paulo';

    if (navigator.geolocation) {
        // Mostrar mensagem de loading
        statusElement.innerHTML = '📍 Obtendo sua localização...';
        statusElement.classList.add('show');

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const mapsUrl = `https://www.google.com/maps/dir/${lat},${lon}/${endereco}`;
                
                // Abrir Google Maps com rota
                window.open(mapsUrl, '_blank');
                
                // Limpar mensagem
                statusElement.classList.remove('show');
            },
            function(error) {
                console.error('Erro de geolocalização:', error);
                
                let mensagem = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        mensagem = '❌ Permissão negada. Ative a localização nas configurações do seu navegador.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensagem = '⚠️ Localização indisponível. Verifique sua conexão.';
                        break;
                    case error.TIMEOUT:
                        mensagem = '⏱️ Tempo limite excedido ao obter localização.';
                        break;
                    default:
                        mensagem = '❌ Erro ao obter localização. Tente novamente.';
                }
                
                statusElement.innerHTML = mensagem;
                statusElement.classList.add('show');
                
                // Abrir Google Maps mesmo sem localização do usuário
                setTimeout(function() {
                    window.open(`https://www.google.com/maps/search/${endereco}`, '_blank');
                }, 2000);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        // Navegador não suporta geolocalização
        statusElement.innerHTML = '⚠️ Seu navegador não suporta geolocalização. Abrindo Google Maps...';
        statusElement.classList.add('show');
        window.open(`https://www.google.com/maps/search/${endereco}`, '_blank');
    }
}

/**
 * Smooth scroll para links internos
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Fechar mensagem de status ao clicar
 */
const statusElement = document.getElementById('status');
if (statusElement) {
    statusElement.addEventListener('click', function() {
        this.classList.remove('show');
    });
}