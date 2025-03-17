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

    document.body.insertAdjacentHTML("afterbegin", navHTML);
});
