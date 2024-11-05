document.getElementById('executeCommand').addEventListener('click', function () {
    const commandInput = document.getElementById('commandInput').value.trim();
    const output = document.getElementById('output');
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = "";
    searchResults.style.display = "none";

    if (commandInput === "ghtip://enter.do") {
        output.innerHTML = "Welcome! You can now use the search option.";
    } else if (commandInput === "ghtip://register.do") {
        openRegisterModal();
    } else if (commandInput === "ghtip://localhost.do") {
        openLocalhostModal();
    } else if (commandInput.startsWith("ghtip:")) {
        const fullCommand = commandInput.replace("ghtip:", "").trim();
        
        const storedPage = localStorage.getItem(fullCommand);
        if (storedPage) {
            const previewWindow = window.open("", "_blank");
            previewWindow.document.write(storedPage);
            previewWindow.document.close();
        } else {
            output.innerHTML = `Page not found: ${commandInput}`;
        }
    } else {
        searchPages(commandInput);
    }

    document.getElementById('commandInput').value = '';
});

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function openLocalhostModal() {
    document.getElementById('localhostModal').style.display = 'block';
}

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

document.getElementById('createPage').addEventListener('click', function () {
    const pageName = document.getElementById('pageName').value.trim();
    const htmlCode = document.getElementById('htmlCode').value.trim();
    const domainExtension = document.getElementById('domainExtension').value.trim() || ".io";

    if (pageName && htmlCode && domainExtension) {
        const fullPageName = `${pageName}${domainExtension}`;
        localStorage.setItem(fullPageName, htmlCode);
        alert(`Page created! Access it at: ghtip:${fullPageName}`);
        
        document.getElementById('registerModal').style.display = 'none';
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById('previewPage').addEventListener('click', function () {
    const htmlCode = document.getElementById('htmlCode').value.trim();
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(htmlCode);
    previewWindow.document.close();
});

document.getElementById('saveLocalhost').addEventListener('click', function () {
    const htmlCode = document.getElementById('localhostHtmlCode').value.trim();
    if (htmlCode) {
        const pageName = 'localhost.virt';
        localStorage.setItem(pageName, htmlCode);
        alert("Virtual localhost saved! You can access it with ghtp://127.0.0.1:port");

        document.getElementById('localhostModal').style.display = 'none';
    } else {
        alert("Please enter some HTML code.");
    }
});

document.getElementById('previewLocalhost').addEventListener('click', function () {
    const htmlCode = document.getElementById('localhostHtmlCode').value.trim();
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(htmlCode);
    previewWindow.document.close();
});

function searchPages(query) {
    const searchResults = document.getElementById('searchResults');
    const output = document.getElementById('output');
    const matchingPages = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes(query.toLowerCase())) {
            matchingPages.push(`<a href="javascript:void(0)" onclick="openPage('${key}')">${key}</a>`);
        }
    }

    if (matchingPages.length > 0) {
        searchResults.innerHTML = `<strong>Search Results:</strong><br>${matchingPages.join('<br>')}`;
        searchResults.style.display = "block";
        output.innerHTML = "";
    } else {
        output.innerHTML = "No results found.";
    }
}

function openPage(pageKey) {
    const pageContent = localStorage.getItem(pageKey);
    if (pageContent) {
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(pageContent);
        previewWindow.document.close();
    }
        }
