// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('#navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }

    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.problem-card, .pillar, .strategy-card, .hardware-card, .future-card, .summary-item, .feature-box').forEach(el => {
    observer.observe(el);
});

// Add glitch effect on hover for hero title
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animation = 'glitch 0.3s ease';
    });

    glitchText.addEventListener('animationend', () => {
        glitchText.style.animation = '';
    });
}

// Add CSS for glitch effect dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }

    .nav-menu a.active {
        color: var(--primary-color);
        position: relative;
    }

    .nav-menu a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Counter animation for numbers
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate summary numbers when they come into view
const summaryNumbers = document.querySelectorAll('.summary-number');
const summaryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const targetValue = parseInt(number.textContent);
            if (!number.classList.contains('animated')) {
                animateCounter(number, targetValue);
                number.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

summaryNumbers.forEach(number => {
    summaryObserver.observe(number);
});

// Add hover effect to pipeline steps
document.querySelectorAll('.pipeline-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });

    step.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Mobile menu toggle (for responsive design)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const menu = document.querySelector('.nav-menu');

    // Only create hamburger on mobile
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            nav.insertBefore(hamburger, menu);

            // Add hamburger styles
            const hamburgerStyle = document.createElement('style');
            hamburgerStyle.textContent = `
                .hamburger {
                    display: none;
                    flex-direction: column;
                    cursor: pointer;
                    gap: 4px;
                }

                .hamburger span {
                    width: 25px;
                    height: 3px;
                    background: var(--text-light);
                    transition: 0.3s;
                }

                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }

                @media (max-width: 768px) {
                    .hamburger {
                        display: flex;
                    }

                    .nav-menu {
                        position: fixed;
                        left: -100%;
                        top: 70px;
                        flex-direction: column;
                        background: var(--dark-bg);
                        width: 100%;
                        text-align: center;
                        transition: 0.3s;
                        padding: 2rem 0;
                    }

                    .nav-menu.active {
                        left: 0;
                    }
                }
            `;
            document.head.appendChild(hamburgerStyle);

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                menu.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    menu.classList.remove('active');
                });
            });
        }
    }
};

// Initialize mobile menu
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for developers
console.log('%cPRISM Project', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cPrecision Relocation via Intelligent Slide Manipulation', 'color: #6c63ff; font-size: 14px;');
console.log('%cTeam 45 - EECS/ME 206A', 'color: #666; font-size: 12px;');
