/**
 * MMJ SOUSA - Website JavaScript
 * Funcionalidades interativas e otimizações
 */

/**
 * Smooth scroll para links internos
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Função para obter localização do usuário e gerar rota para o estabelecimento
 */
function obterLocalizacao() {
    const endereco = 'Rua+Jaracatiá+859+São+Paulo';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const mapsUrl = `https://www.google.com/maps/dir/${lat},${lon}/${endereco}`;
                
                // Abrir Google Maps com rota
                window.open(mapsUrl, '_blank');
            },
            function(error) {
                console.error('Erro de geolocalização:', error);
                
                // Abrir Google Maps mesmo sem localização do usuário
                window.open(`https://www.google.com/maps/search/${endereco}`, '_blank');
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        // Navegador não suporta geolocalização
        window.open(`https://www.google.com/maps/search/${endereco}`, '_blank');
    }
}

/**
 * Lazy loading para imagens (se houver)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/**
 * Analytics - Rastrear cliques em links externos
 */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        const url = this.href;
        console.log('Link externo clicado:', url);
        
        // Aqui você pode adicionar código de analytics se necessário
        // Por exemplo: ga('send', 'event', 'External Link', 'Click', url);
    });
});

/**
 * Adicionar classe 'active' ao link de navegação baseado na seção visível
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Chamar função ao carregar a página
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

/**
 * Adicionar animação ao scroll para elementos
 */
function observeElements() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.card, .highlight').forEach(el => {
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', observeElements);

/**
 * Verificar suporte a recursos
 */
function checkBrowserSupport() {
    const features = {
        geolocation: 'geolocation' in navigator,
        localStorage: typeof(Storage) !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator
    };

    console.log('Browser Features:', features);
    return features;
}

document.addEventListener('DOMContentLoaded', checkBrowserSupport);

/**
 * Adicionar CSS dinâmico para animações ao scroll
 */
const style = document.createElement('style');
style.textContent = `
    .card, .highlight {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .card.animate-in, .highlight.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(style);

/**
 * Melhorar performance com requestAnimationFrame
 */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Adicionar lógica de scroll aqui se necessário
            ticking = false;
        });
        ticking = true;
    }
});

/**
 * Inicializar ao carregar a página
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('MMJ SOUSA Website carregado com sucesso!');
    
    // Adicionar classe ao body quando a página carrega
    document.body.classList.add('loaded');
});

/**
 * Tratamento de erro global
 */
window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
});

/**
 * Tratamento de promessas não tratadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promessa rejeitada não tratada:', event.reason);
});
