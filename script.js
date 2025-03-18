document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = new URL(window.location.href).pathname;
    
    // Poistaa .html-päätteen URL:sta automaattisesti
    if (window.location.pathname.endsWith(".html") && !window.location.pathname.includes("/")) {
        const newUrl = window.location.pathname.replace(".html", "");
        document.title = document.title.replace(".html", ""); // Päivittää myös sivun otsikon
        history.replaceState(null, "", newUrl);
    }
    
    // Tarkista, onko navigaatio jo olemassa
    if (!document.querySelector("header")) {
        const headerHTML = `
            <header>
                <nav class="navbar">
                    <ul class="nav-links">
                        <li><a href="/">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
    }

    const header = document.querySelector("header");
    
    // Varmista, että navLinks löytyy ennen forEach-käyttöä
    if (navLinks.length > 0) {
        // Hakee sivun nimen ilman parametreja (esim. "index.html" tai "/")
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "" || currentPage === "index") currentPage = "/"; // Oletus etusivulle
    
        // Lisää aktiivinen tila navigointilinkille
        navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (currentPath === linkPath || currentPath.startsWith(linkPath + "/")) {
                link.classList.add("active");
            }
        });
    }
    
    // Lisää navigaation taustasumennus vieritettäessä
    let scrollTimeout;
    window.addEventListener("scroll", function () {
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(() => {
                let opacity = Math.min(0.8, window.scrollY / 300);
                header.style.background = `rgba(0, 0, 0, ${opacity})`;
                header.style.backdropFilter = window.scrollY > 10 ? "blur(10px)" : "none";
                scrollTimeout = null;
            });
        }
    });
    
    // Funktio faviconien lisäämiseen
    function addFavicon(href, rel, sizes, type) {
        const link = document.createElement("link");
        link.rel = rel;
        if (sizes) link.sizes = sizes;
        if (type) link.type = type;
        link.href = href;
        document.head.appendChild(link);
    }
    
    // Lisätään faviconit ja manifest
    addFavicon("/apple-touch-icon.png", "apple-touch-icon", "180x180");
    addFavicon("/favicon-32x32.png", "icon", "32x32", "image/png");
    addFavicon("/favicon-16x16.png", "icon", "16x16", "image/png");
    addFavicon("/site.webmanifest", "manifest");
    
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
