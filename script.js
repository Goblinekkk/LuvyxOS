// Hodiny na liště
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('cs-CZ');
}
setInterval(updateClock, 1000);
updateClock();

// Funkce pro otevření aplikace
function openApp(id, title, content) {
    // Pokud už okno existuje, neotevírat znovu
    if (document.getElementById(`window-${id}`)) return;

    const windowLayer = document.getElementById('window-layer');
    
    const win = document.createElement('div');
    win.id = `window-${id}`;
    win.className = 'window';
    win.style.left = '100px';
    win.style.top = '100px';

    win.innerHTML = `
        <div class="window-header" onmousedown="dragElement(document.getElementById('window-${id}'))">
            <span class="window-title">${title}</span>
            <span class="close-btn" onclick="closeApp('${id}')">×</span>
        </div>
        <div class="window-content">${content}</div>
    `;

    windowLayer.appendChild(win);
}

// Funkce pro zavření aplikace
function closeApp(id) {
    const win = document.getElementById(`window-${id}`);
    if (win) win.remove();
}

// Logika pro posouvání oken (Drag and Drop)
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.window-header');
    
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
