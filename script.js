// Aktualizace hodin
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('clock').innerText = time;
}
setInterval(updateClock, 1000);
updateClock();

// Správa oken
function openApp(id, title, content) {
    if (document.getElementById(`window-${id}`)) return;

    const layer = document.getElementById('window-layer');
    const win = document.createElement('div');
    win.id = `window-${id}`;
    win.className = 'window';

    // Pozicování pro PC
    if (window.innerWidth > 600) {
        win.style.left = '150px';
        win.style.top = '100px';
    }

    win.innerHTML = `
        <div class="window-header" id="header-${id}">
            <span class="window-title">${title}</span>
            <span class="close-btn" onclick="closeApp('${id}')">×</span>
        </div>
        <div class="window-content">${content}</div>
    `;

    layer.appendChild(win);

    // Aktivovat Drag & Drop pouze na PC
    if (window.innerWidth > 600) {
        makeDraggable(win);
    }
}

function closeApp(id) {
    const win = document.getElementById(`window-${id}`);
    if (win) win.remove();
}

// Funkce pro tahání oken
function makeDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.window-header');
    
    header.onmousedown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
    };
}
