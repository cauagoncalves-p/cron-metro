const iniciar = document.getElementById('iniciar');
const pausar = document.getElementById('pausar');
const zerar = document.getElementById('resetar');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const horas = document.getElementById('horas');
const milissegundos = document.getElementById('milissegundos');

let milisseg = 0; // 1 milissegundo
tempoInicial = Date.now() - milisseg; // Tempo inicial para o cronômetro
let intervaloId = null; // Variável para armazenar o ID do intervalo

console.log(milisseg);
let cronometroRodando = false;

iniciar.addEventListener('click', () => {
    iniciarCronometro();
});

pausar.addEventListener('click', () => {
    pausarCronometro();
}); 

zerar.addEventListener('click', () => {
    zerarCronometro();
});

function atualizarDisplay(milisseg){
    let h = Math.floor(milisseg / 3600000);
    let m = Math.floor((milisseg % 3600000) / 60000);
    let s = Math.floor((milisseg % 60000) / 1000);
    let mili = Math.floor((milisseg % 1000) / 10);7

    horasfr = String(h).padStart(2, '0');
    minutosfr = String(m).padStart(2, '0');
    segundosfr = String(s).padStart(2, '0');
    milissegundosfr = String(mili).padStart(2, '0');
    
    return {
        horas: horasfr,
        minutos: minutosfr,
        segundos: segundosfr,
        milissegundos: milissegundosfr
    };
}

function iniciarCronometro() {
    if (!cronometroRodando){
        cronometroRodando = true;
        intervaloId =  setInterval(() =>{
            milisseg = Date.now() - tempoInicial; // Incrementa 10 milissegundos
            let display = atualizarDisplay(milisseg);
            horas.innerText = display.horas;
            minutos.innerText = display.minutos;
            segundos.innerText = display.segundos;
            milissegundos.innerText = display.milissegundos;
            iniciar.disabled = true; // Desabilita o botão de iniciar
            pausar.disabled = false; // Habilita o botão de pausar
        },10)
    }
}

function pausarCronometro() {
    clearInterval(intervaloId);
    cronometroRodando = false;
    iniciar.disabled = false; // Habilita o botão de iniciar
    pausar.disabled = true; // desabilita o botão de pausar
}

function zerarCronometro() {
    clearInterval(intervaloId);
    cronometroRodando = false;
    milisseg = 0; // Reseta o tempo
    tempoInicial = Date.now(); // Reseta o tempo inicial
    horas.innerText = '00';
    minutos.innerText = '00';   
    segundos.innerText = '00';
    milissegundos.innerText = '.00';
    iniciar.disabled = false; // Habilita o botão de iniciar
    pausar.disabled = true; // Desabilita o botão de pausar
}
