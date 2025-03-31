document.addEventListener("DOMContentLoaded", () => {
     // Removes .html extension dynamically from the URL
     function cleanUrl() {
          let currentPath = new URL(window.location.href).pathname.split("?")[0];
          
          if (currentPath.endsWith(".html")) {
               const newPath = currentPath.replace(".html", "");
               document.title = document.title.replace(".html", "");
               history.replaceState(null, "", newPath);
          }
     } cleanUrl();
     
     // Ensures the header and navigation exists
     function ensureHeader() {
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
     } ensureHeader();
     
     // Generates navigation links dynamically
     function generateNavLinks() {
          const pages = [
               { name: "About", path: "/" },
               { name: "Contact", path: "/contact" }
          ];
          return pages.map(page => `<li><a href="${page.path}">${page.name}</a></li>`).join("");
     }
     
     // Highlights the active navigation link
     function highlightNavLinks() {
          const currentPath = new URL(window.location.href).pathname.split("?")[0];
          
          document.querySelectorAll(".nav-links a").forEach(link => {
               const linkPath = new URL(link.href, window.location.origin).pathname.split("?")[0];
               link.classList.toggle("active", currentPath === linkPath || (currentPath.startsWith(linkPath) && (currentPath[linkPath.length] === "/" || currentPath[linkPath.length] === undefined)));
          });
     } highlightNavLinks();
     
     // Ensures the favicons exist
     function ensureFavicons() {
          const icons = [
               { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png" },
               { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png" },
               { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png" },
               { rel: "manifest", href: "/favicon/site.webmanifest" }
          ];
          
          icons.forEach(iconData => {
               if (!document.querySelector(`link[href='${iconData.href}']`)) {
                    const link = document.createElement("link");
                    Object.entries(iconData).forEach(([key, value]) => link.setAttribute(key, value));
                    document.head.appendChild(link);
               }
          });
     } ensureFavicons();
     
     // Smooth scrolling with header offset
     function setupSmoothScrolling() {
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
     } setupSmoothScrolling();
     
     // Ensures the footer exists
     function ensureFooter() {
          if (!document.querySelector("footer")) {
               const footer = document.createElement("footer");
               footer.innerHTML = `
               <div class="footer-container">
               <p class="footer-text">Copyright &copy; ${new Date().getFullYear()} Stark. All rights reserved.</p>
               <div class="social-links">
               <a href="https://www.linkedin.com/in/felix-ayravainen/" target="_blank">
               <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" 
               alt="LinkedIn profile" class="social-icon">
               </a>
               </div>
               </div>
               `;
               document.body.appendChild(footer);
          }
     } ensureFooter();
     
     // Observes DOM changes and restores missing elements
     function observeDOMChanges() {
          let timeout;
          new MutationObserver(() => {
               clearTimeout(timeout);
               timeout = setTimeout(() => {
                    if (!document.querySelector("header")) {
                         ensureHeader();
                         highlightNavLinks();
                    }
                    if (!document.querySelector("footer")) {
                         ensureFooter();
                    }
               }, 100);
          }).observe(document.body, { childList: true, subtree: true });
     } observeDOMChanges();

});
