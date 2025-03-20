document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    const currentPath = new URL(window.location.href).pathname;

    // Automatically removes the .html extension from the URL
    function cleanUrl() {
        try {
            if (currentPath.endsWith(".html") && !currentPath.includes("/")) {
                const newUrl = currentPath.replace(".html", "");
                document.title = document.title.replace(".html", ""); // Also updates the page title
                history.replaceState(null, "", newUrl);
            }
        } catch (error) {
            console.error("Error cleaning URL:", error);
        }
    }
    cleanUrl();

    // Add a header and navigation section if it doesn't exist
    function ensureHeader() {
        if (!document.querySelector("header")) {
            document.body.insertAdjacentHTML("afterbegin", `
                <header>
                    <nav class="navbar">
                        <ul class="nav-links">
                            <li><a href="/">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </header>
            `);
        }
    }
    ensureHeader();

    // Add an active class to the navigation
    function highlightNavLinks() {
        try {
            document.querySelectorAll(".nav-links a").forEach(link => {
                const linkPath = new URL(link.href, window.location.origin).pathname;
                if (currentPath === linkPath || (currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/")) {
                    link.classList.add("active");
                }
            });
        } catch (error) {
            console.error("Error highlighting navigation links:", error);
        }
    }
    highlightNavLinks();

    // Add favicons and manifest
    function ensureFavicons() {
        const favicons = [
            { href: "/favicon/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
            { href: "/favicon/favicon-32x32.png", rel: "icon", sizes: "32x32", type: "image/png" },
            { href: "/favicon/favicon-16x16.png", rel: "icon", sizes: "16x16", type: "image/png" },
            { href: "/favicon/site.webmanifest", rel: "manifest" }
        ];

        favicons.forEach(({ href, rel, sizes, type }) => {
            if (!document.querySelector(`link[href="${href}"]`)) {
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

    // Recognizes URLs from text and converts them into clickable links
    const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w!\/]*))?)/g;

    export default function createAnchors(message) {
        return message.replace(urlRegex, (match, ...args) => {
            if (/(src=|href=|mailto:)/.test(message.slice(Math.max(0, args[args.length - 2] - 7), args[args.length - 2]))) return match;
            const href = /^([a-zA-Z]+:)?\/\//.test(match) ? match : 'http://' + match;
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match.replace(/^www\./, '')}</a>`;
        });
    }

    // "Smooth scrolling" to internal links with event delegation
    document.body.addEventListener("click", function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute("href"));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        }
    });

    // Add a footer if it doesn't exist.
    function ensureFooter() {
        if (!document.querySelector("footer")) {
            document.body.insertAdjacentHTML("beforeend", `
                <footer>
                    <div class="footer-container">
                        <p class="footer-text">&copy; ${currentYear} | All rights reserved.</p>
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

    // Monitors if header or footer is removed and adds them back
    function observeDOMChanges() {
        const observer = new MutationObserver(() => {
            ensureHeader();
            ensureFooter();
            highlightNavLinks();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
    observeDOMChanges();
});
