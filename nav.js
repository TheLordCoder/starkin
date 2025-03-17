document.addEventListener("DOMContentLoaded", function() {
    const navHTML = `
        <header>
            <h1>My web pages</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Etusivu</a></li>
                    <li><a href="contact.html">Yhteystiedot</a></li>
                </ul>
            </nav>
        </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);
});
