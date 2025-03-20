document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    const currentPath = new URL(window.location.href).pathname.split("?")[0];

    // Removes .html extension from the URL dynamically
    function cleanUrl() {
        try {
            if (currentPath.endsWith(".html")) {
                const newUrl = currentPath.replace(".html", "");
                document.title = document.title.replace(".html", "");
                history.replaceState(null, "", newUrl);
            }
        } catch (error) {
            console.error("Error cleaning URL:", error);
        }
    }
    cleanUrl();

    // Creates the header with a dynamically generated navigation menu
    function ensureHeader() {
        if (!document.querySelector("header")) {
            document.body.insertAdjacentHTML("afterbegin", `
                <header>
                    <nav class="navbar">
                        <ul class="nav-links">
                            ${generateNavLinks()}
                        </ul>
                    </nav>
                </header>
            `);
        }
    }

    function generateNavLinks() {
        const pages = [
            { name: "About", path: "/" },
            { name: "Contact", path: "/contact" },
        ];
        return pages.map(page => `<li><a href="${page.path}">${page.name}</a></li>`).join("\n");
    }
    ensureHeader();

    // Highlights the active navigation link
    function highlightNavLinks() {
        document.querySelectorAll(".nav-links a").forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname.split("?")[0];
            if (currentPath === linkPath || (currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
    highlightNavLinks();

    // Ensures favicons are present
    function ensureFavicons() {
        const favicons = [
            { href: "/favicon/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
            { href: "/favicon/favicon-32x32.png", rel: "icon", sizes: "32x32", type: "image/png" },
            { href: "/favicon/favicon-16x16.png", rel: "icon", sizes: "16x16", type: "image/png" },
            { href: "/favicon/site.webmanifest", rel: "manifest" }
        ];

        favicons.forEach(({ href, rel, sizes, type }) => {
            if (!document.querySelector(`link[rel='${rel}'][href='${href}']`)) {
                const link = document.createElement("link");
                link.rel = rel;
                if (sizes) link.sizes = sizes;
                if (type) link.type = type;
                link.href = href;
                document.head.appendChild(link);
            }
        });
    }
    ensureFavicons();

    // Smooth scrolling with fixed header offset
    document.body.addEventListener("click", function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute("href"));
            if (targetElement) {
                const offset = document.querySelector("header")?.offsetHeight || 0;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        }
    });

    // Ensures a footer is present
    function ensureFooter() {
        if (!document.querySelector("footer")) {
            document.body.insertAdjacentHTML("beforeend", `
                <footer>
                    <div class="footer-container">
                        <p class="footer-text">Copyright &copy; ${currentYear} Felix Äyräväinen. All rights reserved.</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/felix-ayravainen/" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                                     alt="LinkedIn-profile" class="social-icon">
                            </a>
                        </div>
                    </div>
                </footer>
            `);
        }
    }
    ensureFooter();

    // Monitors changes to the DOM and restores missing elements
    function observeDOMChanges() {
        const observer = new MutationObserver((mutations) => {
            let headerMissing = !document.querySelector("header");
            let footerMissing = !document.querySelector("footer");
            if (headerMissing) ensureHeader();
            if (footerMissing) ensureFooter();
            if (headerMissing || footerMissing) highlightNavLinks();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    observeDOMChanges();
});
