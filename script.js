const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado'); 

function verificarIdade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let menssagem = '';

    if(isNaN(idade) || idade < 0){
        menssagem = 'Por favor, insira uma idade válida.';
    }else if(idade < 18){
        menssagem = 'VOcê é menor de idade.';
    }else if(idade < 60){
        menssagem = 'Você é adulto.';
    }else{
        menssagem = 'Você é idoso.';
    }

    setTimeout(() => {
        result.innerText = menssagem;
        result.classList.add('visivel');
    }, 100);
}

verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') verificarIdade();
});

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse  = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

let particulasArray = [];
const numeroDeParticulas = 100;

class Particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }
    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillStyle = '#007bff';
        ctx.fill();
    }

    atualizar(){
        if(this.x > canvas.width || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.direcaoY = -this.direcaoY;
        }
        this.x += this.direcaoX;
        this.y += this.direcaoY;
        this.desenhar();
    }
}

function init(){
    particulasArray = [];
    for(let i =0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
        let direcaoX = (Math.random() * 0.4) - 0.2;
        let direcaoY = (Math.random() * 0.4) - 0.2;
        let cor = '#007bff';
        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
} 

function conectar(){
    for(let a  = 0; a < particulasArray.length; a++){
        for(let b  = a; b < particulasArray.length; b++){
            let distancia = ((particulasArray[a].x - particulasArray[b].x) * (particulasArray[a].x - particulasArray[b].x))  +  ((particulasArray[a].y - particulasArray[b].y) * (particulasArray[a].y - particulasArray[b].y))
        
            if(distancia < (canvas.width/7) * (canvas.height/7)){
                ctx.strokeStyle = `rgba(0, 123, 255, ${1 - (distancia/20000)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.lineTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let  i = 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('mouseout', () =>{
    mouse.x=undefined;
    mouse.y=undefined;
});

init();
animar();