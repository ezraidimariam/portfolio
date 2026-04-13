// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#1a202c';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = '#1a202c';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items animation
document.querySelectorAll('.skill-item').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.style.animation = 'fadeInUp 0.6s ease-out forwards';
});

// Enhanced typing effect for hero title
function typeWriter() {
    const text = "Hi, I'm Mariam Ezraidi";
    const heroTitle = document.querySelector('.hero-title');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            heroTitle.innerHTML = text.slice(0, index + 1) + '<span class="cursor">|</span>';
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                heroTitle.innerHTML = text;
            }, 1000);
        }
    }
    
    // Start typing after page load
    setTimeout(type, 500);
}

// Add cursor styling
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: white;
        font-weight: 100;
    }
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Initialize typing effect
window.addEventListener('load', typeWriter);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Form validation (if you add a contact form later)
function validateForm(email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (message.trim().length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#48bb78';
    } else if (type === 'error') {
        notification.style.background = '#f56565';
    } else {
        notification.style.background = '#667eea';
    }
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced loading animation for projects
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Add shimmer effect after animation
            setTimeout(() => {
                card.classList.add('shimmer');
                setTimeout(() => {
                    card.classList.remove('shimmer');
                }, 2000);
            }, 300);
        }, index * 200);
    });
}

// Enhanced skill items animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px) scale(0.8)';
        skill.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateProjects();
    setTimeout(animateSkills, 500);
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease-in-out';
    showNotification('You found the secret! Welcome to the rainbow! ', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Add enhanced rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) brightness(1); }
        25% { filter: hue-rotate(90deg) brightness(1.1); }
        50% { filter: hue-rotate(180deg) brightness(1.2); }
        75% { filter: hue-rotate(270deg) brightness(1.1); }
        100% { filter: hue-rotate(360deg) brightness(1); }
    }
    
    @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
    }
    
    .shimmer {
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Your scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console greeting
console.log('%c Welcome to Mariam\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore the code! ', 'background: #f8fafc; color: #4a5568; font-size: 14px; padding: 8px; border-radius: 5px;');

// Extraordinary Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 80;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
        this.animate();
        this.addMouseInteraction();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b', '#fb5607'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.6 + 0.2,
            color: color,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        };
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    updateParticle(particle) {
        // Mouse interaction
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.speedX -= (dx / distance) * force * 0.2;
            particle.speedY -= (dy / distance) * force * 0.2;
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Pulse effect
        particle.pulsePhase += particle.pulseSpeed;
        
        // Boundary check with smooth bounce
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.speedX *= -0.9;
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.speedY *= -0.9;
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        }
        
        // Add some randomness
        particle.speedX += (Math.random() - 0.5) * 0.01;
        particle.speedY += (Math.random() - 0.5) * 0.01;
        
        // Speed limit
        const maxSpeed = 2;
        particle.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, particle.speedX));
        particle.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, particle.speedY));
    }

    drawParticle(particle) {
        const pulseSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.3);
        
        // Glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = particle.color;
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        this.ctx.fill();
        
        // Inner glow
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, pulseSize * 0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + '40';
        this.ctx.fill();
        
        this.ctx.shadowBlur = 0;
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const opacity = 0.2 * (1 - distance / 200);
                    
                    // Create gradient for connection
                    const gradient = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );
                    gradient.addColorStop(0, this.particles[i].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                    gradient.addColorStop(1, this.particles[j].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    
                    // Add glow effect to connections
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = this.particles[i].color;
                    this.ctx.stroke();
                    this.ctx.shadowBlur = 0;
                    this.ctx.lineWidth = 1;
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Particle system disabled for professional design
// new ParticleBackground();
