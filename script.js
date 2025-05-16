// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Cursor Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button, input, .service-card, .portfolio-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Scroll Progress
window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
function scrollReveal() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Animate elements on load
document.querySelectorAll('[data-aos]').forEach(element => {
    const animation = element.getAttribute('data-aos');
    const delay = element.getAttribute('data-aos-delay') || 0;
    
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease';
    
    if (animation === 'fade-up') {
        element.style.transform = 'translateY(30px)';
    } else if (animation === 'fade-down') {
        element.style.transform = 'translateY(-30px)';
    } else if (animation === 'fade-left') {
        element.style.transform = 'translateX(-30px)';
    } else if (animation === 'fade-right') {
        element.style.transform = 'translateX(30px)';
    } else if (animation === 'zoom-in') {

element.style.transform = 'scale(0.9)';
    }
    
    element.style.transitionDelay = delay + 'ms';
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.querySelector('.testimonial-dots');

// Create dots
slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    showSlide(index);
}

document.querySelector('.testimonial-next').addEventListener('click', nextSlide);
document.querySelector('.testimonial-prev').addEventListener('click', prevSlide);

// Auto slide
setInterval(nextSlide, 5000);

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateCounters() {
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionPosition < windowHeight - 100) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateCounters);
    }
}

window.addEventListener('scroll', animateCounters);

// Form Submission
const contactForm = document.getElementById('serviceRequestForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For demo purposes, we'll just show an alert
        alert(`Thank you, ${data.name}! Your service request has been received. We'll contact you soon at ${data.phone}.`);
        
        // Reset form
        this.reset();
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero title animation
gsap.from('.hero-title span', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.6,
    ease: "power3.out"
});

gsap.from('.hero-buttons', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.9,
    ease: "power3.out"
});

// Section animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",

toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
    });
});

// Portfolio items animation
gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
    });
});

// Brands slider animation
const brands = gsap.utils.toArray('.brand-slide');
gsap.to(brands, {
    xPercent: -100 * (brands.length - 4),
    ease: "none",
    scrollTrigger: {
        trigger: ".brands",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});




