//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto'; 

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um Número entre 1 e 10';

let listadeNumerosSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    
}

function exibirMensagemInicial() {

    exibirTextonaTela('h1', 'Jogo do Número Secreto');
    exibirTextonaTela('p', 'Escolha um Número entre 1 a 10');
}

exibirMensagemInicial(); 

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTextonaTela('h1', 'Acertou!!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}!`
        exibirTextonaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
            if (chute > numeroSecreto) {
                exibirTextonaTela('h1', 'Errooou!');
                exibirTextonaTela('p', 'O número secreto é menor');
            } else {
                    exibirTextonaTela('h1', 'Errooou!');
                    exibirTextonaTela('p', 'O número secreto é maior');
                }
            tentativas++;
            limparcampo();

        }
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listadeNumerosSorteados = [];

    }
    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }   else {
        listadeNumerosSorteados.push(numeroEscolhido);
        console.log(listadeNumerosSorteados);
        return numeroEscolhido;
    }
}


function limparcampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparcampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

