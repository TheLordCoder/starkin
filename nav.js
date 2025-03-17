document.addEventListener("DOMContentLoaded", function() {
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

    // Add navigation to the page
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // Add active page highlight
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});
