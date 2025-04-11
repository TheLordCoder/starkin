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
               { name: "Resume", path: "/resume" },
               // { name: "Publications", path: "/publications" },
               { name: "Contact", path: "/contact" }
          ];
          return pages.map(page => `<li><a href="${page.path}">${page.name}</a></li>`).join("");
     }
     
     // Highlights the active navigation link
     function highlightNavLinks() {
          const currentPath = new URL(window.location.href).pathname.split("?")[0];
          document.querySelectorAll(".nav-links a").forEach(link => {
               const linkPath = new URL(link.href, window.location.origin).pathname.split("?")[0];
               link.classList.toggle("active", currentPath === linkPath || 
               (currentPath.startsWith(linkPath) && (currentPath[linkPath.length] === "/" || 
               currentPath[linkPath.length] === undefined)));
          });
     }
     
     // Header background darkens at top, lightens on scroll
     function HeaderScrollEffect() {
          const header = document.querySelector("header");
          if (!header) return;
          
          function updateHeaderBackground() {
               if (window.scrollY > 10) {
                    header.classList.add("scrolled");
               } else {
                    header.classList.remove("scrolled");
               }
          }
          window.addEventListener("scroll", updateHeaderBackground);
          updateHeaderBackground();
     } HeaderScrollEffect();

     
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
     function SmoothScrolling() {
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
     } SmoothScrolling();
     
     // Logo slider to front page
     function LogoSlider() {
          const cleanPath = window.location.pathname
               .replace(/\/$/, "")
               .replace(/\.html$/, "");
          
          if (cleanPath === "") {
               const logoFiles = ['logo1.png', 'logo2.png', 'logo3.png', 'logo4.png'];
               const footer = document.querySelector("footer");
               
               if (footer) {
                    const wrapper = document.createElement('div');
                    wrapper.className = "logo-slider-wrapper";
                    wrapper.innerHTML = `
                    <div class="logo-slider">
                    <div class="logo-track" id="logo-track"></div>
                    </div>
                    `;
                    footer.parentNode.insertBefore(wrapper, footer);
                    
                    const track = wrapper.querySelector('#logo-track');
                    logoFiles.concat(logoFiles).forEach(file => {
                         const img = document.createElement('img');
                         img.src = `logos/${file}`;
                         img.alt = "Logo";
                         track.appendChild(img);
                    });
               }
          }
     } LogoSlider();
     
     // Job Duration Auto Calculator
     function JobDurations() {
          document.querySelectorAll('.job-dates').forEach(el => {
               const { start, end } = el.dataset;
               if (!start || !end) return;
               
               const startDate = new Date(start + '-01');
               const isPresent = end.toLowerCase() === 'present';
               const endDate = isPresent ? new Date() : new Date(end + '-01');
               
               if (isNaN(startDate) || isNaN(endDate)) return;
               
               const totalMonths = Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()));
               const years = Math.floor(totalMonths / 12);
               const months = totalMonths % 12;
               
               const duration = [
                    years ? `${years} yr${years > 1 ? 's' : ''}` : null,
                    (months || totalMonths === 0) ? `${months} mth${months > 1 ? 's' : ''}` : null
               ].filter(Boolean).join(' ');
               
               const target = el.querySelector('.job-duration');
               if (target) {
                    target.textContent = `· ${duration}`;
               }
          });
     } JobDurations();
     
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
