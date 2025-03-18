document.addEventListener("DOMContentLoaded", function () {
    // Lisää navigointi vain, jos sitä ei ole vielä olemassa
    if (!document.querySelector("header")) {
        const navHTML = `
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Front page</a></li>
                        <li><a href="contact.html">Contacts</a></li>
                    </ul>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML("afterbegin", navHTML);
    }

    // Lisää aktiivinen tila navigointilinkille
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });

    // Lisää footer vain, jos sitä ei ole vielä olemassa
    if (!document.querySelector("footer")) {
        const footerHTML = `
            <footer>
                <p class="footer-text">&copy; 2020–${currentYear} | All rights reserved</p>
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
