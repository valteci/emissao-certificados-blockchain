const segundos = document.getElementById('segundos');
let timer = null;
let tempoTotal = 5;

function decrementarTempo() {
    tempoTotal -= 1;

    segundos.textContent = tempoTotal;

    if (tempoTotal <= 0) {
        clearInterval(timer);
        window.location.href = '../../home/index.html';
    }

}

function main() {
        
    timer = setInterval(decrementarTempo, 1000);
}

main();