let listaNumerosGerados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio(); // Invocamos a função que gera um número aleatório.
let numeroTentativas = 1; // Declaramos a variável que armazena o número de tentativas.

// Função responsável por exibir textos no HTML.
function exibirTextoNaTela(tag, texto) { // Declaramos a função que manipula os textos no HTML.
    let campo = document.querySelector(tag); // A variável "campo" armazena a tag selecionada no HTML.
    campo.innerHTML = texto; // A variável "campo" armazena a informação da variável "texto" dentro do HTML.
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Converte texto para fala.
    if ('speechSynthesis' in window) { // Converte texto para fala.
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Função responsável por exibir as mensagens iniciais no HTML.
function exibirMensagemInicial() { // Declaramos a função que exibe as mensagens iniciais no HTML.
    exibirTextoNaTela('h1', 'Bem-Vindo ao Número Secreto'); // Invocamos a função que exibe textos no HTML.
    exibirTextoNaTela('p', 'Digite um Número entre 1 e 100:'); // Invocamos a função que exibe textos no HTML.
}
exibirMensagemInicial(); // Invocamos a função que exibe as mensagens iniciais.

// Função responsável pela entrada e manipulação de informações.
function verificarChute() { // Declaramos a função responsável pela entrada e manipulação de informações.
    let chute = document.querySelector('input').value; // Selecionamos a tag "input" no HTML.
    let palavraTentativa = numeroTentativas > 1 ? "Tentativas" : "Tentativa"; // Exibe palavra "tentativa(s)".
    if(numeroSecreto == chute) { // Manipula as informações na tela caso a resposta esteja correta.
        document.getElementById('reiniciar').removeAttribute('disabled'); // Ativa o botão "Novo jogo".
        exibirTextoNaTela('h1', 'Acertou!'); // Invocamos a função que exibe textos no HTML.
        exibirTextoNaTela('p', `Você Descobriu o Número Secreto com ${numeroTentativas} ${palavraTentativa}.`);
    } else { // 
        if(numeroSecreto < chute) {
            exibirTextoNaTela('p', 'O Número Secreto é Menor.');
        } else {
            exibirTextoNaTela('p', 'O Número Secreto é Maior.');
        }
        numeroTentativas++;
        limparChute();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosGerados.length;
    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaNumerosGerados = [];
    } // Fim do bloco de função.

    if(listaNumerosGerados.includes(numeroGerado)) { // Se a lista de números gerados incluir o número gerado -
        return gerarNumeroAleatorio(); // Gere um novo número aleatório -
    } else { // Senão -
        listaNumerosGerados.push(numeroGerado); // Inclua o número gerado na lista de números gerados -
        console.log(listaNumerosGerados);
        return numeroGerado; // E retorne o número gerado.
    } // Fim do bloco de condição.
} // Fim do bloco de função.

function limparChute() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    limparChute();
    numeroTentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}