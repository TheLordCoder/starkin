document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();

    // Lisää navigointi vain, jos sitä ei ole vielä olemassa
    if (!document.querySelector("header")) {
        const navHTML = `
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Front page</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", navHTML);
    }

    // Lisää aktiivinen tila navigointilinkille
    const currentPage = window.location.pathname.split("/").pop().split("?")[0];
    const navLinks = document.querySelectorAll("nav a");
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // Lisää footer vain, jos sitä ei ole vielä olemassa
    if (!document.querySelector("footer")) {
        const footerHTML = `
            <footer>
                <div class="footer-container">
                    <p class="footer-text">&copy; ${currentYear} | All rights reserved</p>
                    <div class="social-links">
                        <a href="https://www.linkedin.com/in/felix-ayravainen" target="_blank">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                                 alt="LinkedIn-profile" class="social-icon">
                        </a>
                    </div>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML("beforeend", footerHTML);
    }
});
