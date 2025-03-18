document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();

    // Tarkista, onko navigaatio jo olemassa
    if (!document.querySelector("header")) {
        const headerHTML = `
            <header>
                <nav class="navbar">
                    <ul class="nav-links">
                        <li><a href="index.html">Front page</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Varmista, että navLinks löytyy ennen forEach-käyttöä
    if (navLinks.length > 0) {
        // Hakee sivun nimen ilman parametreja (esim. index.html tai pelkkä "/")
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "") currentPage = "index.html"; // Oletus etusivulle

        // Lisää aktiivinen tila navigointilinkille
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // Lisää navigaation taustasumennus vieritettäessä
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) {
            header.style.background = "rgba(255, 255, 255, 0.8)";
            header.style.backdropFilter = "blur(15px)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.9)";
            header.style.backdropFilter = "blur(10px)";
        }
    });

    // Lisää footer, jos sitä ei ole vielä olemassa
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
