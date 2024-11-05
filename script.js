document.getElementById('executeCommand').addEventListener('click', function () {
    const commandInput = document.getElementById('commandInput').value.trim();
    const output = document.getElementById('output');
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = "";
    searchResults.style.display = "none";

    // Check for special commands
    if (commandInput.startsWith("/")) {
        handlePowerCommand(commandInput);
        return; // Exit the function early if it's a power command
    }

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

// New function to handle powerful commands
function handlePowerCommand(command) {
    const output = document.getElementById('output');

    switch (command) {
        case "/napture":
            output.innerHTML = "Your web page is now secure! Implementing security measures.";
            // Add logic for making web page secure (this could be a placeholder)
            break;
        case "/fast":
            output.innerHTML = "Your web page is optimized for speed!";
            // Add logic for making web page fast (this could be a placeholder)
            break;
        default:
            output.innerHTML = "Unknown command. Please try again.";
    }
}

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

// ... (rest of your existing JavaScript code)
