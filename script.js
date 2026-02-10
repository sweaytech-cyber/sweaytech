// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Navbar background on scroll with dynamic opacity
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.92)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Stagger animations for multiple elements
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        }
    });
}, observerOptions);

// Observe service cards, portfolio items, and about items
document.querySelectorAll('.service-card, .portfolio-card, .about-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
});

// Portfolio cards with hover tilt effect
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Advanced form handling with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const businessType = contactForm.querySelector('select[name="business_type"]').value;
        const budget = contactForm.querySelector('select[name="budget"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        // Validation
        const errors = [];
        if (!name) errors.push('Name is required');
        if (!email) errors.push('Email is required');
        if (!businessType) errors.push('Please select your industry');
        if (!budget) errors.push('Please select your budget range');
        if (!message) errors.push('Message is required');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) errors.push('Please enter a valid email');
        
        if (errors.length > 0) {
            alert('Please fix the following:\n' + errors.join('\n'));
            return;
        }
        
        // Show success message
        const formButton = contactForm.querySelector('button[type="submit"]');
        const originalText = formButton.innerHTML;
        const originalBg = formButton.style.background;
        
        formButton.innerHTML = '<span>✓ Message Sent</span><span class="btn-arrow">→</span>';
        formButton.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
        formButton.disabled = true;
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            contactForm.reset();
            formButton.innerHTML = originalText;
            formButton.style.background = originalBg;
            formButton.disabled = false;
        }, 3000);
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href').slice(1);
        if (linkHref === current) {
            link.style.color = 'var(--accent-primary)';
        } else {
            link.style.color = '';
        }
    });
});

// Parallax effect on hero background elements
window.addEventListener('scroll', () => {
    const heroGradientBlur = document.querySelector('.hero-gradient-blur');
    const heroElements = document.querySelectorAll('.element');
    
    if (heroGradientBlur) {
        const scrollY = window.scrollY;
        heroGradientBlur.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    heroElements.forEach((el, index) => {
        const scrollY = window.scrollY;
        const speed = 0.2 + (index * 0.05);
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Count-up animation for stats
function animateCountUp(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        element.textContent = current + (element.textContent.match(/[a-zA-Z%+$]/g) || []).join('');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Trigger count-up when stats are visible
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            const text = entry.target.textContent.trim();
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                animateCountUp(entry.target, target);
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Floating animation for hero elements (already in CSS but enhance with JS)
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element, .hero-gradient-blur');
    elements.forEach(el => {
        const randomDuration = 15 + Math.random() * 10;
        el.style.animationDuration = randomDuration + 's';
    });
});

// Mouse move effect for interactive feedback on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.letterSpacing = '1.2px';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.letterSpacing = '';
    });
});

// Detect touch and add touch-specific classes
if ('ontouchstart' in window) {
    document.body.classList.add('touch-enabled');
    // Optimize animations for touch devices
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.style.transition = 'all 0.2s ease-out';
    });
}

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial opacity set
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Performance optimization: Lazy load animations on scroll
const lazyElements = document.querySelectorAll('[data-lazy]');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyObserver.unobserve(entry.target);
        }
    });
});

lazyElements.forEach(el => lazyObserver.observe(el));
