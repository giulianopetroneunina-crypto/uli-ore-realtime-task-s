// JavaScript per ULI ORE Realtime Task

// Attesa che il DOM sia caricato
document.addEventListener('DOMContentLoaded', function() {
    console.log('ULI ORE Realtime Task - JavaScript caricato');
    
    // Inizializzazione delle funzioni
    initNavigation();
    initForm();
    initAnimations();
    initScrollEffects();
});

// Gestione della navigazione smooth
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Aggiorna l'URL senza ricaricare la pagina
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Gestione del form di contatto
function initForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validazione dei campi
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            let errorMessage = '';
            
            // Validazione nome
            if (name === '') {
                isValid = false;
                errorMessage += 'Il nome è obbligatorio.\n';
            }
            
            // Validazione email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'Inserisci un indirizzo email valido.\n';
            }
            
            // Validazione messaggio
            if (message === '') {
                isValid = false;
                errorMessage += 'Il messaggio è obbligatorio.\n';
            }
            
            if (isValid) {
                // Simulazione invio form
                showNotification('Messaggio inviato con successo! Ti contatteremo presto.', 'success');
                form.reset();
            } else {
                showNotification(errorMessage, 'error');
            }
        });
    }
}

// Sistema di notifiche
function showNotification(message, type = 'info') {
    // Rimuovi notifiche esistenti
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <p>${message}</p>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Stili per la notifica
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Gestore per chiudere la notifica
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-rimozione dopo 5 secondi
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Animazioni al scroll
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    
    // Observer per le animazioni delle sezioni
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Effetto parallax per l'header
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.pageYOffset;
        const opacity = Math.max(0.7, 1 - scrollY / 300);
        
        if (header) {
            header.style.background = `linear-gradient(135deg, rgba(102, 126, 234, ${opacity}) 0%, rgba(118, 75, 162, ${opacity}) 100%)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Animazioni generali
function initAnimations() {
    // Aggiungi CSS per le animazioni
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(300px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            padding: 0;
            line-height: 1;
        }
        
        .notification__close:hover {
            opacity: 0.7;
        }
        
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
    `;
    
    document.head.appendChild(style);
}

// Utility: Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Gestione responsive del menu (per future implementazioni)
function initMobileMenu() {
    // Placeholder per menu mobile
    console.log('Mobile menu initialized');
}

// Easter egg: Konami Code
let konamiSequence = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.keyCode);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.toString() === konamiCode.toString()) {
        showNotification('🎉 Hai scoperto l\'Easter Egg! Konami Code attivato!', 'success');
        document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 4s ease infinite';
        
        // Aggiungi animazione CSS
        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(easterEggStyle);
        
        konamiSequence = [];
    }
});

// Esporta funzioni per uso globale (se necessario)
window.ULI_ORE = {
    showNotification: showNotification,
    debounce: debounce
};

console.log('🚀 ULI ORE Realtime Task completamente inizializzato!');
