const terminal = document.getElementById('terminal');
let input = document.getElementById('command-input');
const commandHistory = [];
let yesInterval = null;
let historyIndex = -1;
let currentPath = '~/';
let autocompletedArray= [];
let autocompleted = 0;
// Sudo verification is done server-side. Use backend endpoint POST /api/verify-sudo

const commands = {
    "help": [help, "Show available commands"],
    "whoami": [whoami, "Show your IP address"],
    "clear": [clear, "Clear the terminal"],
    "exit": [exitCmd, "Exit the terminal"],
    "tree": [tree, "Show file tree (use 'tree -a' to show hidden files)"],
    "ls": [ls, "List files in current folder"],
    "cd": [cd, "Change directory"],
    "cat": [cat, "Display file contents"],
    "yes": [yes, "Print 'y' repeatedly"]
};

const commandAliases = {};

function whoami() {
    const lineLoading = document.createElement("div");
    lineLoading.className = "line output-line info";
    lineLoading.innerHTML = "Fetching IP...";
    terminal.appendChild(lineLoading);
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            lineLoading.innerHTML = `Your IP is: ${data.ip}`;
        })
        .catch(err => {
            lineLoading.innerHTML = `Could not retrieve your IP: ${err}`;
        });
}

function clear() {
    // stop any running repeated outputs
    if (yesInterval) {
        clearInterval(yesInterval);
        yesInterval = null;
    }

    // remove all output lines and input lines (keep only the banner)
    const outputLines = terminal.querySelectorAll('.output-line');
    outputLines.forEach(el => el.remove());
    
    const inputLines = terminal.querySelectorAll('.terminal-input-line, #input-line, #sudo-input-line');
    inputLines.forEach(el => el.remove());

    // recreate a single input prompt at the end
    const newInputLine = document.createElement('div');
    newInputLine.className = "line terminal-input-line";
    newInputLine.id = "input-line";
    newInputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <input class="command" type="text" id="command-input" autofocus autocomplete="off"></input>`;
    terminal.appendChild(newInputLine);
    setInput();

    terminal.scrollTop = terminal.scrollHeight;
    
    // return false to prevent executeCommand from creating another input line
    return false;
}

function exitCmd() {
    // Stop any running output (like yes)
    if (yesInterval) {
        clearInterval(yesInterval);
        yesInterval = null;
    }

    // Create a full-screen overlay and fade it in
    const overlay = document.createElement('div');
    overlay.id = 'terminal-exit-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = '#000';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '9999';
    overlay.style.transition = 'opacity 600ms ease';
    document.body.appendChild(overlay);

    // Force a frame then start fade
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // After animation, redirect to index.html
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 650);

    // Return false to stop the normal prompt re-creation
    return false;
}

function tree(parts) {
    const showHidden = parts && parts.includes('-a');
    let dirCount = 0;
    let fileCount = 0;

    function buildTree(folder, prefix = '', isLast = true, depth = 0) {
        const entries = Object.keys(folder).filter(key => {
            if (!showHidden && key.startsWith('.')) return false;
            return true;
        }).sort((a, b) => {
            // Directories first (ending with /)
            const aIsDir = a.endsWith('/');
            const bIsDir = b.endsWith('/');
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });

        const lines = [];
        entries.forEach((entry, index) => {
            const isLastEntry = index === entries.length - 1;
            const connector = isLastEntry ? '└─ ' : '├─ ';
            const extension = isLastEntry ? '  ' : '│ ';
            
            const isDirectory = entry.endsWith('/');
            if (isDirectory) {
                dirCount++;
                lines.push({ text: prefix + connector + entry, isDir: true, depth });
                const subFolder = folder[entry];
                if (subFolder && typeof subFolder === 'object' && !Array.isArray(subFolder)) {
                    const subLines = buildTree(subFolder, prefix + extension, isLastEntry, depth + 1);
                    lines.push(...subLines);
                }
            } else {
                fileCount++;
                lines.push({ text: prefix + connector + entry, isDir: false, depth });
            }
        });

        return lines;
    }

    // Display header
    const headerLine = document.createElement('div');
    headerLine.className = 'line output-line info';
    headerLine.textContent = '.';
    terminal.appendChild(headerLine);

    // Start with root folder
    const rootFolder = window.virtualFolder || {};
    const treeLines = buildTree(rootFolder);

    // Display tree with CSS classes and colorized name/prefix
    treeLines.forEach(item => {
        const lineEl = document.createElement('div');
        const level = Math.min(item.depth, 4); // Max 4 levels
        const typeClass = item.isDir ? 'tree-dir' : 'tree-file';
        lineEl.className = `line output-line tree-line tree-level-${level} ${typeClass}`;

        // separate the connector/prefix from the entry name so we can color them differently
        const m = item.text.match(/(.*(?:└─ |├─ ))(.+)/);
        if (m) {
            const prefix = m[1];
            const name = m[2];
            lineEl.innerHTML = `<span class="tree-prefix">${prefix}</span><span class="tree-name ${typeClass}">${name}</span>`;
        } else {
            lineEl.textContent = item.text;
        }

        terminal.appendChild(lineEl);
    });

    // Display summary
    const summaryLine = document.createElement('div');
    summaryLine.className = 'line output-line info';
    summaryLine.innerHTML = `<br>${dirCount} directories, ${fileCount} files`;
    terminal.appendChild(summaryLine);
}

function help() {
    const keys = Object.keys(commands).sort();
    for (const k of keys) {
        const line = document.createElement('div');
        line.className = 'line output-line info';
        const desc = commands[k] && commands[k][1] ? commands[k][1] : '';
        line.innerHTML = `${k} - ${desc}`;
        terminal.appendChild(line);
    }
    // include special commands not registered in `commands`
    const sudoLine = document.createElement('div');
    sudoLine.className = 'line output-line info';
    sudoLine.innerHTML = `sudo - Execute a command as superuser (prompts for password)`;
    terminal.appendChild(sudoLine);
}

function yes() {
    if (yesInterval) return false;
    yesInterval = setInterval(() => {
        const line = document.createElement('div');
        line.className = 'line output-line info';
        line.innerHTML = 'y';
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }, 50);
    return false;
}

function ls(parts) {
    const pathArg = (parts && parts[1]) ? parts[1] : '';
    const path = currentPath.split('/').slice(1, -1);
    let folder = window.virtualFolder || {};
    for (const p of path) {
        if (!p) continue;
        folder = folder[p + '/'] || {};
    }
    const entries = Object.keys(folder);
    const line = document.createElement('div');
    line.className = 'line output-line info';
    line.innerHTML = entries.join('  ');
    terminal.appendChild(line);
}

function cd(parts) {
    const target = (parts && parts[1]) ? parts[1] : '~';
    if (target === '~' || target === '') {
        currentPath = '~/';
        return;
    }
    if (target === '..') {
        const partsPath = currentPath.split('/');
        if (partsPath.length > 2) {
            partsPath.splice(partsPath.length - 2, 1);
            currentPath = partsPath.join('/') + '/';
        } else {
            currentPath = '~/';
        }
        return;
    }
    // naive: append directory
    if (!target.endsWith('/')) {
        currentPath = currentPath + target + '/';
    } else {
        currentPath = currentPath + target;
    }
}

function cat(parts) {
    if (!parts || !parts[1]) return;
    const name = parts[1];
    const path = currentPath.split('/').slice(1, -1);
    let folder = window.virtualFolder || {};
    for (const p of path) {
        if (!p) continue;
        folder = folder[p + '/'] || {};
    }
    const content = folder[name] || window.virtualFolder[name];
    if (!content) {
        const err = document.createElement('div');
        err.className = 'line output-line info';
        err.innerHTML = `cat: ${name}: No such file or directory`;
        terminal.appendChild(err);
        return;
    }
    if (Array.isArray(content)) {
        for (const l of content) {
            const line = document.createElement('div');
            line.className = 'line output-line info';
            line.innerHTML = l;
            terminal.appendChild(line);
        }
    } else if (typeof content === 'string') {
        const line = document.createElement('div');
        line.className = 'line output-line info';
        line.innerHTML = content;
        terminal.appendChild(line);
    }
}

function promptSudoAndExecute(parts) {
    const cmd = parts[1];
    const args = parts.slice(1);
    let attempts = 0;

    // Replace current input line with a static sudo command line
    const inputLine = document.getElementById('input-line');
    if (inputLine) {
        inputLine.className = 'line output-line';
        inputLine.id = '';
        inputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <span class="command">sudo ${cmd}</span>`;
    }

    function showPasswordPrompt() {
        const existing = document.getElementById('sudo-input-line');
        if (existing) existing.remove();

        const pwLine = document.createElement('div');
        pwLine.className = 'line terminal-input-line';
        pwLine.id = 'sudo-input-line';
        // prompt should match: [sudo] password for valentin@website:
        pwLine.innerHTML = `<span class="prompt">[sudo] password for valentin@website:</span> <input id="sudo-password-input" class="sudo-password-input" type="password" autofocus autocomplete="off" aria-label="sudo password">`;
        terminal.appendChild(pwLine);
        terminal.scrollTop = terminal.scrollHeight;

        const pwInput = document.getElementById('sudo-password-input');
        // Ensure the password input actually receives focus (autofocus can be flaky)
        if (pwInput) {
            pwInput.focus();
            setTimeout(() => pwInput.focus(), 0);
        }
        async function onKey(e) {
            if (e.key === 'Enter') {
                const val = pwInput.value || '';
                pwInput.removeEventListener('keydown', onKey);

                // remove pw input line for feedback lines
                const pwLineElem = document.getElementById('sudo-input-line');
                if (pwLineElem) pwLineElem.remove();

                // verify with backend
                let ok = false;
                try {
                    const res = await fetch('/api/verify-sudo', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password: val })
                    });
                    if (res.status === 500) {
                        const err = document.createElement('div');
                        err.className = 'line output-line info';
                        err.innerHTML = 'sudo: server has no password configured';
                        terminal.appendChild(err);
                        // recreate normal input line
                        recreatePrompt();
                        return;
                    } else {
                        const data = await res.json();
                        ok = !!data.ok;
                    }
                } catch (e) {
                    const err = document.createElement('div');
                    err.className = 'line output-line info';
                    err.innerHTML = 'sudo: verification failed (network)';
                    terminal.appendChild(err);
                    recreatePrompt();
                    return;
                }

                if (ok) {
                    // execute command
                    if (cmd in commands) {
                        const result = commands[cmd][0](args);
                        if (result === false) return;
                    } else if (cmd in commandAliases) {
                        const result = commands[commandAliases[cmd]][0](args);
                        if (result === false) return;
                    }
                    // recreate normal input line
                    recreatePrompt();
                } else {
                    attempts++;
                    if (attempts < 3) {
                        const tryMsg = document.createElement('div');
                        tryMsg.className = 'line output-line info';
                        tryMsg.innerHTML = 'Sorry, try again.';
                        terminal.appendChild(tryMsg);
                        // show prompt again for another try
                        showPasswordPrompt();
                    } else {
                        const fail = document.createElement('div');
                        fail.className = 'line output-line info';
                        fail.innerHTML = `sudo: ${attempts} incorrect password attempts`;
                        terminal.appendChild(fail);
                        // recreate normal input line
                        recreatePrompt();
                    }
                }
            }
        }
        pwInput.addEventListener('keydown', onKey);
    }

    function recreatePrompt() {
        const newInputLine = document.createElement('div');
        newInputLine.className = "line terminal-input-line";
        newInputLine.id = "input-line";
        newInputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <input class="command" type="text" id="command-input" autofocus autocomplete="off"></input>`;
        terminal.appendChild(newInputLine);
        setInput();
        terminal.scrollTop = terminal.scrollHeight;
    }

    // start first prompt
    showPasswordPrompt();
}



function executeCommand(cmd) {
    const inputLine = document.getElementById("input-line");
    inputLine.className = 'line output-line';
    inputLine.id = ""
    inputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <span class="command">${cmd}</span>`;

    const parts = cmd.split(' ');
    let command = parts[0];
    if (parts[0] === 'sudo') {
        promptSudoAndExecute(parts);
        return;
    }

    if (command in commands) {
        const result = commands[command][0](parts);
        if (result === false) return;
    } else if (command in commandAliases) {
        const result = commands[commandAliases[command]][0](parts);
        if (result === false) return;
    } else {
        // if command is not empty, show a "command not found" message
        if (command && command.trim() !== '') {
            const err = document.createElement('div');
            err.className = 'line output-line info';
            err.innerHTML = `${command}: command not found`;
            terminal.appendChild(err);
        }
    }

    const newInputLine = document.createElement('div');
    newInputLine.className = "line terminal-input-line";
    newInputLine.id = "input-line";
    newInputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <input class="command" type="text" id="command-input" autofocus autocomplete="off"></input>`;
    terminal.appendChild(newInputLine);
    setInput()

    terminal.scrollTop = terminal.scrollHeight;
}

function autocomplete(param) {
    if (autocompleted === 0) {
        if (param.length === 1) {
            autocompletedArray = Object.keys(commands).filter(cmd => cmd.startsWith(param[0]));
        } else {
            const path = currentPath.split('/').slice(1, -1);
            let folder = virtualFolder
            for (const route of path) {
                folder = folder[route + "/"];
            }
            autocompletedArray = Object.keys(folder).filter(item => item.startsWith(param[param.length - 1]));
        }
    }
    console.log(autocompletedArray);
    if (autocompletedArray.length === 0) {
        return param[param.length - 1];
    }
    const result = autocompletedArray[autocompleted % autocompletedArray.length];
    autocompleted++;
    return result;
}

function setInput() {
    input = document.getElementById('command-input');
    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') {
            autocompleted = 0;
        } else {
            e.preventDefault();
            const currentValue = input.value;
            const parts = currentValue.split(' ');
            const completed = autocomplete(parts);
            input.value = parts.slice(0, -1).concat(completed).join(' ');
        }
        if (e.key === 'Enter') {
            const cmd = input.value;
            executeCommand(cmd);
            if (cmd.trim() === '') return;
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });
    input.focus();
}

function clearExecution() {
    console.log("Clearing execution");
    if (yesInterval) {
        clearInterval(yesInterval);
        yesInterval = null;
    }
    input = document.getElementById('command-input');
    if (input) {
        const inputLine = document.getElementById("input-line");
        const currentCmd = input.value || '';
        inputLine.className = 'line output-line';
        inputLine.id = "";
        inputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <span class="command">${currentCmd}</span>`;
    }

    const newInputLine = document.createElement('div');
    newInputLine.className = "line terminal-input-line";
    newInputLine.id = "input-line";
    newInputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <input class="command" type="text" id="command-input" autofocus autocomplete="off"></input>`;
    terminal.appendChild(newInputLine);
    setInput()

    terminal.scrollTop = terminal.scrollHeight;
}

document.addEventListener('click', (e) => {
    const selection = (window.getSelection && window.getSelection().toString()) || '';
    if (selection.length > 0) return;
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.isContentEditable)) return;
    const inp = document.getElementById('command-input');
    if (inp) inp.focus();
});

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        clearExecution();
    }
});

// Create initial input line
const initialInputLine = document.createElement('div');
initialInputLine.className = "line terminal-input-line";
initialInputLine.id = "input-line";
initialInputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">~</span>]$</span> <input class="command" type="text" id="command-input" autofocus autocomplete="off"></input>`;
terminal.appendChild(initialInputLine);

setInput()