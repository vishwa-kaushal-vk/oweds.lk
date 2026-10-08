function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal, { passive: true });
window.addEventListener('load', reveal);
