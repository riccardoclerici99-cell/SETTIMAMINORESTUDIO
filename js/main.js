document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Custom cursor solo se esiste (rimossa la parte che causava errore)
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (dot && outline) {
        document.addEventListener('mousemove', (e) => {
            dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
            outline.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
        });
        document.addEventListener('mouseenter', () => {
            dot.style.opacity = '1';
            outline.style.opacity = '1';
        });
        // rimossa la parte incriminata che causava errore
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Grazie! Ti risponderemo entro 24 ore.');
            contactForm.reset();
        });
    }
});
