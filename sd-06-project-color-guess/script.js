let wins = 0; //numero de vitorias
let loses = 0; //numero de derrotas
let match = 0; //calcular o numero de jogadas
let points = 0; //pontos iniciais
let result = 0; //variavel acumuladora de pontos >> acho que ela talvez nao seja util, posso add tudo direto em points, rever isso dps.
let level = 0;
let n = 6;      //numero de cores
//pool de cores
let color=[];
//gerando numero aleatorio de 0 ao 255
function randomNumbers() {
    return Math.floor(Math.random() * 255)
}
//gerando rgb aleatorio
function generatorRandomColors() {
    let generatedRgb = 'rgb(' + randomNumbers() + ", " + randomNumbers() + ", " + randomNumbers() + ')';
    return generatedRgb;
}
//carregando array color
function loadColor(){
    for(let i =0;i<6;i++){
        color[i] = generatorRandomColors();
    }
    return color;
}
//criar opcoes de cores
//itemDiv é o nome dado para um div com cor
function createPalletItem(){
    //recupera o container
    let colorContainer = document.getElementById("color-option")
    //vai carregar a plalheta de cores com o color em aleatorio
    for(let j=0;j<n;j++){
        let itemDiv = document.createElement('div');
        itemDiv.style.backgroundColor = color[j];
        itemDiv.className = "ball";
        colorContainer.appendChild(itemDiv);
    }
}

//criar texto de rgb para ser acertado
function createTextRgb(color){
    //texto é como chamamos o texto do rgb
    let texto = document.getElementById("rgb-color")
    let randColor = color[Math.floor(Math.random() * color.length)];
    texto.textContent = randColor;
    return randColor;
}
//calcula pontuacao a partir do click
function pointsTotal(points, boolean){
    if(boolean===true){
        points += 3;
    }else{
        points += -2 - level;
    }
    return points;
}
//imprime pontuacao
function createPoint(points){
    let textPoint = document.getElementById("points");
    textPoint.innerHTML = points;
}
//botao reset para resetar a pontuacao
let reset = document.getElementById("reset")
reset.addEventListener("click", resetGame)
//funcao para zerar a pontuacao
function resetGame(){ //zerando tudo
    points = 0; // limpa pontuação também(?)
    createPoint(points);
    console.log("PONTUAÇÃO RESETADA")
    textReset(); //limpa o texto
    match = 0; //limpa as tentativas
    let matchText = document.getElementById("match") //recuperando tentativas para imprimir zerado >>> solução para isso, criar uma função apenas para limpar o texto(?)
    matchText.innerText = match;
    result = 0; //limpa pontuação
    imgClear(); //limpa as imagens
    //limpa console de vitorias e derrotas
    wins =0;
    loses =0;
    document.getElementById("losesPoints").innerHTML = "0"
    document.getElementById("winsPoints").innerHTML = "0"
    //resetar cores e criar novas, msm função do continue
    continueGame()
    //reseta as funcioções leveis, o texto e a variavel
    level = 0;
    let levelText = document.getElementById("level")
    levelText.innerHTML = 1;

}
//evento click na cor >> compara as rbgs >> calcula a nova pontuacao >> imprime a nova pontuacao
let ballDiv = document.getElementById("color-option")
ballDiv.addEventListener("click", eventClickBall);
//funcao para comparar as rbgs
function eventClickBall(event){
    let currentSelectedBall = event.target;
    let currentSelectText = document.getElementById("rgb-color")
    if(currentSelectText.innerHTML === currentSelectedBall.style.backgroundColor){
        result += pointsTotal(points, true);
        textWin(); //mensagem que aparece embaixo das cores
        console.log("VOCE ACERTOU!")
        calcWinsPoints() // calculo para saber quantas acertou
    }else{
        result += pointsTotal(points, false);
        textLose(); //mensagem que aparece embaixo das cores
        console.log("VOCE ERROU!")
        calcLosesPoints() // calculo para saber quantas errou
    } 
    calcMatch(); //calculo para saber quantas tentativas teve
    createPoint(result); //exibir pontuação
}
//evento continuar >> muda as cores , muda o texto do rgb
let buttonNext = document.getElementById("continue")
buttonNext.addEventListener("click", continueGame)
//funcao de continuar
function continueGame(){
    delBall();
    loadColor();
    createTextRgb(color);
    createPalletItem();

}
//deleta todas as bolas
function delBall(){
    const div = document.getElementById("color-option");
    // rever esta cara*** aqui revome 3 , dps 2 e dps 1
    for (child of div.children){
        child.remove();
    }
    for (child of div.children){
        child.remove();
    }
    for (child of div.children){
        child.remove();
    }
    return div;
}
//mudar texto embaixo da palheta ao resetar
function textReset (){
    let resetText = document.getElementById("answer")
    resetText.innerText = "Escolha uma cor!"
    return resetText;
}
//mudar texto embaixo da palheta caso ganhe ou perca
function textWin(){
    let resetText = document.getElementById("answer")
    resetText.innerText = "Parabens você ganhou! Clique em continuar"
    return resetText;
}
function textLose(){
    let resetText = document.getElementById("answer")
    resetText.innerText = "Que pena você perdeu! Clique em continuar"
    return resetText;
}
//Calcular o numero de jogadas
function calcMatch(){
    let matchText = document.getElementById("match")
    match++;
    matchText.innerText = match;
    return match;
}
//Configurar botao de premio, regra de negocio para aparecer as imagens
function premiumRecive(){
    //recure a pontuação para testar depois
    let premium = document.getElementById("points");
    //cria a imagem
    let img = document.createElement("img");
//regra de negocio para saber qual imagem vai aparecer
    if(premium.innerHTML>=12){
        img.src = "camp.png";
    }else if(premium.innerHTML<12 && premium.innerHTML>9){
        img.src = "boa.png";
    }else if(premium.innerHTML<=9){
        img.src = "forms.png";
    }
    //recupera a div que vai entrar a imagem como secundaria
    let premiumDiv = document.getElementById("premiumDiv");
    //atribui o filho
    premiumDiv.appendChild(img);
}
//evento para o botao de receber premio
let premiumButtom = document.getElementById("premiumButtom")
premiumButtom.addEventListener("click", premiumRecive)
//função para limpar a imagem, vamos deletar todos os filhos
function imgClear(){
    let clearImg = document.getElementById("premiumDiv");
    // rever esta cara*** aqui revome 3 , dps 2 e dps 1, mesmo problema da passada, vou dx 3 para garantir
    for (child of clearImg.children){
        child.remove();
    }
    for (child of clearImg.children){
        child.remove();
    }
    for (child of clearImg.children){
        child.remove();
    }
    return clearImg;
}
//Add pontos de vitorias
function calcWinsPoints(){
    let winsPoints = document.getElementById("winsPoints")
    wins++;
    winsPoints.innerHTML = wins;
}
//Add pontos de derrotas
function calcLosesPoints(){
    let losesPoints = document.getElementById("losesPoints")
    loses++;
    losesPoints.innerHTML = loses;
}
//mudar dificuldade do jogo
function highLevel(){
    level++;
    let levelText = document.getElementById("level")
    levelText.innerHTML = level+1;
}
//recupera o botao e cria o evento do click
let changeLevel = document.getElementById("changeLevel")
changeLevel.addEventListener("click", highLevel)
loadColor();
createPoint(points);
createTextRgb(color);
createPalletItem();