document.addEventListener("DOMContentLoaded", function() {
    const footerHTML = `
        <footer>
            <p>&copy; 2025 Verkkosivuni | Kaikki oikeudet pidätetään</p>
            <p>Seuraa minua:</p>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/KAYTTAJANIMI" target="_blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                        alt="LinkedIn" class="social-icon">
                </a>
                <a href="https://github.com/KAYTTAJANIMI" target="_blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" 
                        alt="GitHub" class="social-icon">
                </a>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
