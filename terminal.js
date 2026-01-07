const terminal = document.getElementById('terminal');
let input = document.getElementById('command-input');
const commandHistory = [];
let yesInterval = null;
let historyIndex = -1;
let currentPath = '~/';
let autocompletedArray= [];
let autocompleted = 0;

const commands = {
    "help" : [help, "Show available commands"],
    "ls" : [ls, "Show folders and files in the current directory"],
    "cd" : [cd, "Change the current directory"],
    "cat" : [cat, "Display the contents of a file"],
    "yes" : [yes, "Output 'yes' indefinitely"],
    "clear" : [clear, "Clear the terminal"],
    "whoami" : [whoami, "Show your public IP"],
};

const commandAliases = {
    "dir": "ls",
    "list": "ls",
    "?": "help",
};

// virtualFolder moved to data.js (shared between terminal and classic portfolio)
// Ensure <script src="data.js"></script> is loaded before this script.

function help() { 
    for (const command in commands) {
        const line = document.createElement("div");
        line.className = "line output-line info";
        line.innerHTML = `${command} - ${commands[command][1]}`;
        terminal.appendChild(line);
    }
}

function ls(args) {
    const path = currentPath.split('/').slice(1, -1);
    let folder = virtualFolder
    for (const route of path) {
        folder = folder[route + "/"];
    }
    const line = document.createElement("div");
    line.className = "line output-line info";
    for (const item in folder) {
        if (item.slice(0, 1) === "." && !args.includes("-a")) continue;
        line.innerHTML += item + " ";
    }
    line.innerHTML = line.innerHTML.trim();
    terminal.appendChild(line);
}

function cd(args) {
    let param = args[1] || '';
    let add = false;
    if (param.slice(-1) !== '/' && param !== '..') {
        param += '/';
        add = true;
    }
    const path = currentPath.split('/').slice(1, -1);
    let folder = virtualFolder
    for (const route of path) {
        folder = folder[route + "/"];
    }
    if (param in folder) {
        currentPath += param;
    } else if (param === '..') {
        if (currentPath !== '~/') {
            const routes = currentPath.split('/').slice(1, -2);
            currentPath = '~/' + routes.join('/') + (routes.length > 0 ? '/' : '');
        }
    } else {
        if (add && param.slice(0, -1) in folder) {
            const line = document.createElement("div");
            line.className = "line output-line info";
            line.innerHTML = `bash: cd: ${param}: Not a directory`;
            terminal.appendChild(line);
        } else {
            const line = document.createElement("div");
            line.className = "line output-line info";
            line.innerHTML = `bash: cd: ${param}: No such file or directory`;
            terminal.appendChild(line);
        }
        
    }
}

function cat(args) {
    let param = args[1];
    const path = currentPath.split('/').slice(1, -1);
    let folder = virtualFolder
    for (const route of path) {
        folder = folder[route + "/"];
    }
    if (param in folder) {
        if (param.slice(-1) == '/') {
            const line = document.createElement("div");
            line.className = "line output-line info";
            line.innerHTML = `bash: cat: ${param}: Is a directory`;
            terminal.appendChild(line);
        } else {
            const content = folder[param];
            for (const lineContent of content) {
                const line = document.createElement("div");
                line.className = "line output-line info";
                line.innerHTML = lineContent;
                terminal.appendChild(line);
            }
        }
    } else {
        const line = document.createElement("div");
        line.className = "line output-line info";
        line.innerHTML = `bash: cat: ${param}: No such file or directory`;
        terminal.appendChild(line);
    }
}

function yes() {
  if (yesInterval) return;
  yesInterval = setInterval(() => {
    const line = document.createElement("div");
    line.className = "line output-line info";
    line.innerHTML = "yes";
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }, 50);
  return false
}

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
    terminal.innerHTML = '';
    const art = ` /$$    /$$          /$$                       /$$     /$$          
| $$   | $$         | $$                      | $$    |__/          
| $$   | $$ /$$$$$$ | $$  /$$$$$$  /$$$$$$$  /$$$$$$   /$$ /$$$$$$$ 
|  $$ / $$/|____  $$| $$ /$$__  $$| $$__  $$|_  $$_/  | $$| $$__  $$
 \  $$ $$/  /$$$$$$$| $$| $$$$$$$$| $$  \ $$  | $$    | $$| $$  \ $$
  \  $$$/  /$$__  $$| $$| $$_____/| $$  | $$  | $$ /$$| $$| $$  | $$
   \  $/  |  $$$$$$$| $$|  $$$$$$$| $$  | $$  |  $$$$/| $$| $$  | $$
    \_/    \_______/|__/ \_______/|__/  |__/   \___/  |__/|__/  |__/`;

    const artDiv = document.createElement('div');
    artDiv.className = 'line output-line ascii-art';
    artDiv.textContent = art;
    terminal.appendChild(artDiv);

    const info1 = document.createElement('div');
    info1.className = 'line output-line info';
    info1.innerHTML = "Welcome to my website";
    terminal.appendChild(info1);

    const info2 = document.createElement('div');
    info2.className = 'line output-line info';
    info2.innerHTML = "Type 'help' to see available commands";
    terminal.appendChild(info2);
}

function tree() {
    const line = document.createElement("div");
    line.className = "line output-line info";
    line.innerHTML = `~`;
    terminal.appendChild(line);
    printTree(virtualFolder, 0);
}

function executeCommand(cmd) {
    const inputLine = document.getElementById("input-line");
    inputLine.className = 'line output-line';
    inputLine.id = ""
    inputLine.innerHTML = `<span class="prompt">[<span class="user">valentin</span><span class="at">@</span><span class="host">website</span> <span class="path">${currentPath.slice(0,-1)}</span>]$</span> <span class="command">${cmd}</span>`;

    const parts = cmd.split(' ');
    let command = parts[0];
    if (parts[0] === 'sudo') {
        command = parts[1];
    }

    if (command in commands) {
        const result = commands[command][0](parts);
        if (result === false) return;
    } else if (command in commandAliases) {
        const result = commands[commandAliases[command]][0](parts);
        if (result === false) return;
    } else {
        const line = document.createElement("div");
        line.className = "line output-line info";
        line.innerHTML = `bash: ${cmd}: command not found`;
        terminal.appendChild(line);
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

function printTree(folder, depth) {
    for (const item in folder) {
        const line = document.createElement("div");
        line.className = "line output-line info";
    }
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

setInput()