document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname;
    
    if (!path.includes(".") && path !== "/") {
        window.location.replace(path + ".html");
    }
});
