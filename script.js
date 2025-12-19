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
const navbar = document.querySelector('#navbar');

// Keep navbar visible; only adjust shadow when scrolled
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
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

// Build letter-by-letter reveal for hero title
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const raw = glitchText.getAttribute('data-text')?.trim() || glitchText.textContent.trim();
    glitchText.textContent = '';
    raw.split('').forEach((char, idx) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--d', idx);
        glitchText.appendChild(span);
    });
    glitchText.setAttribute('aria-label', raw);
    const triggerReveal = () => glitchText.classList.add('reveal');
    requestAnimationFrame(triggerReveal);
    window.addEventListener('load', triggerReveal, { once: true });
}

// Add CSS for glitch effect dynamically
const style = document.createElement('style');
style.textContent = `
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

// Parallax and scale effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroVisual = document.querySelector('.hero-visual');

const updateHeroMotion = () => {
    const scrolled = window.pageYOffset;
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }

    if (hero && heroVisual) {
        const heroHeight = hero.offsetHeight || window.innerHeight;
        const progress = Math.min(Math.max(scrolled / heroHeight, 0), 1);
        const scale = 1.1 + progress * 0.35;
        const translateY = progress * -40;
        const rotate = progress * 2.5;
        heroVisual.style.transform = `translate(-50%, -50%) scale(${scale}) translateY(${translateY}px) rotate(${rotate}deg)`;
        heroVisual.style.opacity = 1 - progress * 0.12;
    }
};

window.addEventListener('scroll', updateHeroMotion);
window.addEventListener('resize', updateHeroMotion);
window.addEventListener('load', updateHeroMotion);

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

// Kernel slider for detection visualization
const kernelSlider = document.getElementById('kernel-slider');
const kernelValue = document.getElementById('kernel-value');
const kernelImage = document.getElementById('kernel-image');
const glassSlideIndicator = document.getElementById('glass-slide-indicator');

const updateKernelImage = () => {
    if (!kernelSlider || !kernelValue || !kernelImage) return;
    const sliderVal = Number(kernelSlider.value);
    const fileIndex = sliderVal - 1; // files are 0-based
    kernelImage.src = `images/25_kernels/yellow_convolved_${fileIndex}.png`;
    kernelValue.textContent = sliderVal;

    // Show "glass slide detected" indicator for kernel indices 4, 10, 15, 20
    if (glassSlideIndicator) {
        if (sliderVal === 4 || sliderVal === 10 || sliderVal === 15 || sliderVal === 20) {
            glassSlideIndicator.style.display = 'block';
        } else {
            glassSlideIndicator.style.display = 'none';
        }
    }
};

if (kernelSlider) {
    kernelSlider.addEventListener('input', updateKernelImage);
    updateKernelImage();
}
