document.addEventListener("DOMContentLoaded", function() {
    // tarkistaaa, onko footer jo olemassa
    if (!document.querySelector("footer")) {
        const footerHTML = `
            <footer>
                <p>&copy; 2025 | All rights reserved</p>
                <p>More information:</p>
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/felix-ayravainen" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                            alt="LinkedIn" class="social-icon">
                    </a>
                </div>
            </footer>
        `;

        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }
});
