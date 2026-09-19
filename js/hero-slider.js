// ==========================================
// HERO SLIDER — 4 Slides + Auto-Rotate + Smooth Transitions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const autoRotateDelay = 6000; // 6 seconds per slide
    let autoRotateTimer;

    // Show specific slide by index
    function showSlide(index) {
        // Wrap around logic
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentIndex = index;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentIndex) {
                slide.classList.add('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Reset timer on manual change
        resetAutoRotate();
    }

    // Next Slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Previous Slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Auto-rotate timer
    function startAutoRotate() {
        autoRotateTimer = setInterval(nextSlide, autoRotateDelay);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateTimer);
        startAutoRotate();
    }

    // Event Listeners — Arrows
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // Event Listeners — Dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider?.addEventListener('mouseenter', () => clearInterval(autoRotateTimer));
    slider?.addEventListener('mouseleave', startAutoRotate);

    // Start!
    startAutoRotate();
});