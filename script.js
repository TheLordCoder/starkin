document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear();
    let currentPath = new URL(window.location.href).pathname.split("?")[0];

    // Removes .html extension dynamically from the URL
    const cleanUrl = () => {
        if (currentPath.endsWith(".html")) {
            currentPath = currentPath.replace(".html", "");
            document.title = document.title.replace(".html", "");
            history.replaceState(null, "", currentPath);
        }
    };
    cleanUrl();

    // Ensures the navigation header exists
    const ensureHeader = () => {
        if (!document.querySelector("header")) {
            document.body.insertAdjacentHTML("afterbegin", `
                <header>
                    <nav class="navbar">
                        <ul class="nav-links">${generateNavLinks()}</ul>
                    </nav>
                </header>
            `);
            highlightNavLinks();
        }
    };

    // Generates navigation links dynamically
    const generateNavLinks = () => {
        const pages = [
            { name: "About", path: "/" },
            { name: "Contact", path: "/contact" }
        ];
        return pages.map(page => `<li><a href="${page.path}">${page.name}</a></li>`).join("");
    };
    ensureHeader();

    // Highlights the active navigation link
    const highlightNavLinks = () => {
        document.querySelectorAll(".nav-links a").forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname.split("?")[0];
            link.classList.toggle("active", currentPath === linkPath || (currentPath.startsWith(linkPath) && currentPath[linkPath.length] === "/"));
        });
    };
    highlightNavLinks();

    // Ensures the necessary favicons exist
    const ensureFavicons = () => {
        const favicons = [
            { href: "/favicon/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
            { href: "/favicon/favicon-32x32.png", rel: "icon", sizes: "32x32", type: "image/png" },
            { href: "/favicon/favicon-16x16.png", rel: "icon", sizes: "16x16", type: "image/png" },
            { href: "/favicon/site.webmanifest", rel: "manifest" }
        ];

        favicons.forEach(({ href, rel, sizes, type }) => {
            if (!document.querySelector(`link[rel='${rel}'][href='${href}']`)) {
                const link = Object.assign(document.createElement("link"), { rel, href, ...(sizes && { sizes }), ...(type && { type }) });
                document.head.appendChild(link);
            }
        });
    };
    ensureFavicons();

    // Smooth scrolling with header offset
    document.body.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute("href"));
            if (targetElement) {
                const offset = document.querySelector("header")?.offsetHeight || 0;
                window.scrollTo({ top: targetElement.offsetTop - offset, behavior: "smooth" });
            }
        }
    });

    // Ensures the footer exists
    const ensureFooter = () => {
        if (!document.querySelector("footer")) {
            document.body.insertAdjacentHTML("beforeend", `
                <footer>
                    <div class="footer-container">
                        <p class="footer-text">Copyright &copy; ${currentYear} Felix Äyräväinen. All rights reserved.</p>
                        <div class="social-links">
                            <a href="https://www.linkedin.com/in/felix-ayravainen/" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
                                     alt="LinkedIn profile" class="social-icon">
                            </a>
                        </div>
                    </div>
                </footer>
            `);
        }
    };
    ensureFooter();

    // Observes DOM changes and restores missing elements
    new MutationObserver(() => {
        if (!document.querySelector("header")) {
            ensureHeader();
            highlightNavLinks();
        }
        if (!document.querySelector("footer")) ensureFooter();
    }).observe(document.body, { childList: true, subtree: true });
});
