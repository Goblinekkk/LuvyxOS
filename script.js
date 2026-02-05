function updateClock() {
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0') + ':' + 
                 now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerText = time;
}

setInterval(updateClock, 1000);
updateClock(); // Spustit hned
